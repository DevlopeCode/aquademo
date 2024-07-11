/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {FormField} from '../component/InputBox';
import {ms, vs} from 'react-native-size-matters';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {navigationRef, navigate} from '../navigation/navigationServices';
import {createUser} from '../utils/firebase';
import {insertUser} from '../utils/database';
interface LoginFormInputs {
  email: string;
  password: string;
}

// Regular expression for the official email domain requirement
const officialEmailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// Define the schema for an object with an Email field
const emailValidationSchema = yup.object({
  email: yup
    .string()
    .required('email ID is a mandatory text field')
    .matches(officialEmailRegex, 'Email is not valid'),
});

const Signup = () => {
  const {control, handleSubmit, formState} = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = (props: any) => {
    createUser({
      email: props?.email,
      password: props?.password,
      onErr: (e: any) => {},
      onSuccess: (data: any) => {
        let {providerId, email, uid} = data.user;
        insertUser(providerId, email, uid);
        navigate('signin');
      },
    });
  };
  const emailValidationRule = {
    validate: async (value: string) => {
      try {
        await emailValidationSchema.validateAt('email', {email: value});
        return true;
      } catch (error) {
        return (error as Error).message;
      }
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.formbox}>
        <FormField
          control={control}
          autoFocus={true}
          name="email"
          rules={emailValidationRule}
          placeholder={'email'}
          componentType={'input'}
        />
        <FormField
          control={control}
          // autoFocus={true}
          name="password"
          placeholder={'Password'}
          componentType={'input'}
          secureTextEntry={true}
          rules={{required: 'Password is a mandatory text field'}}
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
            <Text style={styles.title}>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigationRef.navigate('signin')}>
            <Text style={styles.title}>Alredy have account ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: ms(17), color: '#412378', fontWeight: '700'},
  formbox: {marginTop: 10, width: '100%', alignItems: 'center'},
});
