import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import 'react-native-url-polyfill/auto';
import { store } from './store'
import { Provider } from 'react-redux'
import {CollectionViewScreen} from './src/screens/CollectionViewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CollectionViewScreen" component={CollectionViewScreen} />
          </Stack.Navigator>
        </Provider>
    </NavigationContainer>
  );
}

// rnsc
