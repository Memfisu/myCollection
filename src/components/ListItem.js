import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { urlFor } from '../../sanity';
import { PhotoIcon } from 'react-native-heroicons/outline';
import PropTypes from 'prop-types';

export const ListItem = ({
  id,
  onChange,
  imgUrl,
  title,
  description,
  tags,
  index,
  items,
}) => {
  const handleItemPress = (itemId) => {
    onChange(itemId, title, index);
  };

  return (
    <TouchableOpacity
      className={`flex flex-row mb-2 p-6 rounded-md items-center max-w-full ${
        index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
      }`}
      onPress={() => handleItemPress(id)}
    >
      {imgUrl ? (
        <Image
          source={{ uri: urlFor(imgUrl).url() }}
          className="h-20 w-20 rounded"
        />
      ) : (
        <PhotoIcon size={80} color="gray" />
      )}
      <View className="ml-4 flex-1 w-full">
        <View className="flex flex-row items-center pl-1 mb-2">
          <Text className="text-black font-bold text-base">{title}</Text>
          {items?.length > 0 && (
            <Text className="text-gray-600 text-xs ml-2">{`(${items?.length} items)`}</Text>
          )}
        </View>
        {description && (
          <Text numberOfLines={5} className="text-black p-1 mb-2">
            {description}
          </Text>
        )}
        {tags?.length ? (
          <View className="flex flex-row flex-wrap w-full">
            {tags.map((item) => (
              <Text
                key={item._key}
                className={`p-2 mb-2 bg-gray-300 rounded-md text-xs mr-2`}
              >
                {item.label}
              </Text>
            ))}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func,
  imgUrl: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  tags: PropTypes.array,
  index: PropTypes.number,
  items: PropTypes.array,
};
