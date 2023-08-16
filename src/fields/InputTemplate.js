import React from 'react';
import {View, Text, TextInput} from 'react-native';

export const InputTemplate = ({ field }) => {
    const { _id: id, onChange, value, label, type } = field

    return (
        <View className='mb-6'>
            { label && <Text className='text-black font-bold text-base mb-3'>{label}</Text> }
            <TextInput
                key={id}
                className='p-4 border border-gray-300 rounded'
                cursorColor='gray'
                onChangeText={onChange}
                value={value}
                multiline={type === 'text'}
                numberOfLines={type === 'text' ? 4 : 1}
            />
        </View>
    );
};
