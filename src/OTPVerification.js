import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import KeyBoardAvoidingWrapper from './Framework/Wrappers/KeyBoardAvoidingWrapper';
import CodeInputField from './Framework/Wrappers/CodeInputField';
import ResendTimer from './Framework/Wrappers/ResendTimer';
import VerificationModal from './Framework/Wrappers/VerificationModal';

const OTPVerification = () => {
  const APIUrl = 'http://172.16.2.142/ALiS3.0_API/api/';

  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const Max_Code_Length = 4;

  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [verificationSuccessful, setVerificationSuccessful] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  //resend timer
  const [timeLeft, setTimeLeft] = useState(null);
  const [targetTime, setTargetTime] = useState(null);
  const [activeResend, setActiveResend] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendStatus, setResendStatus] = useState('Resend');

  let resendTimerInterval;

  const triggerTimer = (targetTimeInSeconds = 90) => {
    setTargetTime(targetTimeInSeconds);
    setActiveResend(false);
    const finalTime = +new Date() + targetTimeInSeconds * 1000;
    resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000);
  };

  const calculateTimeLeft = finalTime => {
    const difference = finalTime - +new Date();

    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      clearInterval(resendTimerInterval);
      setActiveResend(true);
      setTimeLeft(null);
    }
  };

  const [userDetails, SetUserDetails] = useState(null);

  useEffect(() => {
    triggerTimer();

    AsyncStorage.getItem('@UserData')
      .then(res => res)
      .then(val => {
        SetUserDetails(val);
      });

    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);

  const resendEmail = async () => {
    await fetch(APIUrl + '/Mobile/ResendOTPDetails', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'false',
        'Access-Control-Allow-Methods': 'GET,POST',
        'Access-Control-Allow-Headers':
          'X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma',
        'Access-Control-Expose-Headers': 'Token',
        ClientCode: 'NVDPBH',
        Token: '',
      },
      body: JSON.stringify({
        User: JSON.parse(userDetails).User,
      }),
    })
      .then(processResponse)
      .then(res => {
        const {statusCode, data} = res;

        console.log('statuscode', statusCode);
        console.log('data', data);

        if (statusCode == 200) {
          if (data.ResendOtpDetails_Res?.RecordId > 0) {
            alert('OTP resend successfully');
          }
        }
      })
      .catch(error => {
        console.error(error);
        return {name: 'network error', description: ''};
      });

    function processResponse(response) {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]).then(res => ({
        statusCode: res[0],
        data: res[1],
      }));
    }
  };

  const submitOTPVerification = async () => {
    await fetch(APIUrl + '/Mobile/VerifyOTPDetails', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'false',
        'Access-Control-Allow-Methods': 'GET,POST',
        'Access-Control-Allow-Headers':
          'X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma',
        'Access-Control-Expose-Headers': 'Token',
        ClientCode: 'NVDPBH',
        Token: '',
      },
      body: JSON.stringify({
        VerifyOtpDetails_Req: {
          UserId: JSON.parse(userDetails).User.UserId,
          OTP: code,
        },
      }),
    })
      .then(processResponse)
      .then(res => {
        const {statusCode, data} = res;
        console.log(data);
        if (statusCode == 200) {
          if (data.VerifyOtpDetails_Res.Verification_Status) {
            setVerificationSuccessful(true);
            setModalVisible(true);
          } else {
            setVerificationSuccessful(false);
            setRequestMessage(data.VerifyOtpDetails_Res.StatusMessage);
            setModalVisible(true);
          }
        } else {
          setVerificationSuccessful(false);
          setRequestMessage(data.VerifyOtpDetails_Res.StatusMessage);
          setModalVisible(true);
        }
      })
      .catch(error => {
        console.error(error);
        return {name: 'network error', description: ''};
      });

    function processResponse(response) {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]).then(res => ({
        statusCode: res[0],
        data: res[1],
      }));
    }
  };

  //PERSISTING LOGIN AFTER VERIFICATION
  const persistLoginAfterLoginVerification = async () => {};

  return (
    <KeyBoardAvoidingWrapper>
      <View
        style={{
          flex: 1,
          padding: 25,
          paddingTop: 30,
          backgroundColor: '#ESE7EB',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
          <View
            style={{
              width: 150,
              height: 150,
              backgroundColor: 'rgba(16,185,129,0.1)',
              borderRadius: 250,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <StatusBar style="dark"></StatusBar>
            <FontAwesome name="lock" size={100} color="#6D28D9"></FontAwesome>
          </View>
        </View>
        <View style={{justifyContent: 'space-around'}}>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#6D28D9',
              padding: 10,
              fontFamily: 'Kufam-SemiBoldItalic',
            }}>
            Account Verification
          </Text>
          <Text
            style={{
              color: '#6B7280',
              fontSize: 24,
              fontFamily: 'Kufam-SemiBoldItalic',
              textAlign: 'center',
            }}>
            Please enter the 4-digit code sent to{' '}
            <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
              {userDetails ? JSON.parse(userDetails).User.Email : null}
            </Text>
            .
          </Text>

          <CodeInputField
            setPinReady={setPinReady}
            code={code}
            setCode={setCode}
            maxLength={Max_Code_Length}></CodeInputField>

          {!verifying && pinReady && (
            <TouchableOpacity
              onPress={submitOTPVerification}
              style={{
                padding: 5,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                marginVertical: 5,
                height: 50,
                width: 250,
                flexDirection: 'row',
                backgroundColor: '#10B981',
              }}>
              <Text style={{color: '#ffffff', fontSize: 24}}>Verify</Text>
              {/* <Ionicons
                  name="checkmark-circle"
                  size={15}
                  color="#ffffff"></Ionicons> */}
            </TouchableOpacity>
          )}

          {!verifying && !pinReady && (
            <TouchableOpacity
              disabled={true}
              style={{
                padding: 5,
                backgroundColor: 'rgba(16,185,129,0.1)',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                marginVertical: 5,
                height: 50,
                width: 250,
                flexDirection: 'row',
              }}>
              <Text
                style={{color: '#6B7280', fontSize: 24, alignSelf: 'center'}}>
                Verify
              </Text>
              {/* <Ionicons
                  name="checkmark-circle"
                  size={15}
                  color="#6B7280"></Ionicons> */}
            </TouchableOpacity>
          )}

          {verifying && (
            <TouchableOpacity
              onPress={submitOTPVerification}
              disabled={true}
              style={{
                padding: 5,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                marginVertical: 5,
                height: 50,
                width: 250,
                flexDirection: 'row',
                backgroundColor: '#10B981',
              }}>
              <ActivityIndicator
                size="large"
                color="#ffffff"></ActivityIndicator>
            </TouchableOpacity>
          )}

          <ResendTimer
            activeResend={activeResend}
            resendingEmail={resendingEmail}
            resendStatus={resendStatus}
            timeLeft={timeLeft}
            targetTime={targetTime}
            resendEmail={resendEmail}></ResendTimer>
        </View>
        <VerificationModal
          successful={verificationSuccessful}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          requestMessage={requestMessage}
          persistLoginAfterLoginVerification={
            persistLoginAfterLoginVerification
          }></VerificationModal>
      </View>
    </KeyBoardAvoidingWrapper>
  );
};

export default OTPVerification;
