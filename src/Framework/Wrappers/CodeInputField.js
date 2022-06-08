import React, {useState, useRef, useEffect} from 'react';
import {Pressable, TextInput, View, Text} from 'react-native';

const CodeInputField = ({setPinReady, code, setCode, maxLength}) => {
  const codeDigitsArray = new Array(maxLength).fill(0);

  //ref for text input
  const textInputRef = useRef(null);

  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  };

  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  };

  useEffect(() => {
    setPinReady(code.length === maxLength);
    return () => setPinReady(false);
  }, [code]);

  const toCodeDigitInput = (_value, index) => {
    const emptyInputChar = '';
    const digit = code[index] || emptyInputChar;

    //formatting
    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const IsCodeFull = code.length === maxLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && IsCodeFull);

    return (
      <View key={index}
        style={{
          borderColor:
            inputContainerIsFocused && isDigitFocused
              ? '#10B981'
              : 'rgba(16,185,129,0.1)',
          minWidth: '15%',
          borderWidth: 2,
          borderRadius: 5,
        }}>
        <Text
          style={{
            fontSize: 50,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#6D28D9',
          }}>
          {digit}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
      }}>
      <Pressable
        style={{
          width: '70%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </Pressable>
      <TextInput
        style={{position: 'absolute', width: 1, height: 1, opacity: 0}}
        ref={textInputRef}
        value={code}
        onChangeText={setCode}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={maxLength}></TextInput>
    </View>
  );
};

export default CodeInputField;
