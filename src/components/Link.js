import React, {useCallback} from 'react';
import {Alert, Linking, Text, TouchableOpacity, View} from 'react-native';
import {LinkIcon} from 'react-native-heroicons/outline';

export const Link = ({ url, title, additionalClass }) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Unable to open, check the link ${url}`);
        }
    }, [url]);

    return (
        <TouchableOpacity onPress={handlePress} className={`flex flex-row items-center ${additionalClass || ''}`}>
            <View className='pr-1'>
                <LinkIcon size={17} color='gray' />
            </View>
            <Text className='text-base text-cyan-600 underline break-all'>{title}</Text>
        </TouchableOpacity>
    )
};