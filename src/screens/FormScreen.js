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
import {addFieldsList, addFieldsValues, selectFieldsList, selectValuesList} from '../slices/formSlice';
import {useDispatch, useSelector} from 'react-redux';
import {fieldTypeConfig} from '../utils/fieldsConfig';
import { decode } from 'base-64';

// кастомные поля?
// чтобы было универсально для добавления и редактирования - причём и коллекций, и айтемов
// отправка на бэк + навигация назад + обновление списка коллекций

export const FormScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const fields = useSelector(selectFieldsList)
    const values = useSelector(selectValuesList)
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

    const handleFieldChange = ({ fieldName, fieldValue }) => {
        dispatch(addFieldsValues({ fieldName, fieldValue }))
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true)

            if (values?.collectionIcon) {
                const preparedPath = values?.collectionIcon

                const decodedBlob = new Blob([decode(preparedPath)], { type: 'image/jpeg' });
                const file = new File([decodedBlob], 'image.jpg', { type: 'image/jpeg' });

                const asset = await SanityClient.assets
                    .upload('image', [file])
                    .then(response => {
                        const imageUrl = response.urls.original;
                        console.log('Файл успешно загружен, ссылка:', imageUrl);
                    })
                    .catch(error => {
                        console.error('Ошибка при загрузке файла', error);
                    });

                console.log('asset', asset)
            }

            // const doc = {
            //     _type: 'collection',
            //     ...values,
            // }
            //
            // await SanityClient.create(doc)
            // navigation.navigate('Home')
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    // иконка - {"_type": "image", "asset": {"_ref": "image-9177dae10a6425909313e183c2f974125a70b2f7-270x187-jpg", "_type": "reference"}

    // сейчас иконка сохраняется как {"assets": [{"assetId": null, "base64": null, "duration": null, "exif": null, "height": 864, "rotation": null, "type": "image", "uri": "file:///data/user/0/host.e
    // xp.exponent/cache/ExperienceData/%2540memfisu%252FmyCollection/ImagePicker/8f6d7116-5584-4123-9428-140b81080669.png", "width": 1152}], "canceled": false, "cancelled": false}

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
                        <ScrollView className='flex-1 px-10 py-5 mb-6'>
                            {
                                fields?.map(item => {
                                    return React.cloneElement(fieldTypeConfig[item?.type], {
                                        field: item,
                                        onChange: handleFieldChange
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
                onPress={handleSubmit}
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
