import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Platform,
    StatusBar,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {MagnifyingGlassIcon, PlusIcon, Cog8ToothIcon} from 'react-native-heroicons/outline';
import {List} from '../components/List';
import {TagCloud} from '../components/TagCloud';
import {useDispatch, useSelector} from 'react-redux';
import {
    addCollectionsList, filterCollectionsList,
    selectCollectionsListItems,
    selectFilteredCollectionsListItems
} from '../slices/collectionsListSlice';
import SanityClient from '../../sanity';

export const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const categories = useSelector(selectCollectionsListItems)
    const filteredCategories = useSelector(selectFilteredCollectionsListItems)
    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true)

                const collectionsData = await SanityClient.fetch(`
                *[_type == 'collection'] {
                  ...
                }
            `);

                dispatch(addCollectionsList(collectionsData))
                dispatch(filterCollectionsList(null))
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchCategories()
    }, []);

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
                <TouchableOpacity
                    className='flex flex-row p-2 justify-center items-center'
                    onPress={() => console.log('settings')}
                >
                    <Cog8ToothIcon size={30} color='gray' />
                </TouchableOpacity>
            </View>

            {/* Tag cloud */}
            <TagCloud categories={categories} />

            {/* Collections list */}
            {
                isLoading ?
                    <View className='flex-1 justify-center items-center'>
                        <ActivityIndicator size="large" color="#D1D5DB" />
                    </View>
                    : (
                        <List
                            listItems={filteredCategories}
                            emptyText='There are no collections yet. Add a new one!'
                            containerStyle={{ flexGrow: 1, justifyContent: 'flex-start', paddingHorizontal: 10, paddingVertical: 4 }}
                            onChange={(id, title) => navigation.navigate('CollectionViewScreen', { id, title })}
                        />
                    )
            }

            <View className='h-px bg-gray-300 mx-10' />

            {/* Add button */}
            <TouchableOpacity
                className='flex flex-row p-4 justify-center items-center'
                onPress={() => navigation.navigate('FormScreen')}
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
        flexGrow: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight+15 : 5,
    }
});
