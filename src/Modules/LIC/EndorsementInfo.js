import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const EndorsementInfo = ({navigation, headerVisible}) => {
  useEffect(() => {
    GetEndorsementData();
  }, []);

  // const APIUrl = 'https://s1.aithent.com/ALiS_Mobile_API/api';
  const APIUrl = 'http://192.168.1.44/ALiS_API/api/';

  const [EndorsementData, setEndorsementData] = useState(null);

  //#region Get License Line Detail Method
  const GetEndorsementData = async () => {
    await fetch(APIUrl + '/Mobile/GetLicenseLineDetails', {
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
        LicenseLineDetails_Req: {
          LicenseId: 12552,
        },
      }),
    })
      .then(processResponse)
      .then(res => {
        const {statusCode, data} = res;

        console.log('statusCode', statusCode);
        console.log('data', data.LicenseLineDetails_Res);

        if (statusCode == 200 && !!data) {
          setEndorsementData(data.LicenseLineDetails_Res);
          console.log('EndorsementData', EndorsementData);
        }
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
