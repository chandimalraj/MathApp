import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-9262239337077945/7084873787';

const DailyQuestions = () => {
  const [data, setData] = useState({
    date: '',
    questions: [],
    answers: [],
    showQts: true,
    showAnswers: false,
  });

  const [showItem, setShowItem] = useState(null);

  const sampleData = [
    {
      id: 1,
      date: '2023/03/06',
      questions: [
        'https://i.ibb.co/kh7n6Z9/3.jpg',
        'https://i.ibb.co/kh7n6Z9/3.jpg',
        'https://i.ibb.co/kh7n6Z9/3.jpg',
        'https://i.ibb.co/kh7n6Z9/3.jpg',
      ],
      answers: [
        'https://i.ibb.co/kh7n6Z9/3.jpg',
        'https://i.ibb.co/kh7n6Z9/3.jpg',
        'https://i.ibb.co/kh7n6Z9/3.jpg',
        'https://i.ibb.co/kh7n6Z9/3.jpg',
      ],
      showQts: true,
      showAnswers: true,
    },
    {
      id: 2,
      date: '2023/03/07',
      questions: [
        'https://i.ibb.co/kh7n6Z9/3.jpg',
        'https://i.ibb.co/kh7n6Z9/3.jpg',
        'https://i.ibb.co/kh7n6Z9/3.jpg',
        'https://i.ibb.co/kh7n6Z9/3.jpg',
      ],
      answers: [
        'https://i.ibb.co/kh7n6Z9/3.jpg',
        'https://i.ibb.co/kh7n6Z9/3.jpg',
        'https://i.ibb.co/kh7n6Z9/3.jpg',
        'https://i.ibb.co/kh7n6Z9/3.jpg',
      ],
      showQts: true,
      showAnswers: false,
    },
  ];

  return (
    <View style={styles.body}>
      <Text style={styles.h1}>DailyQuestions</Text>
      <ScrollView>
        {sampleData.map(item => (
          <View style={styles.qcontainer} key={item.id}>
            <Button
              title={item.date}
              color="#42b72a"
              style={{marginTop: 25}}
              onPress={() => {
                if (showItem != item.id) {
                  setShowItem(item.id);
                } else {
                  setShowItem(null);
                }
              }}
            />
            {showItem == item.id && <View style={styles.secv}>
              
              
              
              </View>}
          </View>
        ))}
      </ScrollView>

      <View style={styles.banner}>
        <GAMBannerAd
          unitId={adUnitId}
          sizes={[BannerAdSize.BANNER]}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </View>
  );
};

export default DailyQuestions;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flex: 1,
  },
  qcontainer: {
    marginTop: 10,
  },
  h1: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 500,
  },
  sec: {
    marginVertical: 3,
    paddingHorizontal: 5,
    borderColor: '#1877f2',
    borderWidth: 1,
    backgroundColor: '#e1ecf5',
    paddingBottom: 5,
  },
  secv: {
    height: 200,
    backgroundColor: '#1877f2',
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    alignItems: 'center',
  },
});
