import * as React from 'react';
import {Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LicenseInfo from './Modules/LIC/LicenseInfo';
import EmailInfo from './Modules/COM/EmailInfo';
import PaymentInfo from './Modules/COM/PaymentInfo';
import ApplicationInfo from  './Modules/COM/ApplicationInfo';

const Tab = createMaterialTopTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      initialRouteName={EmailInfo}
      tabBarPosition='top'
      screenOptions={({route}) => ({
        tabBarIndicatorStyle:{
          backgroundColor:'white',
        },
        tabBarItemStyle: {
          width: Dimensions.get('window').width/4,
          height: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontStyle: 'normal',
          color: '#fff',
          textTransform: 'none',
        },
        tabBarActiveTintColor:'red',
        tabBarIcon: (tintColor) => {
          if (route.name === 'License') {
            return (
              <FontAwesome
                name="drivers-license-o"
                size={30}
                style={{width: 80, height: 40, marginLeft: -5, marginTop: -5}}
                color="#fff"></FontAwesome>
            );
          } else if (route.name === 'Application') {
            return (
              <MaterialCommunityIcons
                name="application"
                size={30}
                style={{width: 80, height: 40, marginLeft: -5, marginTop: -5}}
                color="#fff"></MaterialCommunityIcons>
            );
          } else if (route.name === 'Payment') {
            return (
              <MaterialIcons
                name="payment"
                size={40}
                style={{width: 80, height: 50, marginLeft: -8, marginTop: -10}}
                color="#fff"></MaterialIcons>
            );
          } else if (route.name === 'Emails') {
            return (
              <MaterialCommunityIcons
                name="email"
                size={40}
                style={{width: 80, height: 40, marginLeft: -8, marginTop: -10}}
                color="#fff"></MaterialCommunityIcons>
            );
          }
        },
        tabBarStyle: {backgroundColor: '#4591d0', elevation: 0},
      })}>
      <Tab.Screen name="License" component={LicenseInfo}></Tab.Screen>
      <Tab.Screen name="Application" component={ApplicationInfo}></Tab.Screen>
      <Tab.Screen name="Payment" component={PaymentInfo}></Tab.Screen>
      <Tab.Screen name="Emails" component={EmailInfo}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default Home;
