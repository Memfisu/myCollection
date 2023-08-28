import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Platform,
    StatusBar,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator, TextInput
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {PencilIcon, TrashIcon, ArrowUturnLeftIcon, PlusIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {List} from '../components/List';
import {addItemsList, searchItemsList, selectItemsListItems} from '../slices/itemsListSlice';
import {useDispatch, useSelector} from 'react-redux';
import SanityClient from '../../sanity';

export const CollectionViewScreen = () => {
    const { params: { id, title} } = useRoute();
    const dispatch = useDispatch()
    const listItems = useSelector(selectItemsListItems)
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [searchString, setSearchString] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true)

                const itemsData = await SanityClient.fetch(`
                    *[_type == 'collection' && _id == $id] {
                       ...,
                       items[]->{
                           ...,
                       }
                    }[0].items
                `,  { id });

                dispatch(addItemsList(itemsData))
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false)
            }
        }

        if (id) {
            fetchItems()
        }
    }, [id]);

    useEffect(() => {
        return () => {
            dispatch(addItemsList([]))
        };
    }, []);

    useEffect(() => {
        if (searchString === '' || searchString?.length >= 3) {
            dispatch(searchItemsList({ searchString }));
        }
    }, [searchString]);

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

           <View className='flex-row space-x-2 mx-10 bg-gray-100 rounded-md p-3 mt-4 mb-2'>
                <MagnifyingGlassIcon size={20} color='gray' />
                <TextInput
                    placeholder='Search item'
                    keyboardType='default'
                    onChangeText={setSearchString}
                />
           </View>

            {/* Items list */}
            {
                isLoading ?
                    <View className='flex-1 justify-center items-center'>
                        <ActivityIndicator size="large" color="#D1D5DB" />
                    </View>
                    : (
                        <List
                            listItems={listItems}
                            emptyText='There are no items yet. Add a new one!'
                            onChange={(id, title) => navigation.navigate('ItemViewScreen', { id, title })}
                            containerStyle={{
                                flexGrow: 1,
                                justifyContent: 'flex-start',
                                paddingHorizontal: 40,
                                marginTop: 20,
                                maxWidth: '100%'
                            }}
                        />
                    )
            }

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
        width: '100%',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight+15 : 5,
    }
});
