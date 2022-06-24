import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {APICall} from '../../API/apiService';
import {PDFDownload} from '../../Framework/Helpers/FileDownload';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApplicationInfo = () => {
  const [CurrentPage, setCurrentPage] = useState(1);
  let stopFetchMore = true;

  useEffect(() => {
    GetApplicationData();
  }, [CurrentPage]);

  const [ApplicationData, setApplicationData] = useState([]);

  //#region Get Application Data
  const GetApplicationData = async () => {
    const data =await AsyncStorage.getItem('@UserData');
    var _request = JSON.stringify({
      Applications_Req: {
        EntityId: JSON.parse(data).UserEntityMapping.EntityId,
        Page_No: CurrentPage,
      },
    });
    APICall('/Mobile/GetLicensee_ApplicationDetails', _request).then(items => {
      if (items.ApplicationDetails_Res)
        setApplicationData(
          ApplicationData.concat(items.ApplicationDetails_Res),
        );
      else stopFetchMore = false;
    });
  };
  //#endRegion

  //#region PDF Download Code
  const printApplicationSummary = async (ApplicationId,AttachmentId) => {
    const data =await AsyncStorage.getItem('@UserData');
    var _request = JSON.stringify({
      DocumentId: AttachmentId,
      ApplicationId: ApplicationId,
      ReferenceType: 'APP',
      UserId: JSON.parse(data).User.UserId,
    });
    await APICall('/Mobile/CreateApplicationSummary', _request).then(
      fileData => {
        console.log(fileData.PDFDocumentUrl);
        if (fileData.IsPdfGenerate) PDFDownload(fileData.PDFDocumentUrl);
        else console.log(fileData.ErrorMessage);
      },
    );
  };
  //#endRegion

  // Create Application Html Card Design
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
        {/* Application Type */}
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {item.ApplicationTypeDescription}
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
              {item.TransactionNo}
            </Text>
          </View>
          {/* Application Date Field */}
          <View style={{width: '40%'}}>
            {/* Application Date Label */}
            <Text style={{textAlign: 'right', fontSize: 18}}>Start Date</Text>
            {/* Application Date Value */}
            <Text
              style={{textAlign: 'right', fontSize: 20, fontWeight: 'bold'}}>
              {moment(item.CreatedDate).format('MM/DD/YYYY')}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
          {/* Application Status Label */}
          <View style={{marginLeft: 0, width: '60%'}}>
            {/* Status Label */}
            <Text style={{fontSize: 18}}>Status</Text>
            {/* Status Value */}
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {item.StatusDescription}
            </Text>
          </View>

          <TouchableOpacity
            onPress={printApplicationSummary.bind(this,item.ApplicationId,item.AttachmentId)}
            style={{width: '40%'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#809fff',
                textDecorationLine: 'underline',
              }}>
              Print Application
            </Text>
          </TouchableOpacity>
        </View>
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
      data={ApplicationData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={loadMoreItem}
      ListFooterComponent={renderLoader}></FlatList>
  );
};

export default ApplicationInfo;
