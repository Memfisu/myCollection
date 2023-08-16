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
                        key={item._id}
                        id={item._id}
                        onChange={onChange}
                        imgUrl={item.collectionIcon || item.itemIcon}
                        title={item.title}
                        description={item.description}
                        tags={item.myTags}
                        index={index}
                    />
                )
            }}
            keyExtractor={item => item._id}
            contentContainerStyle={containerStyle}
            ListEmptyComponent={() => EmptyComponent(emptyText)}
        />
    )
}