/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ClientScreen from './src/ClientScreen';
import LoginScreen from './src/LoginScreen';
import Dashboard from './src/Dashboard';
import OTPVerification from './src/OTPVerification';
import EmailDetail from './src/Modules/COM/EmailDetail';
import LicenseDetail from './src/Modules/LIC/LicenseDetail';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Client Screen"
          component={ClientScreen}
          options={{
            title: 'Choose Client',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              fontFamily: 'Arial Helvetica',
            },
          }}
        />
        {/* <Stack.Screen
          name="EndorsementInfo"
          component={EndorsementInfo}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpVerification"
          component={OTPVerification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LicenseDetail"
          component={LicenseDetail}
          options={{
            title: 'License Detail',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              fontFamily: 'Arial Helvetica',
            },
          }}
        />

        <Stack.Screen
          name="EmailDetail"
          component={EmailDetail}
          options={{
            title: 'Email Detail',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
              fontFamily: 'Arial Helvetica',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
