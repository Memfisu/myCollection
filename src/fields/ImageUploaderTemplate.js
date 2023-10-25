import React, { useState } from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {TrashIcon} from 'react-native-heroicons/outline';

export const ImageUploaderTemplate = ({ field, onChange }) => {
    const { _id: id, value, label, isRequired, schemeName } = field
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // todo https://www.section.io/engineering-education/uploading-deleting-and-downloading-images-uploaded-to-sanity-io/
            // todo https://github.com/ben-cdm/Uploading-deleting-and-dowloading-images-uploaded-to-sanity.io/blob/master/frontend/src/components/UploadImage.jsx
            const baseImage = result.base64  //`data:image/jpg;base64,${result.base64}`

            setImage(baseImage); //todo на айфоне не отображается
            onChange({
                fieldName: schemeName,
                fieldValue: baseImage
            })
        }
    };

    return (
        <View key={id} className='mb-6 flex-1'>
            { label && <Text className='text-black font-bold text-base mb-3'>{label}</Text> }
            {image && (
                <View className='flex-row items-center justify-center mt-3 mb-6'>
                    <Image source={{ uri: image }} className='h-28 w-28 rounded mr-4' />
                    <TouchableOpacity onPress={() => setImage(null)}>
                        <TrashIcon size={30} color='gray' />
                    </TouchableOpacity>
                </View>
            )}
            <View className='flex-1 justify-center items-center'>
                <TouchableOpacity
                    className='bg-gray-500 rounded-lg w-full p-6 flex items-center justify-center'
                    onPress={pickImage}
                >
                    <Text className='text-white text-base'>Pick an icon from your gallery</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}