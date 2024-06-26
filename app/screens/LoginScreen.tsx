// app/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { LoginScreenProps } from '../navigation/types';
import { login } from '../services/firebase-utils';
import Toast from 'react-native-toast-message';
import styles from '../cssStyles/styles';
import { GlobalVariables } from '../utils/GlobalVariables';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      const emailPrefix = email.split('@')[0]; // Extract the part before the @
      GlobalVariables.setEmail(emailPrefix);  // Update the global variable
      navigation.navigate('Home');
      Toast.show({
        type: 'success',
        text1: 'Logged in successfully',
      });
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Login error: ', errorMessage);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;
