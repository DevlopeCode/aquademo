/* eslint-disable react-native/no-inline-styles */
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {FormField} from '../component/InputBox';
import {ms, vs} from 'react-native-size-matters';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {navigate, navigationRef} from '../navigation/navigationServices';
import {loginUser} from '../utils/firebase';

import {updateloginStatus} from '../utils/database';
import Loader from '../component/Loder';
interface LoginFormInputs {
  email: string;
  password: string;
}
// Regular expression for the official email domain requirement
const officialEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Define the schema for an object with an Email field

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const onSubmit = (props: any) => {
    loginUser({
      email: props.email,
      password: props.password,
      onErr: (e: any) => {
        Alert.alert(e);
      },
      onSuccess: (data: any) => {
        setLoading(true);
        let {uid} = data.user;
        updateloginStatus(uid, 1, () => {
          setLoading(false);
        });
        navigate('home');
      },
    });
  };
  const {control, handleSubmit, formState} = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const emailValidationSchema = yup.object({
    email: yup
      .string()
      .required('email ID is a mandatory text field')
      .matches(officialEmailRegex, 'Email is not valid'),
  });
  if (loading) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formbox}>
        <FormField
          control={control}
          autoFocus={true}
          name="email"
          rules={emailValidationSchema}
          placeholder={'email'}
          componentType={'input'}
        />
        <FormField
          control={control}
          // autoFocus={true}
          name="password"
          placeholder={'Password'}
          componentType={'input'}
          rules={{required: 'Password is a mandatory text field'}}
          secureTextEntry={true}
        />

        <View style={{alignItems: 'center', width: '100%'}}>
          <TouchableOpacity
            disabled={!formState.isValid}
            onPress={handleSubmit(onSubmit)}
            style={[
              {
                height: vs(35),
                backgroundColor: formState.isValid
                  ? 'rgba(64, 160, 165, 1)'
                  : 'rgba(64, 160, 165, 0.5)',
                width: '40%',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: vs(20),
              },
            ]}>
            <Text style={styles.title}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigationRef.navigate('signup')}>
            <Text style={styles.title}>Dont have account ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signin;
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: ms(17), color: '#412378', fontWeight: '700'},
  formbox: {marginTop: 10, width: '100%', alignItems: 'center'},
});
