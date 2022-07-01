import React, {FC, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Dropdown = ({items = [], value = {}, onSelect = () => {}}) => {
  const [showOption, setShowOption] = useState(false);

  const onSelectedItem = val => {
    setShowOption(false);
    onSelect(val);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropDownStyle}
        activeOpacity={0.8}
        onPress={() => setShowOption(!showOption)}>
        {!!value ? (
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Lato-Regular',
              color: '#333',
              textAlignVertical:'center'
            }}>
            {value?.Text}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Lato-Regular',
              color: '#333',
              textAlignVertical:'center'
            }}>
            Choose an Item
            <AntDesign name="caretdown" size={20} color="#333" />
          </Text>
        )}
      </TouchableOpacity>
      {showOption && (
        <View style={styles.dropDownOption}>
          {items.map((val, i) => {
            return (
              <TouchableOpacity
                key={String(i)}
                onPress={() => onSelectedItem(val)}>
                <Text
                  key={String(i)}
                  style={{
                    fontSize: 20,
                    fontFamily: 'Lato-Regular',
                    color: '#333',
                    padding: 5,
                    borderBottomColor: '#000',
                    borderBottomWidth: 1,
                  }}>
                  {val.Text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '98%'},
  dropDownStyle: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 3,
    minHeight: 60,
    marginBottom: 3,
    flexDirection: 'row',
    textAlignVertical: 'center',
  },
  dropDownOption: {
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    width: '98%',
    height: 230,
    top: 50,
    zIndex: 1,
    padding: 10,
  },
});

export default Dropdown;
