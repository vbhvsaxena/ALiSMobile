import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function CustomTextBox({
  labelValue,
  placeholderText,
  IsShowIcon,
  iconType,
  style,
  ...rest
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={IsShowIcon ? styles.iconStyle : styles.hideIcon}>
        {/* <AntDesign name={iconType} size={20} color="#666" /> */}
        <AntDesign name='user' size={20} color="#666"/>
      </View>
      <TextInput
        value={labelValue}
        style={style ? style : styles.input}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 3,
    marginBottom: 3,
    height: 60,
    width: '98%',
    borderRadius: 3,    
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  hideIcon: {
    display: 'none',
  },
  iconStyle: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 5,
    flex: 1,
    fontSize: 20,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
