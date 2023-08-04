import React from 'react'
import {ScrollView} from 'react-native';
import {CollectionListItem} from '../components/CollectionListItem';

// драг н дроп

export const CollectionsList = ({ categories }) => {
    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 20,
            }}
        >
            {categories?.map((item, index) => (
                <CollectionListItem
                    key={item.id}
                    imgUrl={item.image}
                    title={item.title}
                    description={item.description}
                    tags={item.tags}
                    index={index}
                />
            ))}
        </ScrollView>
    );
}