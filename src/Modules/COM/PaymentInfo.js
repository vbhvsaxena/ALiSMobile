import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import moment from 'moment';
import {APICall} from '../../API/apiService';
import {checkPermission} from '../../Framework/DownloadFile';

const PaymentInfo = () => {
  useEffect(() => {
    GetPaymentDetails();
  }, []);

  const [PaymentData, setPaymentData] = useState(null);

  const GetPaymentDetails = async () => {
    var _request = JSON.stringify({
      PaymentDetails_Req: {
        EntityId: 23119,
      },
    });
    APICall('Mobile/GetLicensee_PaymentDetails', _request).then(items => {
      setPaymentData(items.PaymentDetails_Res);
    });
  };

  const renderItem = ({index}) => {
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
        <TouchableOpacity
          style={{width: '50%', flexDirection: 'row'}}
          onPress={checkPermission}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#809fff',
              textDecorationLine: 'underline',
              textAlign: 'right',
            }}>
            Print Receipt
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return( <FlatList data={PaymentData} renderItem={renderItem}></FlatList>);
};

export default PaymentInfo;
