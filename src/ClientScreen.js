import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

AsyncStorage.clear();

const RadioButton = ({onPress, selected, children}) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

function ClientScreen() {
  const {navigate} = useNavigation();
  const [clientCode, setClientCode] = useState(null);
  const [isLiked, setIsLiked] = useState([
    {
      id: 1,
      name: 'Nevada Division of Public and Behavioral Health(NVDPBH)',
      value: 'NVDPBH',
      selected: false,
    },
    {
      id: 2,
      name: 'Radiation Control Program(NVRCP)',
      value: 'NVRCP',
      selected: false,
    },
    {
      id: 3,
      name: 'Substance Abuse Prevention & Treatment Agency Program(NVSAPTA)',
      value: 'NVSAPTA',
      selected: false,
    },
    {
      id: 4,
      name: 'Texas Office of Court Administration(TXOCA)',
      value: 'TXOCA',
      selected: false,
    },
  ]);

  const onRadioBtnClick = item => {
    let updatedState = isLiked.map(isLikedItem =>
      isLikedItem.id === item.id
        ? {...isLikedItem, selected: true}
        : {...isLikedItem, selected: false},
    );
    AsyncStorage.setItem('ClientName', item.value);
    setIsLiked(updatedState);
  };

  const redirectToLogin = () => {
    AsyncStorage.getItem('ClientName')
      .then(res => res)
      .then(val => {
        setClientCode(val);
        console.log('clientCode', clientCode);
        if (clientCode) navigate('Login');
      });
  };

  return (
    <View style={styles.app}>
      {isLiked.map(item => (
        <RadioButton
          onPress={() => onRadioBtnClick(item)}
          selected={item.selected}
          key={item.id}>
          {item.name}
        </RadioButton>
      ))}
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={redirectToLogin}>
          <Text style={styles.lkBtnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginTop: 30,
    marginLeft: 15,
    marginHorizontal: 'auto',
    width: 'auto',
  },
  header: {
    padding: 20,
  },
  title: {},
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: '98%',
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#000',
  },
  radioButtonText: {
    fontSize: 20,
    marginLeft: 16,
  },
  text: {
    lineHeight: 30,
    fontSize: 20,
  },
  btnContainer: {
    marginTop: 50,
    width: '20%',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1.5,
    borderStyle: 'solid',
    position: 'absolute',
    right: 50,
    top: 200,
  },
  lkBtnText: {
    fontSize: 24,
    fontWeight: '500',
  },
});

export default ClientScreen;
