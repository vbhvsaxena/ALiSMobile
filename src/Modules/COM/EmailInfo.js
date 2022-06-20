import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {APICall} from '../../API/apiService';

const EmailInfo = ({navigation}) => {
  const [CurrentPage, setCurrentPage] = useState(1);
  let stopFetchMore = true;

  useEffect(() => {
    GetEmailsData();
  }, [CurrentPage]);

  const [EmailData, setEmailData] = useState([]);

  //#region Get Emails Data
  const GetEmailsData = async () => {
    var _request = JSON.stringify({
      EmailDetails_Req: {
        EntityId: 23119,
        Page_No: CurrentPage,
      },
    });
    APICall('/Mobile/GetLicensee_EmailDetails', _request).then(items => {
      if (items.EmailDetails_Res)
        setEmailData(EmailData.concat(items.EmailDetails_Res));
      else stopFetchMore = false;
    });
  };

  const redirection = async EmailLogId => {
    navigation.navigate('EmailDetail', {EmailLogId: EmailLogId});
  };

  // Create Payment Html Card Design
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={redirection.bind(this, item.EmailLogId)}>
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
          {/* Email Subject && Email Date */}
          <View style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
            {/* Email Subject Field */}
            <View style={{marginLeft: 0, width: '60%'}}>
              {/* Email Subject Label */}
              <Text style={{fontSize: 18}}>Subject</Text>
              {/* Email Subject Value */}
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {item.Subject}
              </Text>
            </View>

            {/* Email Date Field */}
            <View style={{width: '40%'}}>
              {/* Email Date Label */}
              <Text style={{textAlign: 'right', fontSize: 18}}>Date</Text>
              {/* Email Date Value */}
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {moment(item.MailLogDate).format('MM/DD/YYYY')}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
      data={EmailData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={loadMoreItem}
      ListFooterComponent={renderLoader}></FlatList>
  );
};

export default EmailInfo;
