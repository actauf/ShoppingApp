import {createContext} from 'react';
import {User} from '../models/User';

export interface AuthContextInterface {
  user: User | null;
  userToken: string | null;
  isLoading: boolean;
  login: (data: {email: string; password: string}) => void;
  logout: () => void;
  register: (data: {
    username: string;
    email: string;
    password: string;
    address: string;
    zipCode: string;
    state: string;
  }) => void;
}

export const authContextDefaults: AuthContextInterface = {
  user: null,
  userToken: null,
  isLoading: false,
  login: () => {},
  register: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextInterface>(authContextDefaults);

export default AuthContext;
