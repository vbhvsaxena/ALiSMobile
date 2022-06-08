import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';

const ApplicationInfo = () => {
  useEffect(() => {
    GetApplicationData();
  }, []);

  const [ApplicationData, setApplicationData] = useState(null);

  const APIUrl = 'http://172.16.2.142/ALiS3.0_API/api/';

  //#region Get Application Data
  const GetApplicationData = async () => {
    await fetch(APIUrl + '/Mobile/GetLicensee_ApplicationDetails', {
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
        Applications_Req: {
          EntityId: 23119,
        },
      }),
    })
      .then(processResponse)
      .then(res => {
        const {statusCode, data} = res;

        console.log('statusCode', statusCode);
        console.log('data', data);

        if (statusCode == 200 && !!data)
          setApplicationData(data.ApplicationDetails_Res);
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

  if (ApplicationData != null) {
    return ApplicationData.map((item, index) => {
      return (
        <View
          key={index}
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
          {/* Application Type */}
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {ApplicationData[index].ApplicationTypeDescription}
            </Text>
          </View>
          {/* Transaction No && Application Date */}
          <View style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
            {/* Transaction Number Field */}
            <View style={{marginLeft: 0, width: '60%'}}>
              {/* Transaction Number Label */}
              <Text style={{fontSize: 18}}>Application No.</Text>
              {/* Transaction Number Value */}
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {ApplicationData[index].TransactionNo}
              </Text>
            </View>

            {/* Application Date Field */}
            <View style={{width: '40%'}}>
              {/* Application Date Label */}
              <Text style={{textAlign: 'right', fontSize: 18}}>Start Date</Text>
              {/* Application Date Value */}
              <Text
                style={{textAlign: 'right', fontSize: 20, fontWeight: 'bold'}}>
                {moment(ApplicationData[index].CreatedDate).format(
                  'MM/DD/YYYY',
                )}
              </Text>
            </View>
          </View>
          {/* Application Status Label */}
          <View style={{flexDirection: 'row', width: '100%', marginTop: 15}}>
            <Text style={{textAlign: 'right', fontSize: 18}}>Status</Text>
          </View>
          {/* Application Status Value */}
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {ApplicationData[index].StatusDescription}
            </Text>
          </View>
        </View>
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

export default ApplicationInfo;
