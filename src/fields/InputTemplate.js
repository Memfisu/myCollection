import React from 'react';
import {View, Text, TextInput} from 'react-native';

// обработка обязательного поля

export const InputTemplate = ({ field, onChange }) => {
    const { _id: id, value, label, type, isRequired, schemeName } = field

    const handleChange = (inputValue) => {
        onChange({
            fieldName: schemeName,
            fieldValue: inputValue
        })
    }

    return (
        <View key={`${id}_${value}`} className='mb-6'>
            { label && <Text className='text-black font-bold text-base mb-3'>{label}</Text> }
            <TextInput
                className='p-4 border border-gray-300 rounded'
                cursorColor='gray'
                onChangeText={handleChange}
                value={value}
                multiline={type === 'text'}
                numberOfLines={type === 'text' ? 4 : 1}
            />
        </View>
    );
};
