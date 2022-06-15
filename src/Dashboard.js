import * as React from 'react';
import {Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import Home from './../src/Home';
import Profile from './../src/Profile';
import SignOut from './../src/SignOut';

const Tab = createMaterialTopTabNavigator();

function Dashboard() {
  return (
    <Tab.Navigator
      initialRouteName={Home}
      tabBarPosition="bottom"
      screenOptions={({route}) => ({
        tabBarIndicatorStyle: {
          backgroundColor: 'red',
        },
        tabBarItemStyle: {
          width: Dimensions.get('window').width/3,
          height: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontStyle: 'normal',
          color: '#000',
          textTransform: 'none',
        },
        tabBarActiveTintColor: 'red',
        tabBarIcon: tintColor => {
          if (route.name === 'Home') {
            return (
              <FontAwesome
                name="home"
                size={40}
                style={{width: 300, height: 40, marginLeft: -5, marginTop: -5}}
                color={
                  tintColor.focused ? tintColor.color : '#000'
                }></FontAwesome>
            );
          } else if (route.name === 'Profile') {
            return (
              <FontAwesome
                name="user"
                size={40}
                style={{width: 300, height: 40, marginLeft:-3, marginTop: -5}}
                color={
                  tintColor.focused ? tintColor.color : '#000'
                }></FontAwesome>
            );
          } else if (route.name === 'LogOut') {
            return (
              <MaterialCommunityIcons
                name="logout"
                size={40}
                style={{width: 300, height: 50, marginLeft: -5, marginTop: -10}}
                color={
                  tintColor.focused ? tintColor.color : '#000'
                }></MaterialCommunityIcons>
            );
          }
        },
        tabBarStyle: {backgroundColor: '#fff', elevation: 0},
      })}>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
      <Tab.Screen name="LogOut" component={SignOut}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default Dashboard;
