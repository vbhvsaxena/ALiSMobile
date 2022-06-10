import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';

const PaymentInfo = () => {
  useEffect(() => {
    GetPaymentDetails();
  }, []);

  const APIUrl = 'http://172.16.2.145/ALiS_API/api/';

  const [PaymentData, setPaymentData] = useState(null);

  const GetPaymentDetails = async () => {
    await fetch(APIUrl + '/Mobile/GetLicensee_PaymentDetails', {
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
        PaymentDetails_Req: {
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
          setPaymentData(data.PaymentDetails_Res);
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

  if (PaymentData != null) {
    return PaymentData.map((item, index) => {
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
          {/* Receipt Number && Payment Amount*/}
          <View style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
            {/* Receipt Number Field */}
            <View style={{marginLeft: 0, width: '60%'}}>
              {/* Receipt Number Label */}
              <Text style={{fontSize: 18}}>Receipt Number</Text>
              {/* Receipt Number Value */}
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {PaymentData[index].ValidationNumber}
              </Text>
            </View>

            {/* Payment Amount Field */}
            <View style={{width: '40%'}}>
              {/* Payment Amount Label */}
              <Text style={{textAlign: 'right', fontSize: 18}}>Amount</Text>
              {/* Payment Amount Value */}
              <Text
                style={{textAlign: 'right', fontSize: 20, fontWeight: 'bold'}}>
                {PaymentData[index].ValidationAmount}
              </Text>
            </View>
          </View>

          {/* Payment Mode && Payment Date*/}
          <View style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
            {/* Payment Mode Field */}
            <View style={{marginLeft: 0, width: '60%'}}>
              {/* Payment Mode Label */}
              <Text style={{fontSize: 18}}>Mode</Text>
              {/* Payment Mode Value */}
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {PaymentData[index].CodeDescription}
              </Text>
            </View>

            {/* Payment Date Field */}
            <View style={{width: '40%'}}>
              {/* Payment Date Label */}
              <Text style={{textAlign: 'right', fontSize: 18}}>Date</Text>
              {/* Payment Date Value */}
              <Text
                style={{textAlign: 'right', fontSize: 20, fontWeight: 'bold'}}>
                {moment(PaymentData[index].CreatedDate).format('MM/DD/YYYY')}
              </Text>
            </View>
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

export default PaymentInfo;
