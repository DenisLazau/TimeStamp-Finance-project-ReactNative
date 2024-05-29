// app/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import NewsScreen from '../screens/NewsScreen';
import StocksScreen from '../screens/StocksScreen';
import SettingsScreen from '../screens/SettingScreen';
import { RootStackParam } from './types';

const Stack = createNativeStackNavigator<RootStackParam>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="News" component={NewsScreen} options={{ title: 'News' }} />
        <Stack.Screen name="Stocks" component={StocksScreen} options={{ title: 'Stocks' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
