import React, {useEffect, useState} from 'react';
import {View, Text,BackHandler,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const SignOut = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e=>{
      LogOut();
    });
    return unsubscribe
    
  }, [navigation]);

  const LogOut = async () => {
    AsyncStorage.removeItem('@UserData')
    navigation.navigate('Login')
  }; 

  return (
    <View>
      <Text>Sign Out</Text>
    </View>
  );
};

export default SignOut;
