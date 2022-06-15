import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { APICall } from '../../API/apiService';

const EndorsementInfo = ({navigation, headerVisible}) => {
  useEffect(() => {
    GetEndorsementData();
  }, []);

  const [EndorsementData, setEndorsementData] = useState(null);

  //#region Get License Line Detail Method
  const GetEndorsementData = async () => {
    var _request= JSON.stringify({
        LicenseLineDetails_Req: {
          LicenseId: 12552,
        },
      });
      APICall('/Mobile/GetLicenseLineDetails',_request).then(items=>{
        setEndorsementData(items.LicenseLineDetails_Res);
      })
   
  };

  if (!!EndorsementData) {
    return (
      <View
        style={{
          width: '95%',
          marginTop:10
        }}>
        {/* Heading text */}
        {headerVisible ? (
          <Text style={{fontSize: 22}}>Endorsement Details</Text>
        ) : null}
        {EndorsementData.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: '100%',
                backgroundColor: index % 2 != 0 ? 'white' : '#fafcff',
                flexDirection: 'row',
                borderColor: 'black',
                borderStyle: 'solid',
                borderWidth: 1,
                padding: 10,
              }}>
              <View style={{width: '97%'}}>
                <Text style={{fontSize: 22}}>{item.LineDescription}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  } else
    return (
      <View>
        <Text>No Record Found</Text>
      </View>
    );
};

export default EndorsementInfo;
