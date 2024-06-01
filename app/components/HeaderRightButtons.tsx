// app/components/HeaderRightButtons.tsx
import React from 'react';
import { View, Button, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '../navigation/types';
import styles from '../cssStyles/styles';
import { GlobalVariables } from '../utils/GlobalVariables';

type NavigationProp = NativeStackNavigationProp<RootStackParam>;

const HeaderRightButtons: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.headerRight}>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="News" onPress={() => navigation.navigate('News')} />
      <Button title="Stocks" onPress={() => navigation.navigate('Stocks')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      <View style={styles.userContainer}>
        <Image
          source={{ uri: '../assets/user-icon.jpg' }} // Replace with your icon URL
          style={styles.userIcon}
        />
        <Text style={styles.userEmail}>{GlobalVariables.email}</Text>
      </View>
    </View>
  );
};

export default HeaderRightButtons;
