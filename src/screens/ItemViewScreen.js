import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Platform,
    StatusBar,
    View,
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {PencilIcon, TrashIcon, ArrowUturnLeftIcon} from 'react-native-heroicons/outline';
import SanityClient, {urlFor} from '../../sanity';
import {addItemData, addItemsList, selectItemData} from '../slices/itemsListSlice';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from '../components/Link';
import {ModalWindow} from '../components/Modal';
import {addCollectionsList} from '../slices/collectionsListSlice';

export const ItemViewScreen = () => {
    const { params: { itemId, itemTitle, collectionId, collectionTitle, itemIndex } } = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const item = useSelector(selectItemData)
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true)

                const itemData = await SanityClient.fetch(`
                    *[_type == 'item' && _id == $id] {
                       itemIcon,
                       title,
                       link,
                       description
                    }
                `,  { id: itemId });

                dispatch(addItemData(itemData?.[0]))
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false)
            }
        }

        if (itemId) {
            fetchItems()
        }
    }, [itemId]);

    const handleRemoveItem = async (id) => {
        setModalVisible(false);
        setIsLoading(true);
        try {
            await SanityClient.patch(collectionId).unset([`items[${itemIndex}]`]).commit();
            await SanityClient.delete(id);
        } catch (error) {
            console.error('Ошибка при удалении:', error)
        }
        finally {
            setIsLoading(false);
            dispatch(addItemsList([]))
            dispatch(addCollectionsList([]))
            navigation.navigate('CollectionViewScreen', { id: collectionId, title: collectionTitle });
        }
    }

    const handleGoBack = () => {
        navigation.navigate('CollectionViewScreen', { id: collectionId, title: collectionTitle });
    }

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <ModalWindow
                isModalVisible={modalVisible}
                setModalVisible={setModalVisible}
                modalText={`Do you really want to remove item ${itemTitle}?`}
                onApply={() => handleRemoveItem(itemId)}
            />

            {/* go back button, header, edit / remove icons */}
            <View className='flex-row py-4 px-10 justify-between'>
                <TouchableOpacity onPress={handleGoBack}>
                    <ArrowUturnLeftIcon size={25} color='gray' />
                </TouchableOpacity>
               <Text className='text-black text-xl'>{itemTitle}</Text>
               <View className='flex-row w-20 justify-between'>
                   <TouchableOpacity onPress={() => console.log('edit')}>
                       <PencilIcon size={25} color='gray' />
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => setModalVisible(true)}>
                       <TrashIcon size={25} color='gray' />
                   </TouchableOpacity>
               </View>
           </View>

            <View className='h-px bg-gray-300 mx-10' />

            {
                isLoading ?
                    <View className='flex-1 justify-center items-center'>
                        <ActivityIndicator size="large" color="#D1D5DB" />
                    </View>
                    : (
                        <View classname='flex-1'>
                            {
                                item?.itemIcon?.asset?._ref && (
                                    <Image
                                        source={{ uri: urlFor(item.itemIcon.asset._ref).url() }}
                                        className='h-60 w-60 rounded self-center mt-10'
                                    />
                                )
                            }
                            <Text className='text-black font-bold text-2xl px-10 self-center m-4'>{item?.title}</Text>
                            {item?.link && <Link title="Click here to navigate to the item's website" url={item?.link} additionalClass='px-10 mb-4' />}
                            {item?.description &&
                                <ScrollView className='h-2/5'>
                                    <Text className='text-black text-base mx-10 p-4 rounded-md bg-gray-100'>
                                        {item.description}
                                    </Text>
                                </ScrollView>
                            }
                        </View>
                    )
            }
        </SafeAreaView>
    );
};

const SafeViewAndroid = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        flexGrow: 1,
        width: '100%',
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight+15 : 5,
    }
});