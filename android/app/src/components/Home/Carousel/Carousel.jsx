import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Image,
    ScrollView,
    Dimensions,
  } from 'react-native';
  import {React, useState, useRef, useEffect} from 'react';
  import {
    GAMBannerAd,
    BannerAdSize,
    TestIds,
  } from 'react-native-google-mobile-ads';
  import Sidebar from './Sidebar/Sidebar';
  import storage from '@react-native-firebase/storage';
  import {GoogleSignin} from '@react-native-google-signin/google-signin';
  import auth from '@react-native-firebase/auth';
  
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-9262239337077945/7084873787';
  
  const {height, width} = Dimensions.get('window');

const Carousel = () => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imges, setImgs] = useState([]);
    const scrollX = useRef(new Animated.Value(0)).current;
    const timerRef = useRef(null);
  
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuAnimation] = useState(new Animated.Value(-250));
  
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef(null);
  

    useEffect(() => {
        // if (!first) {
        //   findUser();
        //   setFirst(true)
        // }
    
        if (imges.length == 0) {
          LoadImages();
        }
    
        const intervalId = setInterval(() => {
          const newIndex = (activeIndex + 1) % imges.length;
          scrollViewRef.current.scrollTo({
            x: newIndex * Dimensions.get('window').width,
          });
          setActiveIndex(newIndex);
        }, 6000);
        return () => clearInterval(intervalId);
      }, [activeIndex, imges.length]);
    
      const LoadImages = async () => {
        const reference = storage().ref(`images/`);
        const list = await reference.listAll();
        const imageUrls = await Promise.all(
          list.items.map(async itemRef => {
            const url = await itemRef.getDownloadURL();
            return {uri: url};
          }),
        );
        setImgs(imageUrls);
        console.log('in async awiat');
      };
    
      const scrollToIndex = index => {
        flatListRef.current.scrollToIndex({index, animated: true});
      };
    
      const startTimer = () => {
        timerRef.current = setInterval(() => {
          let nextIndex = currentIndex + 1;
          if (nextIndex === data.length) {
            nextIndex = 0;
          }
          setCurrentIndex(nextIndex);
          scrollToIndex(nextIndex);
        }, 3000);
      };
    
      const stopTimer = () => {
        clearInterval(timerRef.current);
      };
    
      const handleScroll = event => {
        const width = Dimensions.get('window').width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / width);
        setActiveIndex(index);
      };

  return (
    <View style={{height: (width * 9) / 16}}>
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}>
      {imges.map((image, index) => (
        <View key={index} style={styles.slide}>
          <Image
            source={image}
            style={{
              width: width * 0.9,
              height: (0.9 * width * 9) / 16,
              borderRadius: 10,
            }}
          />
        </View>
      ))}
    </ScrollView>
  </View>
  )
}

export default Carousel

const styles = StyleSheet.create({})