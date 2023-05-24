import {BottomSheet} from '@rneui/base';
import {TextInput} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Button, Text} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import {request} from '../../../node_modules/graphql-request/build/esm/index';
import {addCartQuery} from '../../api/api-cart';
import {API_URI} from '@env';
import {useAuth} from '../../providers/AuthProvider';

const CartModal = (props: {
  closeModal: () => void;
  isVisible: boolean;
  callBackData: () => void;
}) => {
  const {user} = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      desc: '',
      price: '',
      image: '',
    },
  });

  const onSubmit = async (data: any) => {
    const variables = {
      name: data.name,
      user_id: user?.id,
    };

    console.log(variables);

    const res = await request(API_URI, addCartQuery(), variables);
    console.log(res);

    props.callBackData();
    reset();
  };

  return (
    <>
      <BottomSheet
        modalProps={{}}
        isVisible={props.isVisible}
        onBackdropPress={() => props.closeModal()}>
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <Text h4>Add Cart List</Text>
            <Button radius={'sm'} type="outline" onPress={props.closeModal}>
              <Icon name="close" color="#4d5a59" size={20} />
            </Button>
          </View>
          <View style={styles.formContainer}>
            <View style={{height: 50, width: '100%'}}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="Name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="name"
              />
              {errors.name && <Text>This is required.</Text>}
            </View>
            <Button
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              color="#159690"
            />
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default CartModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    /* justifyContent: 'flex-start',
    alignItems: 'center', */
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderBottomColor: '#cccccc',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
