import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Alert, Linking, Text, TouchableOpacity, View } from 'react-native';
import { LinkIcon } from 'react-native-heroicons/outline';
import { LINK_OPEN_ERROR } from '../utils/messages';

export const Link = ({ url, title, additionalClass }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(LINK_OPEN_ERROR(url));
    }
  }, [url]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`flex flex-row items-center ${additionalClass || ''}`}
    >
      <View className="pr-1">
        <LinkIcon size={17} color="gray" />
      </View>
      <Text className="text-base text-cyan-600 underline break-all">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

Link.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  additionalClass: PropTypes.string,
};
