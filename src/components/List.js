import React from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Text } from 'react-native';
import { ListItem } from '../components/ListItem';
import PropTypes from 'prop-types';

const EmptyComponent = (emptyText) => {
  return <Text className="text-gray-600 text-base m-auto">{emptyText}</Text>;
};

export const List = ({
  listItems,
  emptyText,
  onChange,
  containerStyle,
  onDragEnd,
}) => {
  return (
    <DraggableFlatList
      data={listItems}
      renderItem={({ item, index, drag, isActive }) => {
        return (
          <ListItem
            key={item?._id}
            id={item?._id}
            onChange={onChange}
            imgUrl={item?.collectionIcon || item?.itemIcon}
            title={item?.title}
            description={item?.description}
            tags={item?.myTags}
            items={item?.items}
            index={index}
            drag={drag}
            isActive={isActive}
          />
        );
      }}
      keyExtractor={(item) => item?._id}
      containerStyle={containerStyle}
      ListEmptyComponent={() => EmptyComponent(emptyText)}
      onDragEnd={(data) => onDragEnd(data)}
    />
  );
};

List.propTypes = {
  listItems: PropTypes.array,
  emptyText: PropTypes.string,
  onChange: PropTypes.func,
  onDragEnd: PropTypes.func,
  containerStyle: PropTypes.object,
};
