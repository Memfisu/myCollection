import React, { useState } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TrashIcon } from 'react-native-heroicons/outline';
import { IMAGE_UPLOADER_HINT } from '../utils/messages';
import PropTypes from 'prop-types';

export const ImageUploaderTemplate = ({ field, onChange }) => {
  const { _id: id, label, schemeName } = field;
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
      const baseImage = result.base64;

      setImage(baseImage); //todo на айфоне не отображается
      onChange({
        fieldName: schemeName,
        fieldValue: baseImage,
      });
    }
  };

  return (
    <View key={id} className="mb-6 flex-1">
      {label && (
        <Text className="text-black font-bold text-base mb-3">{label}</Text>
      )}
      {image && (
        <View className="flex-row items-center justify-center mt-3 mb-6">
          <Image source={{ uri: image }} className="h-28 w-28 rounded mr-4" />
          <TouchableOpacity onPress={() => setImage(null)}>
            <TrashIcon size={30} color="gray" />
          </TouchableOpacity>
        </View>
      )}
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          className="bg-gray-500 rounded-lg w-full p-6 flex items-center justify-center"
          onPress={pickImage}
        >
          <Text className="text-white text-base">{IMAGE_UPLOADER_HINT}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ImageUploaderTemplate.propTypes = {
  field: PropTypes.object,
  onChange: PropTypes.func,
};
