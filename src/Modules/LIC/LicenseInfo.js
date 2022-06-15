import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  FlatList,
} from 'react-native';
import EndorsementInfo from './EndorsementInfo';
import {APICall} from '../../API/apiService';

// Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';

const LicenseInfo = ({navigation}) => {
  useEffect(() => {
    GetLicenseData();
  }, [CurrentPage]);

  // const APIUrl = 'https://s1.aithent.com/ALiS_Mobile_API/api';
  const APIUrl = 'http://192.168.1.44/ALiS_API/api/';

  const [LicenseData, setLicenseData] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ViewEndorsement, setViewEndorsement] = useState(false);

  //#region Get License Detail Method
  const GetLicenseData = async () => {
    setIsLoading(true);
    console.log('CurrentPage', CurrentPage);
    console.log('isLoading', isLoading);

    var _request = JSON.stringify({
      LicenseDetails_Req: {
        LicenseeId: 23119,
        Page_No: CurrentPage,
      },
    });

    console.log(_request);

    APICall('/Mobile/GetLicensee_LicenseDetails', _request).then(items => {
      setLicenseData(items.LicenseDetails_Res.License);
      setIsLoading(false);
    });
  };

  const redirection = async licenseId => {
    navigation.navigate('LicenseDetail', {LicenseId: licenseId});
  };

  const viewEndorsement = () => {
    if (ViewEndorsement) setViewEndorsement(false);
    else setViewEndorsement(true);
  };

  //#region PDF Download Code
  const fileUrl =
    'http://172.16.2.73/ALiSTemplates/CLL_License_Certificate_CLL_237_06062022154649.pdf';

  const checkPermission = async () => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const downloadFile = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
      });
  };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  //#endRegion

  const printLicense = () => {
    alert('Print License');
    // navigation.navigate('LicenseDetail', {LicenseId: licenseId});
  };

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
              onPress={viewEndorsement}>
              {ViewEndorsement ? (
                <Text style={styles.EndorsementLink}>Hide Endorsement</Text>
              ) : (
                <Text style={styles.EndorsementLink}>View Endorsement</Text>
              )}
            </TouchableOpacity>
            {/* Print License Link */}
            <TouchableOpacity
              style={styles.LinkContainer}
              onPress={checkPermission}>
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
  };

  //Load Next Paging Data
  const loadMoreItem = () => {
    console.log('loadMoreItem start ----', CurrentPage + 1);
    setCurrentPage(CurrentPage + 1);
    console.log('loadMoreItem end ----', CurrentPage);
  };

  //Create Loader
  const renderLoader = () => {
    return (
      <View style={{marginVertical: 200, alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#aaa"></ActivityIndicator>
      </View>
    );
  };
  //#endRegion
  return (
    <FlatList
      data={LicenseData}
      renderItem={renderItem}
      keyExtractor={(item,index) => index.toString()}
      onEndReached={loadMoreItem}
      onEndReachedThreshold={0}
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
