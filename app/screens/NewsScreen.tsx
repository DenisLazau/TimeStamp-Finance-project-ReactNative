// app/screens/NewsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions, Linking } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalVariables } from '../utils/GlobalVariables';

interface NewsItem {
  title: string;
  url: string;
  timePublished: string;
  summary: string;
  bannerImage: string;
  source: string;
}

const NewsScreen: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      const selectedTopics = GlobalVariables.selectedTopics || 'technology';
      const apiUrl =`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&topics=${selectedTopics}&limit=5&apikey=IME0OV7SE14RXJWR`;

      try {
        const response = await axios.get(apiUrl);
        const newsList = parseJsonResponse(response.data);
        setNewsData(newsList);
        await saveNewsDataToLocalFile(newsList);
      } catch (error) {
        console.error('Error fetching news data:', error);
      } finally {
        setLoading(false);
      }
    };

    const checkInternetConnection = () => {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          fetchNewsData();
        } else {
          fetchNewsSentimentFromLocalFile();
          Toast.show({
            type: 'error',
            text1: 'Network Error',
            text2: 'You are offline',
          });
        }
      });
    };

    checkInternetConnection();
  }, []);

  const parseJsonResponse = (response: any): NewsItem[] => {
    const newsList: NewsItem[] = [];
    const feedArray = response.feed;

    for (const newsObject of feedArray) {
      const newsItem: NewsItem = {
        title: newsObject.title,
        url: newsObject.url,
        timePublished: newsObject.time_published,
        summary: newsObject.summary,
        bannerImage: newsObject.banner_image,
        source: newsObject.source,
      };
      newsList.push(newsItem);
    }

    return newsList;
  };

  const fetchNewsSentimentFromLocalFile = async () => {
    try {
      const response = await AsyncStorage.getItem('newsData');
      if (response) {
        const newsList = JSON.parse(response);
        setNewsData(newsList);
      }
    } catch (error) {
      console.error('Error fetching local news data:', error);
    }
  };

  const saveNewsDataToLocalFile = async (newsList: NewsItem[]) => {
    try {
      await AsyncStorage.setItem('newsData', JSON.stringify(newsList));
    } catch (error) {
      console.error('Error saving news data to local file:', error);
    }
  };

  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <View style={localStyles.newsItem}>
      <View style={localStyles.newsDetailsContainer}>
        <Text style={localStyles.newsTitle}>{item.title}</Text>
        <Text style={localStyles.newsSummary}>Published: {item.timePublished}</Text>
        <Text style={localStyles.newsSummary}>Summary: {item.summary}</Text>
        <Text style={localStyles.newsSummary}>Source: {item.source}</Text>
      </View>
      <TouchableOpacity onPress={() => openNewsUrl(item.url)}>
        <Image source={{ uri: item.bannerImage }} style={localStyles.newsImage} />
      </TouchableOpacity>
    </View>
  );

  const openNewsUrl = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Error opening URL:', err));
  };

  return (
    <View style={localStyles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={newsData}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.url}
          contentContainerStyle={localStyles.list}
        />
      )}
      <Toast />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  newsItem: {
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between', // Space between the text and image
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: Dimensions.get('window').width, // Make it occupy the whole width
  },
  newsDetailsContainer: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newsSummary: {
    fontSize: 14,
    marginTop: 8,
  },
  newsImage: {
    width: 100,
    height: 100,
    alignSelf: 'center', // Center the image vertically
  },
  list: {
    paddingBottom: 16,
  },
});

export default NewsScreen;
