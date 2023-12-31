import React from 'react';
import { Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import {
  filterCollectionsList,
  selectSelectedTag,
} from '../slices/collectionsListSlice';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useColorScheme } from 'nativewind';

export const TagCloud = ({ categories }) => {
  if (!categories?.length) {
    return null;
  }

  const dispatch = useDispatch();
  const selectedTag = useSelector(selectSelectedTag);
  const { colorScheme } = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  const allTags = categories?.flatMap((category) => category?.myTags || []);
  const tagsCounted = allTags.reduce((acc, item) => {
    if (acc[item.value]) {
      return {
        ...acc,
        [item.value]: {
          label: item.label,
          value: item.value,
          count: acc[item.value] + 1,
        },
      };
    }

    return {
      ...acc,
      [item.value]: {
        label: item.label,
        value: item.value,
        count: 1,
      },
    };
  }, {});
  const sortedTags = Object.values(tagsCounted).sort(
    (a, b) => tagsCounted[b.count] - tagsCounted[a.count]
  );

  const screenWidth = Dimensions.get('window').width;
  const tagsPerPage = Math.floor(screenWidth / 100);

  const pages = [];

  sortedTags.forEach((tag, index) => {
    if (index % tagsPerPage === 0) {
      const pageStart = index;
      const pageEnd = Math.min(index + tagsPerPage, sortedTags.length);
      const page = sortedTags.slice(pageStart, pageEnd);

      pages.push(page);
    }
  });

  const handleTagPress = (value) => {
    dispatch(filterCollectionsList(selectedTag === value ? null : value));
  };

  return (
    <Swiper
      loop={false}
      dotStyle={{ backgroundColor: 'gray' }}
      activeDotStyle={{ backgroundColor: isDarkTheme ? 'white' : 'black' }}
    >
      {pages.map((tags, pageIndex) => (
        <ScrollView
          key={pageIndex}
          horizontal
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10,
          }}
        >
          {tags.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`h-8 flex flex-row p-2 ${
                item.value === selectedTag
                  ? isDarkTheme
                    ? 'bg-violet-800'
                    : 'bg-gray-600'
                  : isDarkTheme
                  ? 'bg-violet-600'
                  : 'bg-gray-300'
              } rounded-md ${index ? 'ml-2' : ''}`}
              onPress={() => handleTagPress(item.value)}
            >
              <Text
                className={`text-xs ${
                  item.value === selectedTag
                    ? isDarkTheme
                      ? 'text-gray-100'
                      : 'text-white'
                    : isDarkTheme
                    ? 'text-gray-300'
                    : 'text-black'
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ))}
    </Swiper>
  );
};

TagCloud.propTypes = {
  categories: PropTypes.array,
};
