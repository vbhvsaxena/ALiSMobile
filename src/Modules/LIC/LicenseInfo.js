import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Alert,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import EndorsementInfo from './EndorsementInfo';
import {APICall} from '../../API/apiService';
import {PDFDownload} from '../../Framework/Helpers/FileDownload';

const LicenseInfo = ({navigation}) => {
  const [LicenseData, setLicenseData] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [ViewEndorsement, setViewEndorsement] = useState(false);
  const [ShowEndorsementByLicenseId, setEndorsementByLicenseId] =
    useState(null);

  let stopFetchMore = true;

  //#region Code used to Handle the back button
  const backAction = () => {
    Alert.alert('Are You Sure', 'you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []),
  );
  //#endRegion

  useEffect(() => {
    GetLicenseData();
  }, [CurrentPage]);

  const GetLicenseData = async () => {
    const data = await AsyncStorage.getItem('@UserData');
    var _request = JSON.stringify({
      LicenseDetails_Req: {
        LicenseeId: JSON.parse(data).UserEntityMapping.EntityId,
        Page_No: CurrentPage,
      },
    });
    await APICall('/Mobile/GetLicensee_LicenseDetails', _request).then(
      licData => {
        if (licData.LicenseDetails_Res) {
          setLicenseData(
            LicenseData.concat(licData.LicenseDetails_Res.License),
          );
        } else stopFetchMore = false;
      },
    );
  };
  const redirection = async licenseId => {
    navigation.navigate('LicenseDetail', {LicenseId: licenseId});
  };

  const ShowEndorsement = async LicenseId => {
    setEndorsementByLicenseId(LicenseId);
    if (ViewEndorsement) setViewEndorsement(false);
    else setViewEndorsement(true);
  };

  //#region PDF Download Code
  const printLicense = async LicenseId => {
    const data = await AsyncStorage.getItem('@UserData');
    var _request = JSON.stringify({
      CredentialInfo_Req: {
        LicenseId: LicenseId,
        UserId: JSON.parse(data).User.UserId,
        PrefNameOnLicPrnt: 'Y',
      },
    });
    await APICall('/Mobile/GenerateLicenseTemplate', _request).then(
      fileData => {
        if (fileData.IsPdfGenerate) PDFDownload(fileData.PdfFileName);
        else console.log(fileData.Message);
      },
    );
  };
  //#endRegion
  // Create License Html Card Design
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={redirection.bind(this, item.LicenseId)}>
        <View style={styles.mainContainer}>
          <View style={styles.firstRow}>
            <View style={styles.descriptionContainer}>
              {/* License Description */}
              <Text style={styles.lblDescription}>{item.Description}</Text>
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
              <Text style={styles.ValBusinessUnit}>{item.BusinessUnit}</Text>
            </View>

            {/* Status Field */}
            <View style={styles.statusContainer}>
              {/* Status Label */}
              <Text style={styles.lblStatus}>Status</Text>
              {/* Status Value */}
              <Text style={styles.ValStatus}>{item.StatusDescription}</Text>
            </View>
          </View>
          {/* Restriction Text Row */}
          <View style={styles.thirdRow}>
            <View>
              {/* Restriction Text Label */}
              <Text style={styles.lblRestrictionText}>Restriction Text</Text>
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
              onPress={ShowEndorsement.bind(this, item.LicenseId)}>
              <Text style={styles.EndorsementLink}>
                {ViewEndorsement &&
                ShowEndorsementByLicenseId === item.LicenseId
                  ? 'Hide Endorsement'
                  : 'View Endorsement'}
              </Text>
            </TouchableOpacity>
            {/* Print License Link */}
            <TouchableOpacity
              style={styles.LinkContainer}
              onPress={printLicense.bind(this, item.LicenseId)}>
              <Text style={styles.PrintLicenseLink}>Print License</Text>
            </TouchableOpacity>
          </View>
          {ViewEndorsement && ShowEndorsementByLicenseId === item.LicenseId ? (
            <View>
              <EndorsementInfo headerVisible={true}></EndorsementInfo>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  //Load Next Paging Data
  const loadMoreItem = () => {
    console.log(stopFetchMore);
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
  //#endRegion
  return (
    <FlatList
      data={LicenseData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={loadMoreItem}
      ListFooterComponent={renderLoader}></FlatList>
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
