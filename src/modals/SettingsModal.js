import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Switch} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import {useColorScheme} from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

// todo подтягивать текущие настройки юзера

export const SettingsModal = ({ onChange }) => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['50%', '80%'], []);
    const {colorScheme, setColorScheme, toggleColorScheme} = useColorScheme();
    const [isEnabled, setIsEnabled] = useState(colorScheme === 'dark');

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('theme');
                if (value !== null) {
                    setColorScheme(value);
                    setIsEnabled(value === 'dark');
                }
            } catch (error) {
                console.log(error)
            }
        };

        getData();
    }, [colorScheme]);

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('theme', value);
        } catch (error) {
            console.log(error)
        }
    };

    const handleClosePress = () => bottomSheetRef.current.close()

    const toggleSwitch = async () => {
        await storeData(isEnabled ? 'light' : 'dark');
        setIsEnabled(previousState => !previousState);
        toggleColorScheme();
    }

    useFocusEffect(
        React.useCallback(() => {
            return () => bottomSheetRef.current?.close()
        }, [])
    );

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose
            onChange={onChange}
            backgroundStyle={BottomSheetStyle.Container}
        >
            <View className='flex flex-1'>
                <View className='flex justify-center items-center flex-row relative mb-4 px-5'>
                    <Text className='text-black text-xl'>Settings</Text>
                    <TouchableOpacity
                        className='absolute right-7'
                        onPress={handleClosePress}
                    >
                        <Text className='text-gray-600 text-base'>Done</Text>
                    </TouchableOpacity>
                </View>

                <View className='flex flex-1 bg-gray-100'>
                    <View className='h-px bg-gray-300' />

                    <View className='flex flex-row items-center p-4 bg-white m-6 rounded-lg'>
                        <Text className='text-black text-base mr-6'>Dark mode</Text>
                        <Switch
                            trackColor={{false: '#767577', true: '#f4f3f4'}}
                            thumbColor={isEnabled ? '#767577' : '#F3F4F6'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
            </View>
        </BottomSheet>
    );
};

const BottomSheetStyle = StyleSheet.create({
    Container: {
        borderTopWidth: 1,
        borderTopColor: 'rgb(209 213 219)',
        borderRadius: 0
    },
});
