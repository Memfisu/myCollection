import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { CheckIcon, TrashIcon } from 'react-native-heroicons/outline';
import uuid from 'uuid-random';
import { camelize } from '../utils/camelize';
import PropTypes from 'prop-types';

// todo подсказка по уже имеющимся тегам
// todo обработка обязательного поля

export const TagsInputTemplate = ({ field, onChange }) => {
  const { _id: id, label, schemeName } = field;
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState([]);

  const handleAddTag = () => {
    if (currentTag) {
      setTags((currentTags) => [
        ...currentTags,
        {
          label: currentTag,
          value: camelize(currentTag),
          _key: camelize(currentTag),
          _type: 'tag',
          id: uuid(),
        },
      ]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (removedTagId) => {
    setTags((currentTags) =>
      currentTags.filter((tag) => tag.id !== removedTagId)
    );
  };

  useEffect(() => {
    onChange({
      fieldName: schemeName,
      fieldValue: tags,
    });
  }, [tags]);

  return (
    <View key={id} className="mb-6 flex-1">
      {label && (
        <Text className="text-black font-bold text-base mb-3">{label}</Text>
      )}
      <View key={id} className="flex-row w-full">
        <TextInput
          className="p-4 border border-gray-300 rounded flex-1"
          cursorColor="gray"
          onChangeText={(newValue) => setCurrentTag(newValue)}
          value={currentTag}
        />
        <TouchableOpacity
          className="flex ml-4 p-4 rounded-md justify-center items-center border border-gray-200"
          onPress={handleAddTag}
        >
          <CheckIcon size={20} color="black" />
        </TouchableOpacity>
      </View>
      {tags?.length > 0 && (
        <View className="w-full flex-row mt-6">
          {tags.map((tag) => {
            return (
              <TouchableOpacity
                key={tag.id}
                className="flex flex-row py-2 px-4 bg-gray-300 rounded-md mr-4"
                onPress={() => handleRemoveTag(tag.id)}
              >
                <Text className="text-base text-black mr-4">{tag.label}</Text>
                <TrashIcon size={20} color="gray" />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

TagsInputTemplate.propTypes = {
  field: PropTypes.object,
  onChange: PropTypes.func,
};
