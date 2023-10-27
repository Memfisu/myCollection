import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  Cog8ToothIcon,
} from 'react-native-heroicons/outline';
import { List } from '../components/List';
import { TagCloud } from '../components/TagCloud';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCollectionsList,
  filterCollectionsList,
  searchCollectionsList,
  selectCollectionsListItems,
  selectFilteredCollectionsListItems,
} from '../slices/collectionsListSlice';
import SanityClient from '../../sanity';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SettingsModal } from '../modals/SettingsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import { colors } from '../utils/colors';
import {
  HOME_SCREEN_ADD_BUTTON_LABEL,
  HOME_SCREEN_LIST_EMPTY_TEXT,
  HOME_SCREEN_SEARCH_PLACEHOLDER,
} from 'src/utils/messages';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categories = useSelector(selectCollectionsListItems);
  const filteredCategories = useSelector(selectFilteredCollectionsListItems);
  const [isLoading, setIsLoading] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [isSettingsOpened, setIsSettingsOpened] = useState(false);
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('theme');

        if (value !== null) {
          setColorScheme(value);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);

        const collectionsData = await SanityClient.fetch(`
                    *[_type == 'collection'] {
                      ...
                    }
                `);

        dispatch(addCollectionsList(collectionsData));
        dispatch(filterCollectionsList(null));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!categories?.length) {
      fetchCategories();
    }
  }, [categories]);

  useEffect(() => {
    if (searchString === '' || searchString?.length >= 3) {
      dispatch(searchCollectionsList({ searchString }));
    }
  }, [searchString]);

  const handleBottomSheetChange = (index) => {
    if (index === -1) {
      setIsSettingsOpened(false);
    }
  };

  return (
    <GestureHandlerRootView
      style={[
        SafeViewAndroid.AndroidSafeArea,
        { backgroundColor: isDarkTheme ? colors.darkMainBG : colors.white },
      ]}
    >
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        {/* todo <StatusBar*/}
        {/*    barStyle={isDarkTheme ? 'light-content' : 'light-content'}*/}
        {/*/>*/}

        {/* search and settings */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
          <View className="flex-row flex-1 space-x-2 bg-gray-100 dark:bg-gray-500 rounded-md p-3">
            <MagnifyingGlassIcon
              size={20}
              color={isDarkTheme ? colors.darkText : 'gray'}
            />
            <TextInput
              placeholder={HOME_SCREEN_SEARCH_PLACEHOLDER}
              placeholderTextColor={isDarkTheme ? colors.darkText : 'gray'}
              keyboardType="default"
              onChangeText={setSearchString}
              className="dark:text-gray-300"
            />
          </View>
          <TouchableOpacity
            className="flex flex-row p-2 justify-center items-center"
            onPress={() => setIsSettingsOpened(!isSettingsOpened)}
          >
            <Cog8ToothIcon
              size={30}
              color={isDarkTheme ? colors.darkText : 'gray'}
            />
          </TouchableOpacity>
        </View>

        {/* tag cloud */}
        <TagCloud categories={categories} />

        {/* collections list */}
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.darkText} />
          </View>
        ) : (
          <List
            listItems={filteredCategories}
            emptyText={HOME_SCREEN_LIST_EMPTY_TEXT}
            containerStyle={{
              flexGrow: 1,
              justifyContent: 'flex-start',
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
            onChange={(id, title) =>
              navigation.navigate('CollectionViewScreen', { id, title })
            }
          />
        )}

        <View className="h-px bg-gray-300 mx-10" />

        {/* Add button */}
        <TouchableOpacity
          className="flex flex-row p-4 justify-center items-center"
          onPress={() =>
            navigation.navigate('FormScreen', { context: 'collectionFields' })
          }
        >
          <PlusIcon size={20} color="black" />
          <Text className="text-center text-black text-lg ml-4">
            {HOME_SCREEN_ADD_BUTTON_LABEL}
          </Text>
        </TouchableOpacity>

        {isSettingsOpened && (
          <SettingsModal onChange={handleBottomSheetChange} />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const SafeViewAndroid = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    flexGrow: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 5,
  },
  GestureHandlerRootView: {
    flex: 1,
  },
});
