import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Text} from '@rneui/themed';
import {useAuth} from '../../providers/AuthProvider';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native';

const SignInScreen = ({navigation}: any) => {
  const {login} = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    login(data);
  };

  return (
    <View style={styles.appContainer}>
      <View style={{alignSelf: 'center'}}>
        <Text style={styles.logo}>Colryut APP</Text>
      </View>
      <View style={styles.formContainer}>
        {errors.email && (
          <Text style={styles.errorText}> This is required.</Text>
        )}
        <View style={styles.inputView}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.inputText}
              />
            )}
            name="email"
          />
        </View>

        {errors.password && (
          <Text style={styles.errorText}>This is required.</Text>
        )}
        <View style={styles.inputView}>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.inputText}
              />
            )}
            name="password"
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        title={'Sign In'}
        onPress={handleSubmit(onSubmit)}
        color="#137e70"
        buttonStyle={{
          borderRadius: 5,
        }}
        titleStyle={{color: 'white'}}
      />
      <Button
        title={'SignUp'}
        onPress={() => navigation.navigate('SignUp')}
        buttonStyle={{
          backgroundColor: '#68b8ad',
          borderRadius: 5,
        }}
        titleStyle={{color: 'white'}}
      />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    gap: 10,
    backgroundColor: 'white',
    //backgroundColor: '#074644',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#137e70',
    marginBottom: 30,
  },
  formContainer: {
    marginBottom: 20,
  },
  forgot: {
    color: '#074644',
    fontSize: 12,
    alignSelf: 'center',
  },
  inputView: {
    backgroundColor: '#8bf1e9',
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  errorText: {
    color: '#fa0000',
  },
});
