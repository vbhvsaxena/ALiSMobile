import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
 import EndorsementInfo from './EndorsementInfo';

 const LicenseInfo = ({navigation}) => {
    useEffect(() => {
      GetLicenseData();
    }, []);
  
    const APIUrl = 'http://172.16.2.142/ALiS3.0_API/api/';
  
    const [LicenseData, setLicenseData] = useState(null);
    const [ViewEndorsement, setViewEndorsement] = useState(false);
  
    //#region Get License Detail Method
    const GetLicenseData = async () => {
      await fetch(APIUrl + '/Mobile/GetLicensee_LicenseDetails', {
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
          LicenseDetails_Req: {
            LicenseeId: 23119,
          },
        }),
      })
        .then(processResponse)
        .then(res => {
          const {statusCode, data} = res;
  
          if (statusCode == 200 && !!data)
            setLicenseData(data.LicenseDetails_Res.License);
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
  
    const redirection = async licenseId => {
      navigation.navigate('LicenseDetail', {LicenseId: licenseId});
    };
  
    const viewEndorsement = () => {
      if (ViewEndorsement) setViewEndorsement(false);
      else setViewEndorsement(true);
    };
  
    const printLicense = () => {
      alert('Print License');
      // navigation.navigate('LicenseDetail', {LicenseId: licenseId});
    };
  
    //#endRegion
    if (LicenseData != null) {
      return (
        <ScrollView>
          {LicenseData.map((item, index) => {
            // main Wrapper
            return (
              <TouchableOpacity
                key={index}
                onPress={redirection.bind(this, item.LicenseId)}>
                <View style={styles.mainContainer}>
                  <View style={styles.firstRow}>
                    <View style={styles.descriptionContainer}>
                      {/* License Description */}
                      <Text style={styles.lblDescription}>
                        {item.Description}
                      </Text>
                      {/* License Number Field*/}
                      <Text style={styles.lblLicenseNumber}>
                        {!!item.LicenseNumberToDisplay
                          ? item.LicenseNumberToDisplay
                          : item.LicenseNumber}
                      </Text>
                    </View>
  
                    <View style={styles.expiryDateContainer}>
                      {/* Expiry Date Field */}
                      <Text style={styles.lblExpiryDate}>Exp. Date</Text>
                      {/* Expiry Date Value */}
                      <Text style={styles.ValExpiryDate}>
                        {!!item.ExpiryDate ? item.ExpiryDate : 'NA'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.secondRow}>
                    {/* Business Unit Field */}
                    <View style={styles.businessUnitContainer}>
                      {/* Business Unit Label */}
                      <Text style={styles.lblBusinessUnit}>Business Unit</Text>
                      {/* Business Unit Value */}
                      <Text style={styles.ValBusinessUnit}>
                        {item.BusinessUnit}
                      </Text>
                    </View>
  
                    {/* Status Field */}
                    <View style={styles.statusContainer}>
                      {/* Status Label */}
                      <Text style={styles.lblStatus}>Status</Text>
                      {/* Status Value */}
                      <Text style={styles.ValStatus}>
                        {item.StatusDescription}
                      </Text>
                    </View>
                  </View>
                  {/* Restriction Text Row */}
                  <View style={styles.thirdRow}>
                    <View>
                      {/* Restriction Text Label */}
                      <Text style={styles.lblRestrictionText}>
                        Restriction Text
                      </Text>
                      {/* Restriction Text Value */}
                      <Text style={styles.ValRestrictionText}>
                        {!!item.RestrictionText ? item.RestrictionText : 'NA'}
                      </Text>
                    </View>
                  </View>
                  {/* Links Row */}
                  <View style={styles.forthRow}>
                    {/* View Endorsement Link */}
                    <TouchableOpacity
                      style={styles.LinkContainer}
                      onPress={viewEndorsement}>
                      {ViewEndorsement ? (
                        <Text style={styles.EndorsementLink}>
                          Hide Endorsement
                        </Text>
                      ) : (
                        <Text style={styles.EndorsementLink}>
                          View Endorsement
                        </Text>
                      )}
                    </TouchableOpacity>
                    {/* Print License Link */}
                    <TouchableOpacity
                      style={styles.LinkContainer}
                      onPress={printLicense}>
                      <Text style={styles.PrintLicenseLink}>Print License</Text>
                    </TouchableOpacity>
                  </View>
                  {ViewEndorsement ? (
                    <View>
                      <EndorsementInfo headerVisible={true}></EndorsementInfo>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    } else
      return (
        <View>
          <Text>No Record Found</Text>
        </View>
      );
  };
  
  const styles = StyleSheet.create({
    mainContainer: {
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
    },
    //   First Row Fields
    firstRow: {
      flexDirection: 'row',
      width: '100%',
    },
    descriptionContainer: {
      marginLeft: 0,
      width: '60%',
    },
    lblDescription: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    lblLicenseNumber: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    expiryDateContainer: {
      width: '40%',
    },
    lblExpiryDate: {
      textAlign: 'right',
      fontSize: 18,
    },
    ValExpiryDate: {
      textAlign: 'right',
      fontSize: 20,
      fontWeight: 'bold',
    },
    //   Second Row Fields
    secondRow: {
      flexDirection: 'row',
      width: '100%',
      marginTop: 10,
    },
    businessUnitContainer: {
      marginLeft: 0,
      width: '60%',
    },
    lblBusinessUnit: {
      fontSize: 18,
    },
    ValBusinessUnit: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    statusContainer: {
      width: '40%',
    },
    lblStatus: {
      textAlign: 'right',
      fontSize: 18,
    },
    ValStatus: {
      textAlign: 'right',
      fontSize: 20,
      fontWeight: 'bold',
      flexWrap: 'wrap',
    },
    thirdRow: {
      flexDirection: 'row',
      width: '100%',
      marginTop: 10,
    },
    lblRestrictionText: {
      fontSize: 18,
    },
    ValRestrictionText: {
      marginLeft: 0,
      width: '100%',
      fontSize: 20,
      fontWeight: 'bold',
      flexWrap: 'wrap',
    },
    forthRow: {
      flexDirection: 'row',
      width: '100%',
      marginTop: 10,
    },
    LinkContainer: {width: '50%'},
    EndorsementLink: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#809fff',
      textDecorationLine: 'underline',
    },
    PrintLicenseLink: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#809fff',
      textDecorationLine: 'underline',
      textAlign: 'right',
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    loaderHorizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });
  
  export default LicenseInfo;
  