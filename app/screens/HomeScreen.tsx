// app/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { HomeScreenProps } from '../navigation/types';
import styles from '../cssStyles/styles';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TimeStamp Finance</Text>
      <Image
        source={{ uri: '../assets/logo.webp' }} // Replace with your image URL
        style={styles.image}
      />
      <Text style={styles.description}>
        TimeStamp Finance keeps you updated with the latest finance news, stock trends, and market insights, ensuring you stay informed.
      </Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default HomeScreen;
