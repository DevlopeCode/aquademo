/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  View,
  TextInput,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {ms, s, vs} from 'react-native-size-matters';
import React from 'react';
import {Controller, Control, FieldValues} from 'react-hook-form';

interface Props<TFieldValues extends FieldValues> {
  control?: Control<TFieldValues>;
  name?: keyof TFieldValues | any | string;
  rules?: Object;
  placeholder?: string;
  secureTextEntry?: boolean;
  componentType?: 'input' | 'dropdown' | 'password' | 'inputgray' | 'inputblue';
  items?: {label: string; value: string}[];
  runtimeError?: string | null;
  inputRef?: any;
  onTapEye?: () => void;
  onPressbtn?: () => void;
  maxlen?: number | any;
  title?: string | any;
  onSubmitEditing?: () => void;
  autoFocus?: boolean | any;
}

export const FormField = <TFieldValues extends FieldValues>({
  inputRef,
  control,
  name,
  rules,
  placeholder,
  secureTextEntry = false,
  componentType,
  items,
  runtimeError,
  onTapEye,
  onPressbtn,
  maxlen,
  title,
  onSubmitEditing,
  autoFocus = false,
}: Props<TFieldValues>) => {
  const {height, width} = useWindowDimensions();
  const memoizedValues: any = {};

  const wp = (val: any) => {
    if (memoizedValues[val + 'wp']) {
      return memoizedValues[val + 'wp'];
    }
    const result = (width / 100) * val;
    memoizedValues[val + 'wp'] = result;
    return result;
  };

  const hp = (val: any) => {
    if (memoizedValues[val + 'hp']) {
      return memoizedValues[val + 'hp'];
    }
    const result = (height / 100) * val;
    memoizedValues[val + 'hp'] = result;
    return result;
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: {onChange, onBlur, value, ref},
        fieldState: {error},
      }) => (
        <>
          {componentType === 'input' && (
            <View
              style={{
                width: wp(70),
                height: vs(35),
                marginVertical: hp(2),
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#666666',
                  fontSize: s(16),
                  marginLeft: '2%',
                  textTransform: 'capitalize',
                }}>
                {title ? title : name}
              </Text>
              <TextInput
                ref={ref}
                autoFocus={autoFocus}
                style={{
                  backgroundColor: '#F6F6F6',
                  height: vs(35),
                  width: '100%',
                  borderRadius: hp(1),
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 9,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 12.35,
                  elevation: 19,
                  padding: 10,
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                maxLength={maxlen}
                onSubmitEditing={onSubmitEditing}
              />
            </View>
          )}

          {componentType === 'password' && (
            <View
              style={{
                width: wp(35),
                height: vs(35),
                marginVertical: hp(1),
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#666666',
                  fontSize: s(6),
                  lineHeight: 25,
                  marginLeft: '2%',
                }}>
                {name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  height: vs(35),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  ref={ref}
                  style={{
                    backgroundColor: '#F6F6F6',
                    height: vs(26),
                    width: '100%',
                    borderRadius: hp(1),
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 9,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 12.35,
                    elevation: 19,
                    padding: 10,
                  }}
                  // value={value}
                  onBlur={onBlur}
                  secureTextEntry={secureTextEntry}
                  onChangeText={onChange}
                  onSubmitEditing={onSubmitEditing}
                />
                {/* <TouchableOpacity onPress={onTapEye} style={{ height: vs(20), width: ms(30), zIndex: 10, position: 'absolute', right: 0, justifyContent: 'center' }} >{!secureTextEntry ? SvgAssets('eyeopen') : SvgAssets('eyeclose')}</TouchableOpacity> */}
              </View>
            </View>
          )}

          {error && componentType != 'password' && (
            <Text
              style={{
                color: 'red',
                marginTop: hp(2),
                marginLeft: componentType == 'inputgray' ? '26.5%' : 0,
              }}>
              {error.message || 'Error'}
            </Text>
          )}
          {error && componentType == 'password' && (
            <Text style={{color: 'red', marginTop: hp(2), marginLeft: 0}}>
              {error.message || 'Error'}
            </Text>
          )}

          {runtimeError && (
            <Text style={{color: 'red', marginTop: hp(2)}}>
              {runtimeError || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};
