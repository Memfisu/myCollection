import React, {useLayoutEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Platform,
    StatusBar,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {PencilIcon, TrashIcon, ArrowUturnLeftIcon, PlusIcon} from 'react-native-heroicons/outline';
import {List} from '../components/List';
import {addItemsList, selectItemsListItems} from '../slices/itemsListSlice';
import {useDispatch, useSelector} from 'react-redux';

const mockItems = [
    {
        id: 1,
        title: 'Item 1',
        image: 'https://cdnk.dolls.moe/7454-large_default/momoko-doll-girl-pop-black-panther.jpg',
        description: 'Super item',
    },
    {
        id: 2,
        title: 'Item 2',
        image: 'https://cdnk.dolls.moe/8384-large_default/petworks-momoko-doll-muneca-23eto-usagui-white.jpg',
        description: 'Nice!',
    },
    {
        id: 3,
        title: 'Item 3',
        image: 'https://cdnk.dolls.moe/8183-large_default/petworks-one-sixth-men-s-picture-book-sixties-eight-1922071-doll.jpg',
        description: 'Awesome!',
    },
    {
        id: 4,
        title: 'Item 4',
        image: 'https://cdnk.dolls.moe/7454-large_default/momoko-doll-girl-pop-black-panther.jpg',
        description: 'Super item',
    },
    {
        id: 5,
        title: 'Item 5',
        image: 'https://cdnk.dolls.moe/8384-large_default/petworks-momoko-doll-muneca-23eto-usagui-white.jpg',
        description: 'Nice!',
    },
    {
        id: 6,
        title: 'Item 6',
        image: 'https://cdnk.dolls.moe/8183-large_default/petworks-one-sixth-men-s-picture-book-sixties-eight-1922071-doll.jpg',
        description: 'Awesome!',
    },
]

export const CollectionViewScreen = () => {
    const { params: { id, title} } = useRoute();
    const dispatch = useDispatch()
    const listItems = useSelector(selectItemsListItems)
    const navigation = useNavigation();

    useLayoutEffect(() => {
        dispatch(addItemsList(mockItems))
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            {/* go back button, header, edit / remove icons */}
            <View className='flex-row py-4 px-10 justify-between'>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <ArrowUturnLeftIcon size={25} color='gray' />
                </TouchableOpacity>
               <Text className='text-black text-xl'>{title}</Text>
               <View className='flex-row w-20 justify-between'>
                   <TouchableOpacity onPress={() => console.log('edit')}>
                       <PencilIcon size={25} color='gray' />
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => console.log('remove')}>
                       <TrashIcon size={25} color='gray' />
                   </TouchableOpacity>
               </View>
           </View>

            <View className='h-px bg-gray-300 mx-10' />

            {/* Items list */}
            <List
                listItems={listItems}
                emptyText='There are no items yet. Add a new one!'
                onChange={(id, title) => navigation.navigate('ItemViewScreen', { id, title })}
                containerStyle={{
                    flexGrow: 1,
                    justifyContent: 'flex-start',
                    paddingHorizontal: 40,
                    marginTop: 20,
                }}
            />

            <View className='h-px bg-gray-300 mx-10' />

            {/* Add button */}
            <TouchableOpacity
                className='flex flex-row p-4 justify-center items-center'
                onPress={() => console.log('add')}
            >
                <PlusIcon size={20} color='black' />
                <Text className='text-center text-black text-lg ml-4'>Add item</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const SafeViewAndroid = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight+15 : 5,
    }
});
