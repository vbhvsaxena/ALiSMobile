import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';



const Profile = () => {
  useEffect(() => {
    GetUserProfileData();
    OpenAccordionTab('ENTINF');
  }, []);

  const [UserProfileData, setUserProfileData] = useState(null);

  const GetUserProfileData = async () => {
    await fetch('http://172.16.2.145/ALiS_API/api/Mobile/GetUserProfileData', {
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
        LicensedEntity_Req: {
          LicenseeId: 23119,
        },
        LicensedAddress_Req: {
          EntityId: 23119,
          EntityType: 'LSE',
          AddressTypeCode: '',
        },
      }),
    })
      .then(processResponse)
      .then(res => {
        const {statusCode, data} = res;

        console.log('statusCode', statusCode);
        console.log('Profile data', data);

        if (statusCode == 200 && !!data) setUserProfileData(data);
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

  const OpenAccordionTab = val => {
    setAccordion_Index(val);
  };

  const [Accordion_Index, setAccordion_Index] = useState(null);

  if (UserProfileData != null) {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={OpenAccordionTab.bind(this, 'ENTINF')}>
            <View style={styles.accordion_Container}>
              {UserProfileData.PersonalInformation != null ? (
                <Text style={styles.accordion_heading}>Entity Information</Text>
              ) : null}
              <View style={{position: 'absolute', right: 15, top: 15}}>
                {Accordion_Index == 'ENTINF' ? (
                  <FontAwesome
                    name="minus"
                    size={20}
                    style={styles.collapse_image}
                    color="white"></FontAwesome>
                ) : (
                  <FontAwesome
                    name="plus"
                    size={20}
                    style={styles.collapse_image}
                    color="white"></FontAwesome>
                )}
              </View>
            </View>
          </TouchableOpacity>
          {Accordion_Index == 'ENTINF' ? (
            <View style={styles.accordion_body}>
              {/* Entity Id */}
              <View style={styles.fieldsContainer}>
                <Text style={styles.lblName}>Entity Id</Text>
                <TextInput
                  editable={false}
                  style={styles.lblValue}
                  value={
                    UserProfileData.PersonalInformation.EntityNumber
                  }></TextInput>
              </View>
              {/* Last Name */}
              <View style={styles.fieldsContainer}>
                <Text style={styles.lblName}>Last Name</Text>
                <TextInput
                  editable={false}
                  style={styles.lblValue}
                  value={
                    UserProfileData.PersonalInformation.LastName
                  }></TextInput>
              </View>
              {/* First Name */}
              <View style={styles.fieldsContainer}>
                <Text style={styles.lblName}>First Name</Text>
                <TextInput
                  editable={false}
                  style={styles.lblValue}
                  value={
                    UserProfileData.PersonalInformation.FirstName
                  }></TextInput>
              </View>
              {/* Middle Name */}
              <View style={styles.fieldsContainer}>
                <Text style={styles.lblName}>Middle Name</Text>
                <TextInput
                  editable={false}
                  style={styles.lblValue}
                  value={
                    UserProfileData.PersonalInformation.MiddleInitial
                  }></TextInput>
              </View>
              {/* Suffix */}
              <View style={styles.fieldsContainer}>
                <Text style={styles.lblName}>Suffix</Text>
                <TextInput
                  editable={false}
                  style={styles.lblValue}
                  value={
                    UserProfileData.PersonalInformation.Suffix
                  }></TextInput>
              </View>
              {/* Name on Radiographer Credentials */}
              <View style={styles.fieldsContainer}>
                <Text style={styles.lblName}>
                  Name on Radiographer Credentials
                </Text>
                <TextInput
                  editable={false}
                  style={styles.lblValue}
                  value={
                    UserProfileData.PersonalInformation.RadiographerName
                  }></TextInput>
              </View>
              {/* Former Name */}
              <View style={styles.fieldsContainer}>
                <Text style={styles.lblName}>Former Name</Text>
                <TextInput
                  editable={false}
                  style={styles.lblValue}
                  value={
                    UserProfileData.PersonalInformation.FormerName
                  }></TextInput>
              </View>
            </View>
          ) : null}
          {UserProfileData.Address.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={OpenAccordionTab.bind(this, item.AddressTypeCode)}>
                  <View style={styles.accordion_Container}>
                    <Text style={styles.accordion_heading}>
                      {item.AddressTypeDescription}
                    </Text>
                    <View style={{position: 'absolute', right: 15, top: 15}}>
                      {Accordion_Index == item.AddressTypeCode ? (
                        <FontAwesome
                          name="minus"
                          size={20}
                          style={styles.collapse_image}
                          color="white"></FontAwesome>
                      ) : (
                        <FontAwesome
                          name="plus"
                          size={20}
                          style={styles.collapse_image}
                          color="white"></FontAwesome>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
                {Accordion_Index == item.AddressTypeCode ? (
                  <View style={styles.accordion_body}>
                    {/* Country */}
                    <View style={styles.fieldsContainer}>
                      <Text style={styles.lblName}>Country</Text>
                      <TextInput
                        editable={false}
                        style={styles.lblValue}
                        value={item.CountryName}></TextInput>
                    </View>
                    {/* Address */}
                    <View style={styles.fieldsContainer}>
                      <Text style={styles.lblName}>Address</Text>
                      <TextInput
                        editable={false}
                        style={styles.lblValue}
                        value={item.Street1}></TextInput>
                    </View>
                    {/* Apt/Unit */}
                    <View style={styles.fieldsContainer}>
                      <Text style={styles.lblName}>Apt/Unit etc.</Text>
                      <TextInput
                        editable={false}
                        style={styles.lblValue}
                        value={item.Street2}></TextInput>
                    </View>
                    {/* City */}
                    <View style={styles.fieldsContainer}>
                      <Text style={styles.lblName}>City</Text>
                      <TextInput
                        editable={false}
                        style={styles.lblValue}
                        value={item.City}></TextInput>
                    </View>
                    {/* State/Province */}
                    <View style={styles.fieldsContainer}>
                      <Text style={styles.lblName}>State/Province</Text>
                      <TextInput
                        editable={false}
                        style={styles.lblValue}
                        value={item.StateName}></TextInput>
                    </View>
                    {/* Zip */}
                    <View style={styles.fieldsContainer}>
                      <Text style={styles.lblName}>Zip</Text>
                      <TextInput
                        editable={false}
                        style={styles.lblValue}
                        value={item.Zip}></TextInput>
                    </View>
                    {/* County */}
                    <View style={styles.fieldsContainer}>
                      <Text style={styles.lblName}>County</Text>
                      <TextInput
                        editable={false}
                        style={styles.lblValue}
                        value={item.CountyDescription}></TextInput>
                    </View>
                    {/* Primary Phone # - Ext */}
                    <View style={styles.fieldsContainer}>
                      <Text style={styles.lblName}>Primary Phone # - Ext</Text>
                      <View style={{flexDirection: 'row'}}>
                        <TextInput
                          editable={false}
                          style={{
                            width: '70%',
                            backgroundColor: '#f2f2f2',
                            fontSize: 22,
                          }}
                          value={item.Phone}></TextInput>
                        <TextInput
                          editable={false}
                          style={styles.lblValue}
                          // style={{
                          //   width: '28%',
                          //   backgroundColor: '#f2f2f2',
                          //   fontSize: 22,
                          //   marginLeft: '1%',
                          // }}
                          value={item.Extension}></TextInput>
                      </View>
                    </View>
                    {/* Alternate Phone # - Ext */}
                    <View style={styles.fieldsContainer}>
                      <Text style={styles.lblName}>
                        Alternate Phone # - Ext
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <TextInput
                          editable={false}
                          style={{
                            width: '70%',
                            backgroundColor: '#f2f2f2',
                            fontSize: 22,
                          }}
                          value={item.AlternatePhone}></TextInput>
                        <TextInput
                          editable={false}
                          style={styles.lblValue}
                          // style={{
                          //   width: '28%',
                          //   backgroundColor: '#f2f2f2',
                          //   fontSize: 22,
                          //   marginLeft: '1%',
                          // }}
                          value={item.AlternatePhoneExt}></TextInput>
                      </View>
                    </View>
                    {/* Fax */}
                    <View style={styles.fieldsContainer}>
                      <Text style={styles.lblName}>Fax</Text>
                      <TextInput
                        editable={false}
                        style={styles.lblValue}
                        value={item.Fax}></TextInput>
                    </View>
                    {/* Primary Email */}
                    <View style={styles.fieldsContainer}>
                      <Text style={styles.lblName}>Primary E-mail</Text>
                      <TextInput
                        editable={false}
                        style={styles.lblValue}
                        value={item.Email}></TextInput>
                    </View>
                    {/* Alternate Email */}
                    <View style={styles.fieldsContainer}>
                      <Text style={styles.lblName}>Alternate E-mail</Text>
                      <TextInput
                        editable={false}
                        style={styles.lblValue}
                        value={item.AlternateEmail}></TextInput>
                    </View>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>No Record found.</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#2596be',
    alignSelf: 'center',
    marginTop: 20,
    width: '90%',
    height: 'auto',
    borderRadius: 0,
    fontFamily: 'Kufam-SemiBoldItalic',
  },
  accordion_Container: {
    padding: 15,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1.5,
    flexDirection: 'row',
  },
  accordion_heading: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  collapse_image: {
    alignSelf: 'flex-end',
  },
  accordion_body: {
    backgroundColor: '#FFF',
    height: 'auto',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1.5,
  },
  fieldsContainer: {
    width: '95%',
    margin: 10,
  },
  lblName: {
    fontSize: 22,
  },
  lblValue: {
    backgroundColor: '#f2f2f2',
    fontSize: 22,
  },
});

export default Profile;
