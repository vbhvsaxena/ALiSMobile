import React from 'react';
import {View, ActivityIndicator, TouchableOpacity, Text} from 'react-native';

const ResendTimer = ({
  activeResend,
  resendEmail,
  resendingEmail,
  resendStatus,
  timeLeft,
  targetTime,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#6B7280', fontSize: 20, textAlign: 'center'}}>
          Didn't receive the email?{' '}
        </Text>

        {!resendingEmail && (
          <TouchableOpacity
            disabled={!activeResend}
            onPress={resendEmail}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              opacity: !activeResend && 0.5,
            }}>
            <Text
              style={{
                color: '#6D28D9',
                fontSize: 20,
                textDecorationLine: 'underline',
              }}>
              {resendStatus}
            </Text>
          </TouchableOpacity>
        )}

        {resendingEmail && (
          <TouchableOpacity
            disabled
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#6D28D9',
                fontSize: 20,
              }}>
              <ActivityIndicator style={{color: '#6D28D9'}}></ActivityIndicator>
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {!activeResend && (
        <Text style={{color: '#6B7280', fontSize: 20, textAlign: 'center'}}>
          in{' '}
          <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
            {`${timeLeft || targetTime}`}
          </Text>
          {' '}second(s)
        </Text>
      )}
    </View>
  );
};

export default ResendTimer;
