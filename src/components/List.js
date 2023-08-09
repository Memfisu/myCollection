import React from 'react'
import {FlatList, Text} from 'react-native';
import {ListItem} from '../components/ListItem';

// драг н дроп

const EmptyComponent = (emptyText) => {
    return (
        <Text className='text-gray-600 text-base m-auto'>
            {emptyText}
        </Text>
    )
}

export const List = ({ listItems, emptyText, onChange, containerStyle }) => {
    return (
        <FlatList
            data={listItems}
            renderItem={({item, index}) => {
                return (
                    <ListItem
                        key={item.id}
                        id={item.id}
                        onChange={onChange}
                        imgUrl={item.image}
                        title={item.title}
                        description={item.description}
                        tags={item.tags}
                        index={index}
                    />
                )
            }}
            keyExtractor={item => item.id}
            contentContainerStyle={containerStyle}
            ListEmptyComponent={() => EmptyComponent(emptyText)}
        />
    )
}