import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function RadioButton({data, onSelect}) {
  return (
    <View><Text>Radio Button Control</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 45,
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
});
