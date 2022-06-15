import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import EndorsementInfo from './EndorsementInfo';
import { APICall } from '../../API/apiService';

const LicenseDetail = () => {
    const route = useRoute();
  
    useEffect(() => {
      GetLicenseData();
    }, []);
  
    const [LicenseData, setLicenseData] = useState(null);
  
    const GetLicenseData = async () => {
     var _request= JSON.stringify({
          LicenseDetails_Req: {
            LicenseId: route.params.LicenseId,
          },
        });
        APICall('/Mobile/GetLicenseDetails', _request).then(items => {
          setLicenseData(items.LicenseDetails_Res);
        });
        
    };
  
    if (!!LicenseData) {
      return (
        <ScrollView>
          <View
            style={{
              width: '95%',
              backgroundColor: 'white',
              alignSelf: 'center',
              alignItems: 'center',
              margin: 20,
              padding: 10,
            }}>
            {/* BUsiness Unit */}
            <View style={{width: '95%', marginTop: 20}}>
              <Text style={{fontSize: 22}}>Business Unit</Text>
              <TextInput
                editable={false}
                style={{backgroundColor: '#f2f2f2', fontSize: 22}}
                value={LicenseData.BusinessUnit}></TextInput>
            </View>
            {/* Credential Type */}
            <View style={{width: '95%', margin: 10}}>
              <Text style={{fontSize: 22}}>Credential Type</Text>
              <TextInput
                editable={false}
                style={{backgroundColor: '#f2f2f2', fontSize: 22}}
                value={LicenseData.LicenseType}></TextInput>
            </View>
            {/* Credential Status */}
            <View style={{width: '95%', margin: 10}}>
              <Text style={{fontSize: 22}}>Credential Status</Text>
              <TextInput
                editable={false}
                style={{backgroundColor: '#f2f2f2', fontSize: 22}}
                value={LicenseData.StatusDescription}></TextInput>
            </View>
            {/* Credential Number */}
            <View style={{width: '95%', margin: 10}}>
              <Text style={{fontSize: 22}}>Credential Number</Text>
              <TextInput
                editable={false}
                style={{backgroundColor: '#f2f2f2', fontSize: 22}}
                value={LicenseData.License.LicenseNumber}></TextInput>
            </View>
            {/* First Issue Date */}
            <View style={{width: '95%', margin: 10}}>
              <Text style={{fontSize: 22}}>First Issue Date</Text>
              <TextInput
                editable={false}
                style={{backgroundColor: '#f2f2f2', fontSize: 22}}
                value={LicenseData.License.FirstEffectiveDate}></TextInput>
            </View>
            {/* Effective Date */}
            <View style={{width: '95%', margin: 10}}>
              <Text style={{fontSize: 22}}>Effective Date</Text>
              <TextInput
                editable={false}
                style={{backgroundColor: '#f2f2f2', fontSize: 22}}
                value={LicenseData.License.EffectiveDate}></TextInput>
            </View>
            {/* Expiration Date */}
            <View style={{width: '95%', margin: 10}}>
              <Text style={{fontSize: 22}}>Expiration Date</Text>
              <TextInput
                editable={false}
                style={{backgroundColor: '#f2f2f2', fontSize: 22}}
                value={LicenseData.License.ExpiryDate}></TextInput>
            </View>
            {/* Restrictions */}
            <View style={{width: '95%', margin: 10}}>
              <Text style={{fontSize: 22}}>Restrictions</Text>
              <TextInput
                editable={false}
                style={{backgroundColor: '#f2f2f2', fontSize: 22}}
                value={LicenseData.License.RestrictionText}></TextInput>
            </View>
            <EndorsementInfo headerVisible={true}></EndorsementInfo>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View>
          <Text>No Data found!!!</Text>
        </View>
      );
    }
  };
  
  export default LicenseDetail;
  