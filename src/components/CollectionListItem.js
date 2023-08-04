import React from 'react'
import {TouchableOpacity, Text, Image, View} from 'react-native';

// если слишком много тегов или они слишком длинные
// по клику переход к просмотру коллекции

export const CollectionListItem = ({ imgUrl, title, description, tags, index }) => {
    return (
        <TouchableOpacity className={`flex flex-row mb-2 p-6 rounded-md items-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
            <Image
                source={{ uri: imgUrl }}
                className='h-20 w-20 rounded'
            />
            <View className='ml-4 flex'>
                <Text className='text-black font-bold text-base p-1'>{title}</Text>
                <Text className='text-black p-1 mb-2'>{description}</Text>
                {
                    tags?.length ?
                        <View className='flex flex-row'>
                            {
                                tags.map((item, index) => (
                                    <Text
                                        key={index}
                                        className={`p-2 bg-gray-300 rounded-md text-xs ${index ? 'ml-2' : ''}`}
                                    >
                                        {item}
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