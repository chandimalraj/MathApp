import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {React, useEffect, useState} from 'react';
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

const PureLessons = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [isPure, setIsPure] = useState(true);

  let les = [];

  useEffect(() => {
    /// const reference = database().ref('/math/pure');
    const reference = firebase
      .app()
      .database(
        'https://math-app-1a402-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/math/${isPure ? 'pure' : 'applied'}`);

    reference
      .once('value', snapshot => {
        let a = [];
        snapshot.forEach(childSnapshot => {
          //childSnapshot.val();
          console.log(childSnapshot.key);
          const x = childSnapshot.key;
          a.push(x);
          // les.push(x);
        });
        setLessons(a);
        return 'done';
      })
      .then(r => {
        setLoaded(true);
      });
  }, [isPure]);

  const changeToPure = () => {
    setIsPure(true);
  };

  const changeToApplied = () => {
    setIsPure(false);
  };

  const handlePress = lesson => {
    let path = '';
    if (isPure) {
      path = 'pure';
    } else {
      path = 'applied';
    }
    navigation.navigate('Lesson', {lesson: lesson, path: path});
  };

  const lessonSet = isPure
    ? ['ත්‍රිකොණමිතිය', 'වර්ගජ ශ්‍රිත හා සමීකරණ', 'සීමාව', 'අවකලනය', 'අනුකලනය']
    : ['applied 1', 'applied 2', 'applied 3', 'applied 4'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={isPure ? styles.headercardActive : styles.headercard}
          onPress={() => changeToPure()}>
          <Text style={styles.itemheader}>ශුද්ධ ගණිතය</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={!isPure ? styles.headercardActive : styles.headercard}
          onPress={() => changeToApplied()}>
          <Text style={styles.itemheader}>ව්‍යවහාරික ගණිතය</Text>
        </TouchableOpacity>
      </View>

      {loaded == false && (
        <View style={{justifyContent: 'center', height: height}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {loaded == true && (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          >
          {lessons.map(item => (
            <TouchableOpacity
              key={item}
              style={styles.card}
              onPress={() => handlePress(item)}>
              <Image
                source={require('../../assets/icons/Document.png')}
                style={{width: 30, height: 30}}
              />
              <Text style={styles.item}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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

export default PureLessons;

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
  maincard: {
    height: 80, //we need to add different hights for larger devices
    marginVertical: 5,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tile: {
    backgroundColor: true ? '#ef4146' : '#1877f2',
    width: width * 0.45,
    marginHorizontal: 5,
    //height:200,
    //shadowColor: '#1877f2',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    flexDirection: 'column',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ///borderColor:'#1877f2',
    //borderWidth: 1,
    textAlign: 'center',
  },
  h1: {
    color: '#fcfcfa',
    fontSize: 13,
    fontWeight: 800,
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    alignItems: 'center',
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
  header: {
    flexDirection: 'row',
  },
  headercard: {
    width: width * 0.5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#1877f2',
  },
  itemheader: {
    color: 'white',
    fontWeight: '800',
  },
  headercardActive: {
    width: width * 0.5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#42b72a',
  },
});
