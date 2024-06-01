// app/screens/StocksScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import styles from '../cssStyles/styles';
import { GlobalVariables } from '../utils/GlobalVariables';

interface GlobalQuote {
  symbol: string;
  open: string;
  high: string;
  low: string;
  price: string;
  volume: string;
  latestTradingDay: string;
  previousClose: string;
  change: string;
  changePercent: string;
}

const StocksScreen: React.FC = () => {
  const [stockDetails, setStockDetails] = useState<GlobalQuote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStockDetails = async () => {
      setLoading(true);
      const symbols = GlobalVariables.symbols || ['AAPL', 'GOOGL', 'MSFT']; // Replace with your symbols
      const stockDetails: GlobalQuote[] = [];

      for (const symbol of symbols) {
        try {
          const response = await axios.get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=IME0OV7SE14RXJWR`
          );
          const globalQuoteObject = response.data['Global Quote'];

          const globalQuote: GlobalQuote = {
            symbol: globalQuoteObject['01. symbol'],
            open: globalQuoteObject['02. open'],
            high: globalQuoteObject['03. high'],
            low: globalQuoteObject['04. low'],
            price: globalQuoteObject['05. price'],
            volume: globalQuoteObject['06. volume'],
            latestTradingDay: globalQuoteObject['07. latest trading day'],
            previousClose: globalQuoteObject['08. previous close'],
            change: globalQuoteObject['09. change'],
            changePercent: globalQuoteObject['10. change percent'],
          };
          stockDetails.push(globalQuote);
        } catch (error) {
          console.error('Error fetching stock details:', error);
        }
      }

      setStockDetails(stockDetails);
      setLoading(false);
    };

    const checkInternetConnection = () => {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          fetchStockDetails();
        } else {
          Toast.show({
            type: 'error',
            text1: 'Network Error',
            text2: 'You are offline',
          });
          setLoading(false);
        }
      });
    };

    checkInternetConnection();
  }, []);

  const renderStockItem = ({ item }: { item: GlobalQuote }) => {
    const changePercent = parseFloat(item.changePercent.replace('%', '')) || 0;
    const changeArrowImage = changePercent > 0 ? require('../../assets/up_trend.jpeg') : require('../../assets/down_trend.jpeg');

    return (
      <View style={localStyles.stockItem}>
        <View style={localStyles.stockDetailsContainer}>
          <Text style={localStyles.stockSymbol}>Symbol: {item.symbol}</Text>
          <Text style={localStyles.stockPrice}>Current Price: {item.price}</Text>
          <Text style={localStyles.stockDetails}>
            Open: {item.open}{'\n'}
            High: {item.high}{'\n'}
            Low: {item.low}{'\n'}
            Volume: {item.volume}{'\n'}
            Latest Trading Day: {item.latestTradingDay}{'\n'}
            Previous Close: {item.previousClose}{'\n'}
            Change: {item.change}{'\n'}
            Change Percent: {item.changePercent}
          </Text>
        </View>
        <Image source={changeArrowImage} style={localStyles.changeArrow} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={stockDetails}
          renderItem={renderStockItem}
          keyExtractor={(item) => item.symbol}
          contentContainerStyle={localStyles.list}
        />
      )}
      <Toast />
    </View>
  );
};

const localStyles = StyleSheet.create({
  stockItem: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space between the text and image
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: Dimensions.get('window').width, // Make it occupy the whole width
  },
  stockDetailsContainer: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stockPrice: {
    fontSize: 16,
  },
  stockDetails: {
    fontSize: 14,
    marginTop: 8,
  },
  changeArrow: {
    width: 450, // Make the image bigger
    height: 240, // Make the image bigger
    alignSelf: 'center', // Center the image vertically
  },
  list: {
    paddingBottom: 16,
  },
});

export default StocksScreen;
