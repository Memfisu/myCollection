import React from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {
    filterCollectionsList,
    selectSelectedTag
} from '../slices/collectionsListSlice';
import {useDispatch, useSelector} from 'react-redux';

// если нет тегов совсем

export const TagCloud = ({ categories }) => {
    if (!categories?.length) {
        return null;
    }

    const dispatch = useDispatch()
    const selectedTag = useSelector(selectSelectedTag)

    const allTags = categories?.flatMap(category => category.myTags);
    const tagsCounted = allTags.reduce((acc, item) => {
        if (acc[item.value]) {
            return {
                ...acc,
                [item.value]: {
                    label: item.label,
                    value: item.value,
                    count: acc[item.value] + 1
                }
            }
        }

        return {
            ...acc,
            [item.value]: {
                label: item.label,
                value: item.value,
                count: 1
            }
        }
    }, {})
    const sortedTags = Object.values(tagsCounted).sort((a, b) => tagsCounted[b.count] - tagsCounted[a.count]);

    const handleTagPress = (value) => {
        dispatch(filterCollectionsList(selectedTag === value ? null : value))
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
                flexGrow: 0
            }}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
                paddingBottom: 35,
            }}
        >
            {sortedTags?.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    className={`h-8 flex flex-row p-2 ${item.value === selectedTag ? 'bg-gray-600': 'bg-gray-300'} rounded-md ${index ? 'ml-2' : ''}`}
                    onPress={() => handleTagPress(item.value)}
                >
                    <Text className={`text-xs ${item.value === selectedTag ? 'text-white': 'text-black'}`}>{item.label}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
};
