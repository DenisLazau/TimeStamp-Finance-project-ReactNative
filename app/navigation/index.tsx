// app/navigation/AppNavigator.tsx
import React from 'react';
import { View, Button } from 'react-native';
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

const HeaderRightButtons = ({ navigation }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 200 }}>
    <Button title="Home" onPress={() => navigation.navigate('Home')} />
    <Button title="News" onPress={() => navigation.navigate('News')} />
    <Button title="Stocks" onPress={() => navigation.navigate('Stocks')} />
    <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
  </View>
);

const screenOptions = ({ navigation }) => ({
  headerRight: () => <HeaderRightButtons navigation={navigation} />,
});

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({ title: 'Home', ...screenOptions({ navigation }) })} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="News" component={NewsScreen} options={({ navigation }) => ({ title: 'News', ...screenOptions({ navigation }) })} />
        <Stack.Screen name="Stocks" component={StocksScreen} options={({ navigation }) => ({ title: 'Stocks', ...screenOptions({ navigation }) })} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={({ navigation }) => ({ title: 'Settings', ...screenOptions({ navigation }) })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
