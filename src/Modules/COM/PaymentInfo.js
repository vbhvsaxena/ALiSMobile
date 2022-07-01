import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import {APICall} from '../../API/apiService';
import {PDFDownload} from '../../Framework/Helpers/FileDownload';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentInfo = () => {
  const [CurrentPage, setCurrentPage] = useState(1);
  let stopFetchMore = true;

  useEffect(() => {
    GetPaymentDetails();
  }, [CurrentPage]);

  const [PaymentData, setPaymentData] = useState([]);

  const GetPaymentDetails = async () => {
    const data =await AsyncStorage.getItem('@UserData');
    var _request = JSON.stringify({
      PaymentDetails_Req: {
        EntityId: JSON.parse(data).UserEntityMapping.EntityId,
        Page_No: CurrentPage,
      },
    });
    APICall('/Mobile/GetLicensee_PaymentDetails', _request).then(items => {
      
      if (items.PaymentDetails_Res){
        setPaymentData(PaymentData.concat(items.PaymentDetails_Res));
      }
        
      else stopFetchMore = false;

    });
  };

  //#region PDF Download Code
  const printPaymentReceipt = async (ApplicationId) => {
    var _request = JSON.stringify({
      ClientCode: 'NVDPBH',
      ApplicationId: ApplicationId,
      CredentialHash: 'Credential Number',
      UserName: 'Vaibhav Saxena',
      UserId: 1,
    });
    await APICall('/Mobile/CreatePaymentReceipt', _request).then(fileData => {
      console.log(fileData.PDFDocumentUrl);
      if (fileData.IsPdfGenerate) PDFDownload(fileData.PDFDocumentUrl);
      else console.log(fileData.ErrorMessage);
    });
  };
  //#endRegion

  // Create Payment Html Card Design
  const renderItem = ({item}) => {
    return (
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
        {/* Receipt Number && Payment Amount*/}
        <View style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
          {/* Receipt Number Field */}
          <View style={{marginLeft: 0, width: '60%'}}>
            {/* Receipt Number Label */}
            <Text style={{fontSize: 18}}>Receipt Number</Text>
            {/* Receipt Number Value */}
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {item.ValidationNumber}
            </Text>
          </View>

          {/* Payment Amount Field */}
          <View style={{width: '40%'}}>
            {/* Payment Amount Label */}
            <Text style={{textAlign: 'right', fontSize: 18}}>Amount</Text>
            {/* Payment Amount Value */}
            <Text
              style={{textAlign: 'right', fontSize: 20, fontWeight: 'bold'}}>
              {'$' + item.ValidationAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
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
              {item.CodeDescription}
            </Text>
          </View>

          {/* Payment Date Field */}
          <View style={{width: '40%'}}>
            {/* Payment Date Label */}
            <Text style={{textAlign: 'right', fontSize: 18}}>Date</Text>
            {/* Payment Date Value */}
            <Text
              style={{textAlign: 'right', fontSize: 20, fontWeight: 'bold'}}>
              {moment(item.CreatedDate).format('MM/DD/YYYY')}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={printPaymentReceipt.bind(this,item.ReferenceId)} style={{width: '40%'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#809fff',
              textDecorationLine: 'underline',
            }}>
            Print Receipt
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  //Load Next Paging Data
  const loadMoreItem = () => {
    if (stopFetchMore) setCurrentPage(CurrentPage + 1);
  };

  //Create Loader
  const renderLoader = () => {
    return stopFetchMore ? (
      <View style={{marginVertical: 20, alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#aaa"></ActivityIndicator>
      </View>
    ) : null;
  };

  return (
    <FlatList
      data={PaymentData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={loadMoreItem}
      ListFooterComponent={renderLoader}></FlatList>
  );
};

export default PaymentInfo;
