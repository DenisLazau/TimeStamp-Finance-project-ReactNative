// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import Toast from 'react-native-toast-message';
import { RootStackParam } from './app/navigation/types';
import StocksScreen from './app/screens/StocksScreen';
import NewsScreen from './app/screens/NewsScreen';
import SettingsScreen from './app/screens/SettingScreen';

const Stack = createNativeStackNavigator<RootStackParam>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Stocks" component={StocksScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
