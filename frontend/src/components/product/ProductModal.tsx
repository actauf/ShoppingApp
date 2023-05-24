import {BottomSheet} from '@rneui/base';
import {TextInput} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Button, Text} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useMutation} from '@tanstack/react-query';
import {request} from '../../../node_modules/graphql-request/build/esm/index';
import {addProductQuery} from '../../api/api-products';
import {API_URI} from '@env';

type FormData = {
  name: string;
  desc: string;
  price: number;
  image: string;
};

const ProductModal = (props: {
  closeModal: () => void;
  isVisible: boolean;
  callBackData: () => void;
}) => {
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
    console.log(data);

    const variables = {
      name: data.name,
      desc: data.desc,
      price: Number(data.price),
      image: data.image,
    };

    const res = await request(API_URI, addProductQuery(), variables);
    //console.log(res);

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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <Text h4>Add Product</Text>
            <Button radius={'sm'} type="outline" onPress={props.closeModal}>
              <Icon name="close" color="#4d5a59" size={20} />
            </Button>
          </View>
          <View style={styles.formContainer}>
            <View style={{height: 220, width: '100%'}}>
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

              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="Description"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="desc"
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Price"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value.toString()}
                  />
                )}
                name="price"
              />
              {errors.price && <Text>This is required.</Text>}

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder="Image URL"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value.toString()}
                  />
                )}
                name="image"
              />
              {errors.image && <Text>This is required.</Text>}

              <Button
                title="Submit"
                onPress={handleSubmit(onSubmit)}
                color="#159690"
              />
            </View>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default ProductModal;

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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: '#cccccc',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '85%',
    marginBottom: 5,
    padding: 8,
    color: 'white',
  },
  button: {
    width: '40%',
    marginHorizontal: 10,
  },
  title: {
    fontSize: 32,
    marginBottom: 5,
  },
  body: {
    fontSize: 16,
    marginBottom: 5,
  },
});
