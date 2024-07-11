/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import {navigationRef} from './navigationServices';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createTable,
  fetchLoggedInUser,
  fetchUsers,
  insertUser,
} from '../utils/database';
import Profile from '../screens/Profile';
import UserUpdate from '../screens/UserUpdate';
import {Images} from '../utils/images';
import {SvgFromXml} from 'react-native-svg';
import Loader from '../component/Loder';

const TabNavigation = createBottomTabNavigator();

const App = () => {
  const initData = [
    {
      name: 'John',
      email: 'john@example.com',
      uid: '1234454365678',
      islogin: false,
    },
    {
      name: 'jam',
      email: 'rizwan@example.com',
      uid: '12345654652378',
      islogin: false,
    },
    {
      name: 'Prabhat',
      email: 'prabht@example.com',
      uid: '1234235475678',
      islogin: false,
    },
    {
      name: 'rohit',
      email: 'rohit@example.com',
      uid: '3453454357',
      islogin: false,
    },
    {
      name: 'priyesh',
      email: 'priyesh@example.com',
      uid: '5476354',
      islogin: false,
    },
    {
      name: 'Aldab',
      email: 'aldab@example.com',
      uid: '43534745756',
      islogin: false,
    },
    {
      name: 'Rijwan',
      email: 'raj@example.com',
      uid: '745453534',
      islogin: false,
    },
  ];
  const [userdetails, setUserdetails] = useState();
  useEffect(() => {
    fetchLoggedInUser(r => {
      setUserdetails(r);
    });
  }, []);
  const Stack = createNativeStackNavigator();
  const HomeContainer = () => {
    return (
      <TabNavigation.Navigator screenOptions={{headerShown: false}}>
        <TabNavigation.Screen
          component={Home}
          name="home"
          options={{
            tabBarIcon: props => (
              <View>
                {props.focused ? (
                  <SvgFromXml xml={Images.activehome} />
                ) : (
                  <SvgFromXml xml={Images.home} />
                )}
              </View>
            ),
          }}
        />
        <TabNavigation.Screen
          component={Profile}
          name="profile"
          options={{
            tabBarIcon: props => (
              <View>
                {props.focused ? (
                  <SvgFromXml xml={Images.activeprofile} />
                ) : (
                  <SvgFromXml xml={Images.profile} />
                )}
              </View>
            ),
          }}
        />
        <TabNavigation.Screen
          component={UserUpdate}
          name="userupdate"
          options={{
            tabBarIcon: props => (
              <View>
                {props.focused ? (
                  <SvgFromXml xml={Images.activelist} />
                ) : (
                  <SvgFromXml xml={Images.list} />
                )}
              </View>
            ),
          }}
        />
      </TabNavigation.Navigator>
    );
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    createTable();

    fetchUsers(r => {
      setLoading(true);
      if (r.length == 0) {
        initData.map(data => {
          insertUser(data.name, data.email, data.uid);
        });
      }
      fetchLoggedInUser(r => {
        setUserdetails(r);
        setLoading(false);
      });
      console.log(r, 'data');
    });
    return () => {};
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={userdetails ? 'home' : 'signin'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen component={Signin} name="signin" />
          <Stack.Screen component={Signup} name="signup" />
          <Stack.Screen component={HomeContainer} name="home" />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
