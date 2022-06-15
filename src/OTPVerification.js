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
import {APICall} from './API/apiService'

const OTPVerification = () => {

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
    var _request= JSON.stringify({
        User: JSON.parse(userDetails).User,
      });
    APICall('/Mobile/ResendOTPDetails', _request).then(items => {
      if (items.ResendOtpDetails_Res?.RecordId > 0) {
        alert('OTP resend successfully');
      }
    });
  };

  const submitOTPVerification = async () => {
    var _request= JSON.stringify({
        VerifyOtpDetails_Req: {
          UserId: JSON.parse(userDetails).User.UserId,
          OTP: code,
        },
      });
      APICall('/Mobile/VerifyOTPDetails', _request).then(items => {
        if (items !== null) {
          if (items.VerifyOtpDetails_Res.Verification_Status) {
            setVerificationSuccessful(true);
            setModalVisible(true);
          } else {
            setVerificationSuccessful(false);
            setRequestMessage(items.VerifyOtpDetails_Res.StatusMessage);
            setModalVisible(true);
          }
        } else {
          setVerificationSuccessful(false);
          setRequestMessage(items.VerifyOtpDetails_Res.StatusMessage);
          setModalVisible(true);
        }
      });
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
