import {InputTemplate} from '../fields/InputTemplate';
import {Text} from 'react-native';

export const fieldTypeConfig = {
    string: <InputTemplate />,
    text: <InputTemplate />,
    image: <Text>image</Text>,
    tags: <Text>tags</Text>,
};