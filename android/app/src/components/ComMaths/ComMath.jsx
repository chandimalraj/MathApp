import {StyleSheet, Text, View, Button, ScrollView , TouchableOpacity ,Image,Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
  
} from 'react-native-google-mobile-ads';
import {useFocusEffect} from '@react-navigation/native';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-9262239337077945/7084873787';
const adUnitId2 = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const add = 'ca-app-pub-9262239337077945/7084873787';

const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const {height, width} = Dimensions.get('window');

export default function ComMath({navigation}) {
  const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   loadAdd()
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      //console.log('Component is focused');
      loadAdd();
      // Call your function here
      return () => {
       // console.log('Component is unfocused');
      };
    }, []),
  );

  const loadAdd = () => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    //console.log('loaded first time');
    return unsubscribe;
  };

  const [content, setContent] = useState('');

  const applied =
    'ව්‍යවහාරික ගණිතය යනු භෞතික විද්‍යාව, ඉංජිනේරු විද්‍යාව, වෛද්‍ය විද්‍යාව, ජීව විද්‍යාව, මූල්‍ය, ව්‍යාපාර, පරිගණක විද්‍යාව සහ කර්මාන්ත වැනි විවිධ ක්ෂේත්‍රවල ගණිතමය ක්‍රම යෙදීමයි. මේ අනුව, ව්‍යවහාරික ගණිතය යනු ගණිත විද්‍යාවේ සහ විශේෂිත දැනුමේ එකතුවකි. "ව්‍යවහාරික ගණිතය" යන යෙදුමෙන් ගණිතමය ආකෘතීන් සකස් කිරීම සහ අධ්‍යයනය කිරීම මගින් ප්‍රායෝගික ගැටළු සම්බන්ධයෙන් ගණිතඥයින් කටයුතු කරන වෘත්තීය විශේෂත්වය ද විස්තර කරයි.';

  const pure =
    'ශුද්ධ ගණිතය යනු ගණිතයට පරිබාහිර ඕනෑම යෙදුමකින් ස්වාධීනව ගණිතමය සංකල්ප අධ්‍යයනය කිරීමයි. මෙම සංකල්ප සැබෑ ලෝකයේ උත්සුකයන් තුළ ආරම්භ විය හැකි අතර, ලබාගත් ප්‍රතිඵල පසුව ප්‍රායෝගික යෙදුම් සඳහා ප්‍රයෝජනවත් විය හැකි නමුත්, පිරිසිදු ගණිතඥයන් මූලික වශයෙන් එවැනි යෙදුම්වලින් පෙළඹී නැත. ඒ වෙනුවට, අභියාචනය මූලික මූලධර්මවල තාර්කික ප්රතිවිපාක සැකසීමේ බුද්ධිමය අභියෝගය සහ සෞන්දර්යාත්මක සුන්දරත්වයට ආරෝපණය කර ඇත.';

  return (
    <View style={styles.body}>
      <ScrollView 
      contentContainerStyle={{alignItems: 'center'}}
      showsVerticalScrollIndicator={false}
      >

<TouchableOpacity style={styles.card}
        onPress={() => navigation.navigate('PureMaths')}
        >
          <Image
            source={
              require('../../assets/icons/Bookmark.png')
              
            }
            style={{width: 50, height: 50}}
          />
          <View style={{ justifyContent:'center' ,flexDirection:'row',width:'80%'}}>
            <Text style={styles.item}>ප්‍රශ්නපත්‍ර ව්‍යුහය</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card}
        onPress={() => navigation.navigate('PureMaths')}
        >
          <Image
            source={
              require('../../assets/icons/Bookmark.png')
              
            }
            style={{width: 50, height: 50}}
          />
          <View style={{ justifyContent:'center' ,flexDirection:'row',width:'80%'}}>
            <Text style={styles.item}>ශුද්ධ ගණිතය</Text>
          </View>
        </TouchableOpacity>

        
        <Text style={styles.pure}>{pure}</Text>

        <TouchableOpacity style={styles.card}
       onPress={() => navigation.navigate('AppliedMaths')}
        >
          <Image
            source={
              require('../../assets/icons/Bookmark.png')
              
            }
            style={{width: 50, height: 50}}
          />
        <View style={{ justifyContent:'center' ,flexDirection:'row',width:'80%'}}><Text style={styles.item}>ව්‍යවහාරික ගණිතය</Text></View>
        </TouchableOpacity>
       
        <Text style={styles.pure}>{applied}</Text>
        
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
}

const styles = StyleSheet.create({
  body: {
    paddingTop:20,
    paddingBottom: 50,
    flex: 1,
    justifyContent:'center',
   
  },
  hview: {
    zIndex: 1,
    backgroundColor: '#eeeeee',
  },
  h1: {
    fontFamily: 'Noto-Sans-Sinhala-Bold',
    fontSize: 30,
    //fontWeight: 'bold',
    color: '#1877f2',
    textAlign: 'center',
    marginBottom: 2,
    textShadowColor: '#1877f2',
    marginTop: 20,
  },
  h2: {
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    //fontWeight: 'bold',
    color: '#1877f2',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: '#1877f2',
    marginTop: 0,
  },
  pure: {
    marginTop: 10,
    marginBottom: 20,
    width:width*0.9
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
    width:width*0.9
  },
  item:{
    // backgroundColor:'#1877f2'
    color:'#1877f2',
    fontWeight:'800'
  }
});
