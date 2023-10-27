import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { prepareDatePickerDate } from '../utils/prepareDate';
import { DATE_PICKER_HINT, DATE_PICKER_SELECT_DATE } from '../utils/messages';
import PropTypes from 'prop-types';

export const DatePickerTemplate = ({ field, onChange }) => {
  const { _id: id, value, label, schemeName } = field;
  const isIos = Platform.OS === 'ios';

  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(isIos);

  const handleChange = (event, currentValue) => {
    if (!isIos) {
      setShow(false);
    }

    setDate(currentValue);
    onChange({
      fieldName: schemeName,
      fieldValue: prepareDatePickerDate(currentValue),
    });
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View key={`${id}_${value}`} className="mb-6">
      {label && (
        <Text className="text-black font-bold text-base mb-3">{label}</Text>
      )}
      <View className="flex-row items-center">
        {isIos ? (
          <Text className="text-black text-base">{DATE_PICKER_HINT}</Text>
        ) : (
          <View className="flex flex-row items-center">
            <TouchableOpacity
              className="bg-gray-500 rounded-lg p-3 flex items-center justify-center mr-4"
              onPress={showDatepicker}
            >
              <Text className="text-white text-base">
                {DATE_PICKER_SELECT_DATE}
              </Text>
            </TouchableOpacity>
            <Text className="text-black text-base">
              {prepareDatePickerDate(date)}
            </Text>
          </View>
        )}
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            onChange={handleChange}
          />
        )}
      </View>
    </View>
  );
};

DatePickerTemplate.propTypes = {
  field: PropTypes.object,
  onChange: PropTypes.func,
};
