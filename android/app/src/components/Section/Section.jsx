import {StyleSheet, Text, View, ScrollView, Button, Image ,Dimensions,ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';
import React, {useEffect,useState} from 'react';
import storage from '@react-native-firebase/storage';
import {database, firebase} from '@react-native-firebase/database';
import {
    GAMBannerAd,
    BannerAdSize,
    TestIds,
    InterstitialAd,
    AdEventType,
    
  } from 'react-native-google-mobile-ads';

const {height, width} = Dimensions.get('window');
const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-9262239337077945/7084873787'

const Section = ({navigation}) => {

  const route = useRoute();
  const {section, path, lesson} = route.params;
  const [imgs,setImgs] = useState([1,2])
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    
     LoadImages(section);
  },[]);

  const LoadImages = async (section) => {
    let reference;
    
    if(path=='pure'){
         reference = storage().ref(`Pure Mathematics/${lesson}/${section}`);
    }
    else{
         reference = storage().ref(`Applied Mathematics/${lesson}/${section}`);
    }
    
    
    const list = await reference.listAll();

    const imageUrls = await Promise.all(list.items.map(async (itemRef) => {
        const url = await itemRef.getDownloadURL();
        return { name: itemRef.name, url };
      }));

    console.log(imageUrls)
    setImgs(imageUrls)
    setLoaded(true)  
    return imageUrls;

    // try {
    //   const path = await refs.getDownloadURL();
    //   console.log(path);
    //   images.push(path);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hview}>
        <Text style={styles.h1}>{section}</Text>
      </View>
      
      {loaded == false && (
        <View style={{justifyContent: 'center', height: height}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {loaded==true && <ScrollView 
      style={styles.scroll}
      showsVerticalScrollIndicator={false}
      
      >
      
      {imgs.map((item)=>
      <View style={styles.sec} key={item.name}>
      <Image
      source={{
        //require('../../../../assets/images/1.png')
        uri: item.url,
      }}
      style={styles.img}
      
      />
      </View>
      )}
        
      </ScrollView>}

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

export default Section;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom:50
  },
  hview: {
    height: 60,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    width:"100%",
    backgroundColor:'#42b72a'
  },
  h1: {
    fontFamily: 'Roboto-Black',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: '#1877f2',
  },
  scroll: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fcfcfa',
    paddingTop: 5,
    
  },
  img : {
    width: '100%',
    aspectRatio: 16/9,
  },
  sec: {
    marginVertical: 2,
    paddingHorizontal: 5,
    borderColor: '#1877f2',
    paddingBottom: 5,
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
