import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,FlatList} from 'react-native';
import moment from 'moment';
import {APICall} from '../../API/apiService';
import {checkPermission} from '../../Framework/DownloadFile';

const ApplicationInfo = () => {
  useEffect(() => {
    GetApplicationData();
  }, []);

  const [ApplicationData, setApplicationData] = useState(null);

  //#region Get Application Data
  const GetApplicationData = async () => {
    var _request = JSON.stringify({
      Applications_Req: {
        EntityId: 23119,
      },
    });
    APICall('Mobile/GetLicensee_ApplicationDetails', _request).then(items => {
      setApplicationData(items.ApplicationDetails_Res);
    });
  };

  // create Application Info Data
  const renderItem=({index})=>{
    return(
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
          {/*onPress={checkPermission}*/}
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
              Print Summary
            </Text>
          </TouchableOpacity>
        </View>
        )
  }
      return (
        <FlatList
        data={ApplicationData}
        renderItem={renderItem}>
        </FlatList>
      );
    
};

export default ApplicationInfo;
