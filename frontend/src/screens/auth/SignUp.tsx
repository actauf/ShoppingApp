import {TextInput, StyleSheet, View} from 'react-native';
import {Button, Text} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {useAuth} from '../../providers/AuthProvider';

const SignUpScreen = ({navigation}: any) => {
  const {register} = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      address: '',
      zipCode: '',
      state: '',
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    register(data);
  };

  return (
    <View style={styles.appContainer}>
      <View style={{alignSelf: 'center'}}>
        <Text style={styles.logo}>Sign Up</Text>
      </View>
      <View style={styles.formContainer}>
        {errors.username && (
          <Text style={styles.errorText}>This is required.</Text>
        )}
        <View style={styles.inputView}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="Username"
                keyboardType="default"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.inputText}
              />
            )}
            name="username"
          />
        </View>

        {errors.email && (
          <Text style={styles.errorText}>This is required.</Text>
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
                secureTextEntry={true}
              />
            )}
            name="password"
          />
        </View>

        {errors.address && (
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
                placeholder="Address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.inputText}
              />
            )}
            name="address"
          />
        </View>
        <View style={styles.addressContainer}>
          <View>
            {errors.zipCode && (
              <Text style={styles.errorText}>This is required.</Text>
            )}
            <View style={styles.inputViewAddress}>
              <Controller
                control={control}
                rules={{
                  maxLength: 10,
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="zipCode"
                    keyboardType="default"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.inputText}
                  />
                )}
                name="zipCode"
              />
            </View>
          </View>
          <View>
            {errors.state && (
              <Text style={styles.errorText}>This is required.</Text>
            )}
            <View style={styles.inputViewAddress}>
              <Controller
                control={control}
                rules={{
                  maxLength: 20,
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="State"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.inputText}
                  />
                )}
                name="state"
              />
            </View>
          </View>
        </View>
      </View>
      <Button
        title={'SignUp'}
        onPress={handleSubmit(onSubmit)}
        buttonStyle={{
          backgroundColor: '#137e70',
          borderRadius: 5,
        }}
        titleStyle={{color: 'white'}}
      />
      <Button
        title={'SignIn'}
        onPress={() => navigation.navigate('SignIn')}
        buttonStyle={{
          backgroundColor: '#68b8ad',
          borderRadius: 3,
        }}
        titleStyle={{color: 'white'}}
      />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    gap: 10,
    //backgroundColor: '#074644',
    backgroundColor: 'white',
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
  addressContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
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
  inputViewAddress: {
    backgroundColor: '#8bf1e9',
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    width: 170,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  errorText: {
    color: '#fa0000',
  },
});
