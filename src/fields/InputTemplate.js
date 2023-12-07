import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

// todo обработка обязательного поля

export const InputTemplate = ({ field, defaultValue, onChange }) => {
  const { _id: id, value, label, type, isRequired, schemeName } = field;

  const handleChange = (inputValue) => {
    onChange({
      fieldName: schemeName,
      fieldValue: inputValue,
    });
  };

  return (
    <View key={`${id}_${value}`} className="mb-6">
      {label && (
        <Text className="text-black font-bold text-base mb-3">{`${label}${
          isRequired ? '*' : ''
        }`}</Text>
      )}
      <TextInput
        className="p-4 border border-gray-300 rounded"
        cursorColor="gray"
        onChangeText={handleChange}
        value={value || defaultValue}
        multiline={type === 'text'}
        numberOfLines={type === 'text' ? 4 : 1}
      />
    </View>
  );
};

InputTemplate.propTypes = {
  field: PropTypes.object,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};
