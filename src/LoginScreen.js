import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from './Framework/Wrappers/CustomButton';
import CustomTextBox from './Framework/Wrappers/CustomTextBox';
import {APICall} from './API/apiService';

AsyncStorage.clear();

//#region Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 0,
    height: '100%',
  },
  logo: {
    height: 150,
    width: 200,
    alignItems: 'center',
    top: 0,
    left: 0,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  informativeText: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 20,
    padding: 5,
    fontStyle: 'normal',
    color: 'red',
    marginBottom: 30,
  },
  errorContainer: {
    width: '100%',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  errorText: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 20,
    marginBottom: 10,
    color: '#ff0000',
  },
});
//#endRegion

//#region Component
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    //#region Check Async Storage exist or not
    AsyncStorage.getItem('clientCode', (error, result) => {
      if (result ) {
        this.setState({ClientCode: result});
      }
       else{ 
        this.props.navigation.navigate('Client Screen');
      };
      //Redirect to Login Page
    });
    //#endRegion

    this.state = {
      ClientCode: '',
      UserName: '',
      UserNameErrorMessage: '',
      Password: '',
      PasswordErrorMessage: '',
      UserCredentialsErrorMessage: '',
    };
  }

  validate() {
    this.setState({UserNameErrorMessage: ''});
    this.setState({PasswordErrorMessage: ''});
    this.setState({UserCredentialsErrorMessage: ''});

    if (this.state.UserName == '')
      this.setState({UserNameErrorMessage: '*UserName is a required field.'});

    if (this.state.Password == '')
      this.setState({PasswordErrorMessage: '*Password is a required field.'});

    if (this.state.UserName == '' || this.state.Password == '') return false;
    else return true;
  }

  //#region User Login Method
   UserLogin = async () => {
        var _request= JSON.stringify({
          ValidateUser_Req: {
            UserName: this.state.UserName,
            Password: this.state.Password,
          },
        });
        APICall('/Mobile/SignIn', _request).then(items => {
          if (items.Status === 'Pending') {
           
            this.props.navigation.navigate('OtpVerification');
            AsyncStorage.setItem(
              '@UserData',
              JSON.stringify(items.ValidateUser_Res),
            );
          } else {
            this.setState({UserCredentialsErrorMessage: items.Message});
          }
        });
     
  };
  //#endRegion

  //#region Render Method
  render() {
    return (
      // <ScrollView>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.logo}
            source={require('./../assets/Images/ALiS_Logo.jpg')}></Image>
        </View>
        <View>
          <Text style={styles.text}>Welcome to ALiS</Text>
        </View>
        <View>
          <Text style={styles.informativeText}>
            To login, please enter the same login credential which you have been
            using on the online portal.
          </Text>
        </View>
        <CustomTextBox
          onChangeText={UserName => this.setState({UserName})}
          placeholderText="State Portal Login Name"
          IsShowIcon={true}
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {this.state.UserNameErrorMessage != '' ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {this.state.UserNameErrorMessage}
            </Text>
          </View>
        ) : null}

        <CustomTextBox
          onChangeText={Password => this.setState({Password})}
          placeholderText="Password"
          IsShowIcon={true}
          iconType="lock"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {this.state.PasswordErrorMessage != '' ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {this.state.PasswordErrorMessage}
            </Text>
          </View>
        ) : null}
        <CustomButton
          buttonTitle="Sign In"
          onPress={this.UserLogin}></CustomButton>

        {this.state.UserCredentialsErrorMessage != '' ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {this.state.UserCredentialsErrorMessage}
            </Text>
          </View>
        ) : null}
      </View>
      // </ScrollView>
    );
  }
  //#endRegion
}
//#endRegion
