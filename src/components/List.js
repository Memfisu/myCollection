import React from 'react';
import { FlatList, Text } from 'react-native';
import { ListItem } from '../components/ListItem';
import PropTypes from 'prop-types';

const EmptyComponent = (emptyText) => {
  return <Text className="text-gray-600 text-base m-auto">{emptyText}</Text>;
};

export const List = ({ listItems, emptyText, onChange, containerStyle }) => {
  return (
    <FlatList
      data={listItems}
      renderItem={({ item, index }) => {
        return (
          <ListItem
            key={item._id}
            id={item._id}
            onChange={onChange}
            imgUrl={item.collectionIcon || item.itemIcon}
            title={item.title}
            description={item.description}
            tags={item.myTags}
            items={item.items}
            index={index}
          />
        );
      }}
      keyExtractor={(item) => item._id}
      contentContainerStyle={containerStyle}
      ListEmptyComponent={() => EmptyComponent(emptyText)}
    />
  );
};

List.propTypes = {
  listItems: PropTypes.array,
  emptyText: PropTypes.string,
  onChange: PropTypes.func,
  containerStyle: PropTypes.string,
};
