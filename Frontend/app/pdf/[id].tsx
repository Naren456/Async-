import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Pdf from 'react-native-pdf';

export default function PDFScreen() {
  // Get the URL from the route parameters
  const { url } = useLocalSearchParams();

  // Decode the URL if it's encoded
  const pdfUrl = decodeURIComponent(url);

  if (!pdfUrl) {
    return (
      <View style={styles.container}>
        <Text>No PDF URL provided.</Text>
      </View>
    );
  }

  const source = { uri: pdfUrl, cache: true };

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onError={(error) => {
          console.log('PDF Error:', error);
        }}
        style={styles.pdf}
        renderActivityIndicator={() => (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});