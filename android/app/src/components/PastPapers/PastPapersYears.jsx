import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import {database, firebase} from '@react-native-firebase/database';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-9262239337077945/7084873787';

const {height, width} = Dimensions.get('window');

const PastPapers = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);
  const [years, setYears] = useState([]);

  useEffect(() => {
    /// const reference = database().ref('/math/pure');
    const reference = firebase
      .app()
      .database(
        'https://math-app-1a402-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/math/pastpapers`);

    reference
      .once('value', snapshot => {
        let a = [];
        snapshot.forEach(childSnapshot => {
          console.log(childSnapshot.key);
          const x = childSnapshot.key;
          a.push(x);
        });
        setYears(a);
        return 'done'
      })
      .then(r => {
        setLoaded(true);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loaded == false && (
        <View style={{justifyContent: 'center', height: height}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{alignItems: 'center'}}>
        {loaded == true && (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={{alignItems: 'center'}}
            showsVerticalScrollIndicator={false}
            
            >
            {years.map(section => (
              <TouchableOpacity key={section} style={styles.card}
              onPress={()=>{
                navigation.navigate('Syllabus',{year:section})
              }}
              >
                <Image
                  source={require('../../assets/icons/Document.png')}
                  style={{width: 30, height: 30}}
                />
                <Text style={styles.item}>{section}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/icons/Document.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={styles.item}>2010 Pure Mathematics</Text>
        </TouchableOpacity> */}
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

export default PastPapers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 50,
    backgroundColor: '#fcfcfa',
  },
  scroll: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fcfcfa',
    paddingTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
    marginBottom: 20,
    width: width * 0.9,
  },
  item: {
    paddingLeft: 30,
    fontWeight: '700',
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
