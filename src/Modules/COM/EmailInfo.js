import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';

const EmailInfo = ({navigation}) => {
  useEffect(() => {
    GetEmailsData();
  }, []);

  const APIUrl = 'https://s1.aithent.com/ALiS_Mobile_API/api';
  // const APIUrl = 'http://172.16.2.145/ALiS_API/api/';

  const [EmailData, setEmailData] = useState(null);

  //#region Get Emails Data
  const GetEmailsData = async () => {
    await fetch(APIUrl + '/Mobile/GetLicensee_EmailDetails', {
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
        EmailDetails_Req: {
          EntityId: 23119,
        },
      }),
    })
      .then(processResponse)
      .then(res => {
        const {statusCode, data} = res;

        console.log('statusCode', statusCode);
        console.log('data', data);

        if (statusCode == 200 && !!data) setEmailData(data.EmailDetails_Res);
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

  const redirection = async EmailLogId => {
    navigation.navigate('EmailDetail', {EmailLogId: EmailLogId});
  };

  if (EmailData != null) {
    return EmailData.map((item, index) => {
      return (
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
      );
    });
  } else {
    return (
      <View>
        <Text>No Data found.</Text>
      </View>
    );
  }
};

export default EmailInfo;
