import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define the navigation parameters for HomeScreen
export type RootStackParam = {
  Details: { id: string };
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

// Use the NativeStackScreenProps with defined navigation parameters for each screen
export type HomeScreenProps = NativeStackScreenProps<RootStackParam, 'Home'>;
export type DetailsScreenProps = NativeStackScreenProps<RootStackParam, 'Details'>;
export type LoginScreenProps = NativeStackScreenProps<RootStackParam, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParam, 'Register'>;
