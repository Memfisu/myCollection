import React from 'react'
import {TouchableOpacity, Text, Image, View} from 'react-native';
import {urlFor} from '../../sanity'

export const ListItem = ({ id, onChange, imgUrl, title, description, tags, index }) => {
    const handleItemPress = (id) => {
        onChange(id, title)
    }

    return (
        <TouchableOpacity
            className={`flex flex-row mb-2 p-6 rounded-md items-center max-w-full ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            onPress={() => handleItemPress(id)}
        >
            <Image
                source={{ uri: urlFor(imgUrl).url() }}
                className='h-20 w-20 rounded'
            />
            <View className='ml-4 flex-1 w-full'>
                <Text className='text-black font-bold text-base p-1'>{title}</Text>
                <Text className='text-black p-1 mb-2'>{description}</Text>
                {
                    tags?.length ?
                        <View className='flex flex-row flex-wrap w-full'>
                            {
                                tags.map((item) => (
                                    <Text
                                        key={item._key}
                                        className={`p-2 mb-2 bg-gray-300 rounded-md text-xs mr-2`}
                                    >
                                        {item.label}
                                    </Text>
                                ))
                            }
                        </View>
                        : null
                }
            </View>
        </TouchableOpacity>
    )
}