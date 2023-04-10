import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    Animated,
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

const AlPastpapers = ({navigation}) => {

    const [loaded, setLoaded] = useState(false);
    const [subjects, setSubjects] = useState([]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuAnimation] = useState(new Animated.Value(-250));
  
    useEffect(() => {
      /// const reference = database().ref('/math/pure');
      const reference = firebase
        .app()
        .database(
          'https://math-app-1a402-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref(`/alpastpapers`);
  
      reference
        .once('value', snapshot => {
          let a = [];
          snapshot.forEach(childSnapshot => {
            console.log(childSnapshot.key);
            const x = childSnapshot.key;
            a.push(x);
          });
          setSubjects(a);
          return 'done'
        })
        .then(r => {
          setLoaded(true);
        });
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        Animated.timing(menuAnimation, {
          toValue: isMenuOpen ? -250 : 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      };


  return (
   <View style={styles.container}>

    <View style={styles.navbar}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('Home')
          }}>
            <Image
              source={require('../../../assets/icons/Home.png')}
              style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../../assets/icons/Cube.png')}
          style={{width: 50, height: 50}}
        />
      </View>


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
            {subjects.map(subject => (
              <TouchableOpacity key={subject} style={styles.card}
              onPress={()=>{
                navigation.navigate('Years',{subject:subject})
              }}
              >
                <Image
                  source={require('../../../assets/icons/Document.png')}
                  style={{width: 30, height: 30}}
                />
                <Text style={styles.item}>{subject}</Text>
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
      <Animated.View style={[styles.menuContainer, {left: menuAnimation}]}>
        <View style={styles.sidebarHeaderContainer}>
          <Image
            source={
              require('../../../assets/icons/User.png')
              
            }
            style={{width: 80, height: 80}}
          />
          <Text style={styles.sidebarHeader}>User</Text>
        </View>

        <TouchableOpacity style={styles.sidebarItemContainer}>
          <Image
            source={
              require('../../../assets/icons/Gear.png')
             
            }
            style={{width: 30, height: 30}}
          />
          <Text style={styles.sidebarItem}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItemContainer}>
          <Image
            source={
              require('../../../assets/icons/Share.png')
              
            }
            style={{width: 30, height: 30}}
          />
          <Text style={styles.sidebarItem}>Share App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItemContainer}>
          <Image
            source={
              require('../../../assets/icons/Comments.png')
             
            }
            style={{width: 30, height: 30}}
          />
          <Text style={styles.sidebarItem}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItemContainer}>
          <Image
            source={
              require('../../../assets/icons/Popular.png')
              
            }
            style={{width: 30, height: 30}}
          />
          <Text style={styles.sidebarItem}>Rate App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItemContainer}>
          <Image
            source={
              require('../../../assets/icons/Plane.png')
              
            }
            style={{width: 30, height: 30}}
          />
          <Text style={styles.sidebarItem}>Conatct Us</Text>
        </TouchableOpacity>
      </Animated.View>

      {isMenuOpen == true && (
        <TouchableOpacity
          style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
          onPress={() => {
            toggleMenu();
          }}></TouchableOpacity>
      )}
    </View>
  )
}

export default AlPastpapers

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


})