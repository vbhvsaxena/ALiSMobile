import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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

  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <Text style={styles.title}>Radio Buttons</Text>
      </View>
      <Text style={styles.text}>Do you like react native?</Text>
      {isLiked.map(item => (
        <RadioButton
          onPress={() => onRadioBtnClick(item)}
          selected={item.selected}
          key={item.id}>
          {item.name}
        </RadioButton>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: 'auto',
    maxWidth: 500,
  },
  header: {
    padding: 20,
  },
  title: {},
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#F8F8F8',
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
    backgroundColor: '#98CFB6',
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
  text: {
    lineHeight: 30,
    fontSize: 20,
    marginVertical: 5,
  },
});

export default ClientScreen;
