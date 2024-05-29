// app/navigation/types.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParam = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  News: undefined;
  Stocks: undefined;
  Settings: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParam, 'Home'>;
export type LoginScreenProps = NativeStackScreenProps<RootStackParam, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParam, 'Register'>;
export type NewsScreenProps = NativeStackScreenProps<RootStackParam, 'News'>;
export type StocksScreenProps = NativeStackScreenProps<RootStackParam, 'Stocks'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParam, 'Settings'>;
