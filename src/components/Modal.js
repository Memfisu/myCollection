import {Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';

export const ModalWindow = ({
    isModalVisible,
    setModalVisible,
    modalText,
    onApply,
    onCancel
}) => {
    const handleCancel = () => {
        onCancel && onCancel();
        setModalVisible(false)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View className="flex justify-center items-center min-h-screen px-4">
                    <TouchableWithoutFeedback>
                        <View className="bg-white w-4/5 p-4 border border-gray-100 rounded-md shadow-md justify-between items-center">
                            <Text className="text-black text-base mb-4">{modalText}</Text>
                            <View className="flex flex-row w-1/2 justify-between">
                                <TouchableOpacity
                                    onPress={onApply}
                                    className="text-black text-base font-bold"
                                >
                                    <Text className='text-black text-base font-bold'>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleCancel}
                                    className="text-black text-base font-bold"
                                >
                                    <Text className='text-black text-base font-bold'>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}