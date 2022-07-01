import React from 'react';
import {View, StyleSheet, Image, Text, BackHandler, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from './Framework/Wrappers/CustomButton';
import CustomTextBox from './Framework/Wrappers/CustomTextBox';
import Dropdown from './Framework/Wrappers/CustomDropDown';

import {APICall} from './API/apiService';

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
    top: -100,
    left: 0,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginTop: -100,
    marginBottom: 10,
    color: '#051d5f',
  },
  informativeText: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 20,
    padding: 5,
    fontStyle: 'normal',
    color: 'red',
    marginTop: -50,
    marginBottom: 50,
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

var clientJsonData = [
  {
    Id: 1,
    Text: 'Nevada Division of Public and Behavioral Health(NVDPBH)',
    Value: 'NVDPBH',
    IsSelected: false,
  },
  {
    Id: 2,
    Text: 'Radiation Control Program(NVRCP)',
    Value: 'NVRCP',
    IsSelected: false,
  },
  {
    Id: 3,
    Text: 'Substance Abuse Prevention & Treatment Agency Program(NVSAPTA)',
    Value: 'NVSAPTA',
    IsSelected: false,
  },
  {
    Id: 4,
    Text: 'Texas Office of Court Administration(TXOCA)',
    Value: 'TXOCA',
    IsSelected: false,
  },
];

//#region Component
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    //#region Check Async Storage exist or not
    AsyncStorage.getItem('clientCode', (error, result) => {
      if (result !== null) {
        this.setState({ClientCode: result});
      }
      //Redirect to Login Page
    });
    //#endRegion

    this.state = {
      ClientCode: '',
      ddlSelectedItem: null,
      ClientCodeErrorMessage: '',
      UserName: '',
      UserNameErrorMessage: '',
      Password: '',
      PasswordErrorMessage: '',
      UserCredentialsErrorMessage: '',
    };
  }

  backAction = () => {
    Alert.alert('Are you sure', 'You want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }

  onSelect(item) {
    this.setState({ddlSelectedItem: item});
    this.setState({ClientCode: item?.Value});
    AsyncStorage.setItem('clientCode', item?.Value);
    // console.log(AsyncStorage.getItem('clientCode', (error, result) => {console.log('result',result)}));
  }

  validate() {
    this.setState({ClientCodeErrorMessage: ''});
    this.setState({UserNameErrorMessage: ''});
    this.setState({PasswordErrorMessage: ''});
    this.setState({UserCredentialsErrorMessage: ''});

    if (this.state.ClientCode == '')
      this.setState({ClientCodeErrorMessage: '*Please select Client.'});

    if (this.state.UserName == '')
      this.setState({UserNameErrorMessage: '*UserName is a required field.'});

    if (this.state.Password == '')
      this.setState({PasswordErrorMessage: '*Password is a required field.'});

    if (this.state.UserName == '' || this.state.Password == '') return false;
    else this.UserLogin();
  }

  //#region User Login Method

  UserLogin = async () => {
    var _request = JSON.stringify({
      ValidateUser_Req: {
        UserName: this.state.UserName,
        Password: this.state.Password,
      },
    });
    APICall('/Mobile/SignIn', _request).then(response => {
      console.log(response)
      if (response.Status === 'Pending') {
        this.props.navigation.navigate('OtpVerification');
        AsyncStorage.setItem(
          '@UserData',
          JSON.stringify(response.ValidateUser_Res),
        );
      } else {
        this.setState({UserCredentialsErrorMessage: response.Message});
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

        <Dropdown
          value={this.state.ddlSelectedItem}
          items={clientJsonData}
          onSelect={this.onSelect.bind(this)}></Dropdown>
        {this.state.ClientCodeErrorMessage != '' ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {this.state.ClientCodeErrorMessage}
            </Text>
          </View>
        ) : null}
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
          onPress={this.validate.bind(this)}></CustomButton>

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
