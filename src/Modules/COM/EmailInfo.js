import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,FlatList} from 'react-native';
import moment from 'moment';
import { APICall } from '../../API/apiService';

const EmailInfo = ({navigation}) => {
  useEffect(() => {
    GetEmailsData();
  }, []);

  const [EmailData, setEmailData] = useState(null);

  //#region Get Emails Data
  const GetEmailsData = async () => {
    var _request= JSON.stringify({
        EmailDetails_Req: {
          EntityId: 23119,
        },
      });
      APICall('Mobile/GetLicensee_EmailDetails',_request).then(items=>{
        setEmailData(items.EmailDetails_Res);
      })
   
  };

  const redirection = async EmailLogId => {
    navigation.navigate('EmailDetail', {EmailLogId: EmailLogId});
  };

  const renderItem = ({index})=>{
    return(
      <TouchableOpacity
      key={index}
      onPress={redirection.bind(this, EmailData[index].EmailLogId)}>
      <View
        style={{
          backgroundColor: '#fff',
          alignSelf: 'center',
          marginTop: 20,
          width: '90%',
          height: 'auto',
          borderRadius: 0,
          fontFamily: 'Kufam-SemiBoldItalic',
          padding: 10,
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 1,
        }}>
        {/* Email Subject && Email Date */}
        <View style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
          {/* Email Subject Field */}
          <View style={{marginLeft: 0, width: '60%'}}>
            {/* Email Subject Label */}
            <Text style={{fontSize: 18}}>Subject</Text>
            {/* Email Subject Value */}
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {EmailData[index].Subject}
            </Text>
          </View>

          {/* Email Date Field */}
          <View style={{width: '40%'}}>
            {/* Email Date Label */}
            <Text style={{textAlign: 'right', fontSize: 18}}>Date</Text>
            {/* Email Date Value */}
            <Text
              style={{
                textAlign: 'right',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {moment(EmailData[index].MailLogDate).format('MM/DD/YYYY')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    )
  }

 
      return (
        <FlatList
        data={EmailData}
        renderItem={renderItem}
        >
        </FlatList>
      );
};

export default EmailInfo;
