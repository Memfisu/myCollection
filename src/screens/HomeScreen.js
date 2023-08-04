import React, {useLayoutEffect} from 'react';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Platform,
    StatusBar,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {MagnifyingGlassIcon, PlusIcon} from 'react-native-heroicons/outline';
import {CollectionsList} from '../components/CollectionsList';
import {TagCloud} from '../components/TagCloud';
import {useDispatch, useSelector} from 'react-redux';
import {
    addCollectionsList, filterCollectionsList,
    selectCollectionsListItems,
    selectFilteredCollectionsListItems
} from '../slices/collectionsListSlice';

const mockCategories = [
    {
        id: 1,
        title: 'Dolls',
        image: 'https://www.youloveit.com/uploads/posts/2022-02/1645621435_youloveit_com_naturalistas_dolls.jpg',
        description: 'My dolls',
        tags: ['dolls', 'things']
    },
    {
        id: 2,
        title: 'Books',
        image: 'https://cdn.pixabay.com/photo/2016/02/16/21/07/books-1204029_640.jpg',
        description: 'My books',
        tags: ['books', 'things']
    },
    {
        id: 3,
        title: 'Games',
        image: 'https://www.pcworld.com/wp-content/uploads/2023/04/playstation-studios.jpg',
        description: 'My games',
        tags: ['games', 'digital']
    },
    {
        id: 4,
        title: 'Board games',
        image: 'https://mykindofmeeple.com/wp-content/uploads/2019/01/board-game-boards-1602-27042020.jpg',
        description: 'My board games',
        tags: ['games', 'things', 'more', 'stupid', 'tags', 'yay!']
    },
    {
        id: 5,
        title: 'Funko figures',
        image: 'https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-FunkoUS-Library/default/dwe41b4c63/images/funko/blog/20190625_TheGodfather-FunkoPop.jpg',
        description: 'My Funko figures',
        tags: ['things']
    }
]

export const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const categories = useSelector(selectCollectionsListItems)
    const filteredCategories = useSelector(selectFilteredCollectionsListItems)

    useLayoutEffect(() => {
        dispatch(addCollectionsList(mockCategories))
        dispatch(filterCollectionsList(null))

        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            {/* Search */}
            <View className='flex-row items-center space-x-2 pb-2 mx-4'>
                <View className='flex-row flex-1 space-x-2 bg-gray-100 rounded-md p-3'>
                    <MagnifyingGlassIcon size={20} color='gray' />
                    <TextInput
                        placeholder='Search collection'
                        keyboardType='default'
                    />
                </View>
            </View>

            {/* Tag cloud */}
            <TagCloud categories={categories} />

            {/* Body */}
            <CollectionsList categories={filteredCategories} />

            {/* Add button */}
            <TouchableOpacity
                className='flex flex-row p-4 justify-center items-center'
                onPress={() => console.log('add')}
            >
                <PlusIcon size={20} color='black' />
                <Text className='text-center text-black text-lg ml-4'>Add collection</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const SafeViewAndroid = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight+15 : 5,
    }
});
