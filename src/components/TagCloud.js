import React from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {
    filterCollectionsList,
    selectSelectedTag
} from '../slices/collectionsListSlice';
import {useDispatch, useSelector} from 'react-redux';

export const TagCloud = ({ categories }) => {
    if (!categories?.length) {
        return null;
    }

    const dispatch = useDispatch()
    const selectedTag = useSelector(selectSelectedTag)

    const allTags = categories?.flatMap(category => category.tags);
    const tagsCounted = allTags.reduce((acc, item) => {
        if (acc[item]) {
            return {
                ...acc,
                [item]: acc[item] + 1
            }
        }

        return {
            ...acc,
            [item]: 1
        }
    }, {})
    const sortedTags = Object.keys(tagsCounted).sort((a, b) => tagsCounted[b] - tagsCounted[a]);

    const handleTagPress = (item) => {
        dispatch(filterCollectionsList(selectedTag === item ? null : item))
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
                paddingBottom: 35,
            }}
        >
            {sortedTags?.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    className={`h-8 flex flex-row p-2 ${item === selectedTag ? 'bg-gray-600': 'bg-gray-300'} rounded-md ${index ? 'ml-2' : ''}`}
                    onPress={() => handleTagPress(item)}
                >
                    <Text className={`text-xs ${item === selectedTag ? 'text-white': 'text-black'}`}>{item}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
};
