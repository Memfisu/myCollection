import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CheckIcon, ArrowUturnLeftIcon } from 'react-native-heroicons/outline';
import SanityClient from '../../sanity';
import {
  addFieldsList,
  addFieldsValues,
  clearFieldsValues,
  selectFieldsList,
  selectValuesList,
} from '../slices/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fieldTypeConfig } from '../utils/fieldsConfig';
import { addCollectionsList } from '../slices/collectionsListSlice';
import { addItemsList } from '../slices/itemsListSlice';
import {
  ADD_FORM_HEADER,
  EDIT_FORM_HEADER,
  FORM_SAVE_BUTTON_LABEL,
  FORM_TITLE_VALIDATION_ERROR,
} from '../utils/messages';
import { CONTEXT, MODE } from '../utils/constants';

// todo refactor all of this

export const FormScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    params: { context, collectionId, collectionTitle, mode, itemId, itemTitle },
  } = useRoute();
  const fields = useSelector(selectFieldsList);
  const values = useSelector(selectValuesList);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const fetchFieldsList = async () => {
      try {
        setIsLoading(true);

        const fieldsList = await SanityClient.fetch(`
                *[_type == '${context}'] {
                  ...
                }
            `);

        if (mode === MODE.edit && context === CONTEXT.collectionFields) {
          const itemsData = await SanityClient.fetch(
            `
                  *[_type == 'collection' && _id == $id] {
                     ...,
                     myTags[]{
                           ...,
                       }
                  }
              `,
            { id: collectionId }
          );

          Object.entries(itemsData?.[0])?.forEach(([key, value]) => {
            dispatch(addFieldsValues({ fieldName: key, fieldValue: value }));
          });
        }

        if (mode === MODE.edit && context === CONTEXT.itemFields) {
          const itemsData = await SanityClient.fetch(
            `
                    *[_type == 'item' && _id == $id] {
                       itemIcon,
                       title,
                       link,
                       acquiredDate,
                       releaseDate,
                       description
                    }
                `,
            { id: itemId }
          );

          Object.entries(itemsData?.[0])?.forEach(([key, value]) => {
            dispatch(addFieldsValues({ fieldName: key, fieldValue: value }));
          });
        }

        dispatch(addFieldsList(fieldsList));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFieldsList();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearFieldsValues());
    };
  }, []);

  const handleGoBack = () => {
    if (context === CONTEXT.itemFields) {
      navigation.navigate('CollectionViewScreen', {
        id: collectionId,
        title: collectionTitle,
      });
    } else {
      navigation.navigate('Home');
    }
  };

  const handleFieldChange = ({ fieldName, fieldValue }) => {
    dispatch(addFieldsValues({ fieldName, fieldValue }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!values?.title) {
        setIsError(true);

        return;
      }

      setIsError(false);

      const doc = {
        _type: context === CONTEXT.itemFields ? 'item' : 'collection',
        ...values,
        image: null, // todo temporary hack
        collectionIcon: null, // todo temporary hack,
      };

      if (mode === MODE.create) {
        const item = await SanityClient.create(doc);

        if (context === CONTEXT.itemFields) {
          await SanityClient.patch(collectionId)
            .setIfMissing({ items: [] })
            .append('items', [{ _type: 'reference', _ref: item._id }])
            .commit();

          dispatch(addItemsList([]));
        }

        dispatch(addCollectionsList([]));

        handleGoBack();
      } else {
        if (context === CONTEXT.itemFields) {
          await SanityClient.patch(itemId).set(doc).commit();

          dispatch(addItemsList([]));
        } else {
          await SanityClient.patch(collectionId).set(doc).commit();
        }

        dispatch(addCollectionsList([]));

        handleGoBack();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      {/* go back button, header */}
      <View className="flex-row py-4 px-10">
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowUturnLeftIcon size={25} color="gray" />
        </TouchableOpacity>
        <Text className="text-black text-xl ml-14">
          {mode === MODE.edit
            ? EDIT_FORM_HEADER(collectionTitle || itemTitle)
            : ADD_FORM_HEADER(context === CONTEXT.itemFields ? 'item' : '')}
        </Text>
      </View>

      <View className="h-px bg-gray-300 mx-10" />

      {/* form fields */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#D1D5DB" />
        </View>
      ) : (
        <ScrollView className="flex-1 px-10 py-5 mb-6">
          {isError && (
            <Text className="text-base text-red-700 bg-red-50 p-3 rounded mb-6">
              {FORM_TITLE_VALIDATION_ERROR}
            </Text>
          )}
          {fields?.map((item) => {
            return React.cloneElement(fieldTypeConfig[item?.type], {
              key: item?._id,
              field: item,
              defaultValue: values?.[item.schemeName],
              onChange: handleFieldChange,
            });
          })}
        </ScrollView>
      )}

      <View className="h-px bg-gray-300 mx-10" />

      {/* Save button */}
      <TouchableOpacity
        className="flex flex-row p-4 justify-center items-center"
        onPress={handleSubmit}
      >
        <CheckIcon size={20} color="black" />
        <Text className="text-center text-black text-lg ml-4">
          {FORM_SAVE_BUTTON_LABEL}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const SafeViewAndroid = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 5,
  },
});
