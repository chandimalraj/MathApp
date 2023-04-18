import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {
    GAMBannerAd,
    BannerAdSize,
    TestIds,
    InterstitialAd,
    AdEventType,
  } from 'react-native-google-mobile-ads';
  import {GoogleSignin} from '@react-native-google-signin/google-signin';
  import auth from '@react-native-firebase/auth';
  
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-9262239337077945/7084873787';
  
  const {height, width} = Dimensions.get('window');

const LoginRegister = ({navigation}) => {
    const [sessionTime, setSessionTime] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [user, setUser] = useState('chandimalprabth1@gmail.com');
  
    useEffect(() => {
      findUser()
    }, []);
  
    const findUser = async () => {
      
      try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        console.log(isSignedIn)
        if (isSignedIn) {
          const userInfo = await GoogleSignin.signInSilently();
          console.log(userInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const currentUser = auth().currentUser;
    //const { displayName, photoURL, email } = currentUser;
  
    const startSession = () => {
      const id = setInterval(() => {
        setSessionTime(prevTime => prevTime + 1);
        console.log('awa');
        return 0;
      }, 5000);
  
      setTimerId(id);
    };
  
    const endSession = () => {
      clearInterval(timerId);
      // firebase.database().ref('sessions').push({
      //   time: sessionTime
      // });
    };
  
    async function onGoogleButtonPress() {
      // Check if your device supports Google Play
  
      //console.log(displayName)
  
      try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if(!isSignedIn){
  
          await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
          // Get the users ID token
          const {idToken} = await GoogleSignin.signIn();
    
          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          console.log(googleCredential);
          //console.log(auth().signInWithCredential(googleCredential));
    
          // Sign-in the user with the credential
          await auth().signInWithCredential(googleCredential);
          navigation.navigate('Home')
        }
       
        //   await GoogleSignin.revokeAccess();
        // await GoogleSignin.signOut();
        // await auth().signOut();
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/icons/Document.png')}
            style={{width: 50, height: 50}}
          />
          <Text style={styles.item}>ප්‍රශ්නපත්‍ර පන්තිය</Text>
        </TouchableOpacity> */}
  
        
          {/* <Text style={styles.txt}>
            අපගේ ප්‍රශ්නපත්‍ර පන්තියට සහභාගී වීම සදහා පලමුව ලියාපදිංචි විය යුතුය ඒ
            සදහා පහත අයිතමය ක්ලික් කරන්න
          </Text>
  
          <Text style={styles.txt}>දැනටමත් ලියාපදිංචිවී ඇත්නම්</Text> */}
  
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Image
              source={require('../../assets/icons/User.png')}
              style={{width: 50, height: 50}}
            />
            <Text style={styles.item}>Login</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.card}
            onPress={() => onGoogleButtonPress()}>
            <Image
              source={require('../../assets/icons/Google.png')}
              style={{width: 50, height: 50}}
            />
            <Text style={styles.item}>Login With Google</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Image
              source={require('../../assets/icons/Plus.png')}
              style={{width: 50, height: 50}}
            />
            <Text style={styles.item}>Register</Text>
          </TouchableOpacity>
  
  
       
  
        <View style={styles.banner}>
          <GAMBannerAd
            unitId={adUnitId}
            sizes={[BannerAdSize.FULL_BANNER]}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      </View>)
}

export default LoginRegister

const styles = StyleSheet.create({
    
  container: {
    alignItems: 'center',
    paddingTop: 20,
    flex: 1,
    justifyContent:'center'
  },
  scroll: {
    width: '100%',
    flexDirection: 'column',
    
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
    marginLeft: 20,
    fontWeight: 800,
    //color:''
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: 'center',
  },

  txt: {
    width: width * 0.9,
    marginBottom: 20,
  },
})