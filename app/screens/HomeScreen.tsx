// app/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { HomeScreenProps } from '../navigation/types';
import styles from '../cssStyles/styles';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="News" onPress={() => navigation.navigate('News')} />
        <Button title="Stocks" onPress={() => navigation.navigate('Stocks')} />
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
      <Text style={styles.title}>Welcome to Finance News App</Text>
      <Image
        source={{ uri: 'https://example.com/path/to/your/image.png' }} // Replace with your image URL
        style={styles.image}
      />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default HomeScreen;
