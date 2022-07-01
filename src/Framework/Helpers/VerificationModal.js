import React from 'react';
import {Modal, View, StatusBar, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const VerificationModal = ({
  modalVisible,
  setModalVisible,
  successful,
  requestMessage,
  persistLoginAfterLoginVerification,
}) => {
  const {navigate} = useNavigation();
  const buttonHandler = () => {
    if (successful) {
      persistLoginAfterLoginVerification();
      navigate('Dashboard');
    }
    setModalVisible(false);
  };


  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <View
        style={{
          flex: 1,
          padding: 20,
          paddingTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}>
        {!successful && (
          <FailedContent
            buttonHandler={buttonHandler}
            errorMsg={requestMessage}></FailedContent>
        )}

        {successful && (
          <SuccessContent buttonHandler={buttonHandler}></SuccessContent>
        )}
      </View>
    </Modal>
  );
};

const SuccessContent = ({buttonHandler}) => {
  return (
    <View
      style={{
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: '0.25',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width: '100%',
      }}>
      <Ionicons name="checkmark-circle" size={50} color="#10B981"></Ionicons>
      <Text
        style={{
          fontSize: 26,
          marginBottom: 10,
        }}>
        Verified!
      </Text>
      <Text
        style={{
          color: '#6B7280',
          fontSize: 24,
          textAlign: 'center',
          marginBottom: 15,
        }}>
        Yay! You have successfully verified your account.
      </Text>

      <TouchableOpacity
        onPress={buttonHandler}
        style={{
          padding: 5,
          backgroundColor: '#10B981',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          marginVertical: 5,
          height: 50,
          flexDirection: 'row',
        }}>
        <Text style={{color: '#ffffff', fontSize: 28}}>Continue to App</Text>
          
        <Ionicons
          name="arrow-forward-circle"
          size={25}
          color="#ffffff"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

const FailedContent = ({errorMsg, buttonHandler}) => {
  return (
    <View
      style={{
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: '0.25',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width: '80%',
      }}>
      <Ionicons name="close-circle" size={100} color="#EF4444"></Ionicons>
      <Text
        style={{
          fontSize: 30,
          marginBottom: 10,
        }}>
        Failed!
      </Text>
      <Text
        style={{
          color: '#6B7280',
          fontSize: 24,
          textAlign: 'center',
          marginBottom: 15,
        }}>
        {`${errorMsg}`}
      </Text>

      <TouchableOpacity
        onPress={buttonHandler}
        style={{
          padding: 5,
          backgroundColor: '#EF4444',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          marginVertical: 5,
          height: 50,
          flexDirection: 'row',
        }}>
        <Text style={{color: '#ffffff', fontSize: 28}}>Try Again</Text>
        <Ionicons name="arrow-redo-circle" size={25} color="#ffffff"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

export default VerificationModal;
