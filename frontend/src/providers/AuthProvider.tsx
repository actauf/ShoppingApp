import {useContext, useEffect, useState} from 'react';
import AuthContext from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../../node_modules/graphql-request/build/esm/index';
import {getAuthUser, userLogin, userRegister} from '../api/api-auth';
import {UserLoginResp} from '../models/responses/UserLogin';
import {UserRegister} from '../models/responses/UserRegister';
import {AuthUser} from '../models/responses/AuthUser';
import {API_URI} from '@env';

const AuthProvider = ({children}: any) => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [userToken, setUserToken] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginF = async (data: {email: string; password: string}) => {
    setIsLoading(true);

    const variables = {
      email: data.email,
      password: data.password,
    };

    const res: UserLoginResp = await request(API_URI, userLogin(), variables);

    setUserToken(res.userLogin.token);
    AsyncStorage.setItem('userToken', res.userLogin.token!);

    setIsLoading(false);
  };

  const registerF = async (data: {
    username: string;
    email: string;
    password: string;
    address: string;
    zipCode: string;
    state: string;
  }) => {
    setIsLoading(true);

    const variables = {
      username: data.username,
      email: data.email,
      password: data.password,
      address: data.address + ' ' + data.zipCode + ' ' + data.state,
    };

    const res: UserRegister = await request(API_URI, userRegister(), variables);
    if (res.userRegister) {
      setAuthUser(res.userRegister);
      setUserToken(res.userRegister.token);
      AsyncStorage.setItem('userToken', res.userRegister.token!);
    }

    setIsLoading(false);
  };

  const logoutF = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.setItem('userToken', '');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');

      if (userToken) {
        const variables = {};
        const requestHeaders = {
          authorization: 'Bearer ' + userToken,
        };

        const res: AuthUser = await request(
          API_URI,
          getAuthUser(),
          variables,
          requestHeaders,
        );

        res.authUser
          ? (setUserToken(userToken), setAuthUser(res.authUser))
          : (setUserToken(null), setAuthUser(null));
      }

      setIsLoading(false);
    } catch (error) {
      console.log(`IsLoggedIn an error ${error}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const value = {
    user: authUser,
    userToken: userToken,
    isLoading: isLoading,
    login: loginF,
    logout: logoutF,
    register: registerF,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
