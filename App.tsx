// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import StocksScreen from './app/screens/StocksScreen';
import NewsScreen from './app/screens/NewsScreen';
import SettingsScreen from './app/screens/SettingScreen';
import { RootStackParam } from './app/navigation/types';
import HeaderRightButtons from './app/components/HeaderRightButtons';
import Toast from 'react-native-toast-message';
import { GlobalVariables } from './app/utils/GlobalVariables';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParam>();

const App = () => {
  useEffect(() => {
    GlobalVariables.loadGlobalVariables();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            headerTitle: 'Home', 
            headerRight: () => <HeaderRightButtons /> 
          }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerTitle: 'Login' }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerTitle: 'Register' }}
        />
        <Stack.Screen 
          name="Stocks" 
          component={StocksScreen} 
          options={{ 
            headerTitle: 'Stocks',
            headerRight: () => <HeaderRightButtons />
          }}
        />
        <Stack.Screen 
          name="News" 
          component={NewsScreen} 
          options={{ 
            headerTitle: 'News',
            headerRight: () => <HeaderRightButtons />
          }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ 
            headerTitle: 'Settings',
            headerRight: () => <HeaderRightButtons />
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
