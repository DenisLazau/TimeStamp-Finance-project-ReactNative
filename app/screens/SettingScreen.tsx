// app/screens/SettingsScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { GlobalVariables } from '../utils/GlobalVariables';
import styles from '../cssStyles/styles';

const SettingsScreen: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>(GlobalVariables.selectedTopics);
  const [stock, setStock] = useState<string>('');

  const handleAddStock = () => {
    if (stock.trim().length > 0) {
      const newSymbols = [...GlobalVariables.symbols, stock.trim()];
      GlobalVariables.setSymbols(newSymbols);
      Toast.show({
        type: 'success',
        text1: 'Stock Added',
        text2: `Stock added: ${stock.trim()}`,
      });
      setStock('');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Input Error',
        text2: 'Please enter a stock symbol',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedTopic}
        onValueChange={(itemValue) => {
          setSelectedTopic(itemValue);
          GlobalVariables.setSelectedTopics(itemValue);
        }}
        style={localStyles.picker}
      >
        <Picker.Item label="Technology" value="technology" />
        <Picker.Item label="Earnings" value="earnings" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Enter stock symbol"
        value={stock}
        onChangeText={setStock}
      />
      <Button title="Add Stock" onPress={handleAddStock} />
    </View>
  );
};

const localStyles = StyleSheet.create({
  picker: {
    width: '100%',
    marginBottom: 20,
  },
});

export default SettingsScreen;
