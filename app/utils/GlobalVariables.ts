// app/utils/GlobalVariables.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export class GlobalVariables {
  static email: string = 'guest';
  static symbols: string[] = ['AAPL', 'GOOGL', 'MSFT'];
  static selectedTopics: string = 'technology';

  static async loadGlobalVariables() {
    try {
      const email = await AsyncStorage.getItem('email');
      const symbols = await AsyncStorage.getItem('symbols');
      const selectedTopics = await AsyncStorage.getItem('selectedTopics');
      
      if (email !== null) this.email = email;
      if (symbols !== null) this.symbols = JSON.parse(symbols);
      if (selectedTopics !== null) this.selectedTopics = selectedTopics;
    } catch (error) {
      console.error('Error loading global variables:', error);
    }
  }

  static async saveGlobalVariables() {
    try {
      await AsyncStorage.setItem('email', this.email);
      await AsyncStorage.setItem('symbols', JSON.stringify(this.symbols));
      await AsyncStorage.setItem('selectedTopics', this.selectedTopics);
    } catch (error) {
      console.error('Error saving global variables:', error);
    }
  }

  static setEmail(newEmail: string) {
    this.email = newEmail;
    this.saveGlobalVariables();
  }

  static setSymbols(newSymbols: string[]) {
    this.symbols = newSymbols;
    this.saveGlobalVariables();
  }

  static setSelectedTopics(newSelectedTopics: string) {
    this.selectedTopics = newSelectedTopics;
    this.saveGlobalVariables();
  }
}
