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
// import Carousel from './Carousel/Carousel';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-9262239337077945/7084873787';

const {height, width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imges, setImgs] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(-250));

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const [user, setUser] = useState({
    username: 'user',
    imgUrl: 'https://i.ibb.co/M9TV5b4/User.png',
  });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [first,setFirst] = useState(false)

  const[userInfo,setUserInfo] = useState({})

  useEffect(() => {
    if (!first) {
      findUser();
      setFirst(true)
    }

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

  const toggleMenu = () => {
    if(!isSignedIn){
      findUser()
    }
    
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(menuAnimation, {
      toValue: isMenuOpen ? -250 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const findUser = async () => {

    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      console.log(isSignedIn);
      if (isSignedIn) {
        setIsSignedIn(true);
        const userInfo = await GoogleSignin.signInSilently();
        setUserInfo(userInfo)
        setUser({username: userInfo.user.name, imgUrl: userInfo.user.photo});
        console.log(userInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOutUser = async () => {
    try {
      if (isSignedIn) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await auth().signOut();
        setIsSignedIn(false)
        setUser({
          username:"user",
          imgUrl:'https://i.ibb.co/M9TV5b4/User.png'
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.navbar}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={toggleMenu}>
            <Image
              source={require('../../assets/icons/Menu.png')}
              style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/icons/Cube.png')}
          style={{width: 50, height: 50}}
        />
      </View>

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

      {/* <Carousel/> */}

      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('ComMath');
          }}>
          <Image
            source={require('../../assets/icons/Bookmark.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={styles.item}>සoයුක්ත ගණිතය</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('ALpastpapers');
          }}>
          <Image
            source={require('../../assets/icons/Accounting.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={styles.item}> A/L පසුගිය විභාග ප්‍රශ්නපත්‍ර</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('PastPapers');
          }}>
          <Image
            source={require('../../assets/icons/Accounting.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={styles.item}> O/L පසුගිය විභාග ප්‍රශ්නපත්‍ර</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            if(isSignedIn){
              navigation.navigate('Paper',{userInfo:userInfo});
            }else{
              navigation.navigate('PaperClass');
            }
            
          }}>
          <Image
            source={require('../../assets/icons/Document.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={styles.item}>ප්‍රශ්නපත්‍ර පන්තිය</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/icons/Trophy.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={styles.item}>ලකුණු පුවරුව</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('Tution');
          }}>
          <Image
            source={require('../../assets/icons/Training.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={styles.item}>උපකාරක පන්ති</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('Discussion');
          }}>
          <Image
            source={
              require('../../assets/icons/People.png')
              
            }
            style={{width: 50, height: 50}}
          />
          <Text style={styles.item}>ගැටලු සාකච්චාව</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/icons/Zoom.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={styles.item}>අපගේ සහය ලබාගැනීමට</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/icons/Cap.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={styles.item}>උසස් අධ්‍යාපනය</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/icons/Speaker.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={styles.item}>නවතම තොරතුරු</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/icons/Classroom.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={styles.item}>නව පාඨමාලා</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.banner}>
        <GAMBannerAd
          unitId={adUnitId}
          sizes={[BannerAdSize.FULL_BANNER]}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
      {isMenuOpen == true && (
        <TouchableOpacity
          style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
          onPress={() => {
            toggleMenu();
          }}></TouchableOpacity>
      )}

      <Animated.View style={[styles.menuContainer, {left: menuAnimation}]}>
        <View style={styles.sidebarHeaderContainer}>
          <Image
            source={
              {
                uri: user.imgUrl,
              }
            }
            style={{width: 80, height: 80,borderRadius:40}}
          />
          <Text style={styles.sidebarHeader}>{user.username}</Text>
        </View>

        <TouchableOpacity style={styles.sidebarItemContainer}>
          <Image
            source={require('../../assets/icons/Gear.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={styles.sidebarItem}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItemContainer}>
          <Image
            source={require('../../assets/icons/Share.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={styles.sidebarItem}>Share App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItemContainer}>
          <Image
            source={require('../../assets/icons/Comments.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={styles.sidebarItem}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItemContainer}>
          <Image
            source={require('../../assets/icons/Popular.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={styles.sidebarItem}>Rate App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItemContainer}>
          <Image
            source={require('../../assets/icons/Plane.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={styles.sidebarItem}>Conatct Us</Text>
        </TouchableOpacity>

        {isSignedIn==true && (<TouchableOpacity
          style={styles.sidebarItemContainer}
          onPress={logOutUser}>
          <Image
            source={require('../../assets/icons/Left.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={styles.sidebarItem}>Log Out</Text>
        </TouchableOpacity>)}

        {isSignedIn==false && (<TouchableOpacity
          style={styles.sidebarItemContainer}
          onPress={()=>{
            navigation.navigate('LoginRegister')
          }}>
          <Image
            source={require('../../assets/icons/Right.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={styles.sidebarItem}>Log In</Text>
        </TouchableOpacity>)}


      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    paddingBottom: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  navbar: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
    height: 60,
    paddingHorizontal: 10,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1877f2',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  navbarButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: -250,
    width: 250,
    height: height,
    backgroundColor: '#fff',
    //padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 0},
    shadowRadius: 2,
    elevation: 3,
    //zIndex: 1,
  },
  menuOption: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  container: {
    width: width,
    paddingBottom: 60,
    backgroundColor: '#fff',
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
    marginBottom: 12,
    width: width * 0.9,
  },
  imageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    //padding: 10,
    marginBottom: 12,
    width: width * 0.9,
  },
  item: {
    marginLeft: 20,
    fontWeight: 800,
    color: '#818185',
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: 'center',
  },
  sidebarHeaderContainer: {
    width: '100%',
    height: height * 0.2,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarHeader: {
    fontSize: 15,
    fontWeight: 800,
  },
  sidebarItem: {
    fontWeight: 600,
    marginLeft: 30,
    fontSize: 15,
  },
  sidebarItemContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 30,
    alignItems: 'center',
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
