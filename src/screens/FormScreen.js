import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Platform,
    StatusBar,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CheckIcon, ArrowUturnLeftIcon} from 'react-native-heroicons/outline';
import SanityClient from '../../sanity';
import {addFieldsList, selectFieldsList} from '../slices/formSlice';
import {useDispatch, useSelector} from 'react-redux';
import {fieldTypeConfig} from '../utils/fieldsConfig';

// кастомные поля?
// чтобы было универсально для добавления и редактирования - причём и коллекций, и айтемов

export const FormScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const fields = useSelector(selectFieldsList)
    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
        const fetchFieldsList = async () => {
            try {
                setIsLoading(true)

                const fieldsList = await SanityClient.fetch(`
                *[_type == 'collectionFields'] {
                  ...
                }
            `);

                dispatch(addFieldsList(fieldsList))
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchFieldsList()
    }, []);

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            {/* go back button, header */}
            <View className='flex-row py-4 px-10'>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <ArrowUturnLeftIcon size={25} color='gray' />
                </TouchableOpacity>
               <Text className='text-black text-xl ml-14'>Add new collection</Text>
           </View>

            <View className='h-px bg-gray-300 mx-10' />

            {/* form fields */}
            {
                isLoading ?
                    <View className='flex-1 justify-center items-center'>
                        <ActivityIndicator size="large" color="#D1D5DB" />
                    </View>
                    : (
                        <ScrollView className='flex-1 px-10 py-5'>
                            {
                                fields?.map(item => {
                                    return React.cloneElement(fieldTypeConfig[item?.type], {
                                        field: item,
                                        onChange: () => console.log('onChange')
                                    });
                                })
                            }
                        </ScrollView>
                    )
            }

            <View className='h-px bg-gray-300 mx-10' />

            {/* Save button */}
            <TouchableOpacity
                className='flex flex-row p-4 justify-center items-center'
                onPress={() => console.log('save')}
            >
                <CheckIcon size={20} color='black' />
                <Text className='text-center text-black text-lg ml-4'>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const SafeViewAndroid = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "white",
        width: '100%',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight+15 : 5,
    }
});
