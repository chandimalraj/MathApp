import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
// import { BannerAd } from 'react-native-google-mobile-ads';
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import auth  from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import {GoogleSignin , GoogleSigninButton,} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '693342862774-dbo4hrrl173854qpi1khr8q557qch8cq.apps.googleusercontent.com',
  offlineAccess: true,
});

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-9262239337077945/7084873787';

const {height, width} = Dimensions.get('window');

export default function Login({navigation}) {
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isActiveModalVisible, setIsActiveModalVisible] = useState(false);

  const [useremail, setUserEmail] = useState('');
  const [userpassword, setUserPassword] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleFocus1 = () => setIsFocused1(true);
  const handleBlur1 = () => setIsFocused1(false);

  useEffect( ()=>{
    // auth() 
    // .signOut()
    // .then(() => console.log('User signed out!'));
  },
  [])

  const handleTouch = () => {
    Keyboard.dismiss();
  };

  const Logout = async ()=>{
    try {
      const user = await auth().getCurrentUser();
    } catch (error) {
      
    }
   
  }

  const Login = async () => {

    if (useremail == '' || userpassword == '') {
      setIsErrorModalVisible(true);
      return;
    }
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        useremail,
        userpassword,
      );
      if (userCredential.user.emailVerified) {
        navigation.navigate('Home');
      } else {
        setIsActiveModalVisible(true);
      }
      console.log(userCredential);
    } catch (error) {
      console.log(error);
      setIsErrorModalVisible(true);
    }
  };

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play

    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredential)
      console.log(auth().signInWithCredential(googleCredential))

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.body}>
      <TouchableWithoutFeedback onPress={handleTouch}>
        <View style={styles.body}>
          <Image
            source={{
              //require('../../../../assets/images/1.png')
              uri: 'https://i.ibb.co/411mVGZ/math1.png',
            }}
            style={{width: 200, height: 200}}
          />

          <View>
            <Text style={styles.h1}>Log In</Text>

            <TextInput
              style={[styles.card, isFocused && styles.in2]}
              placeholder="email"
              onChangeText={text => setUserEmail(text)}
              value={useremail}
              underlineColorAndroid="transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <TextInput
              style={[styles.card, isFocused1 && styles.in2]}
              placeholder="password"
              secureTextEntry={true}
              onFocus={handleFocus1}
              onBlur={handleBlur1}
              onChangeText={text => setUserPassword(text)}
            />

      <TouchableOpacity
          style={styles.cardbutton}
          onPress={() => {
            setIsFocused(false);
            setIsFocused1(false);
            // navigation.navigate('Home');
            Login();
          }}>
          <Image
            source={require('../../assets/icons/Login.png')}
            style={{width: 25, height: 25}}
          />
          
          <Text style={styles.item}>Log in</Text>
        
        </TouchableOpacity>


            {/* <Button
              title="ඊළග පියවර !  "
              color="#1877f2"
              onPress={() => {
                setIsFocused(false);
                setIsFocused1(false);
                // navigation.navigate('Home');
                Login();
              }}
            /> */}
            
            {/* <Button
              title="Google Sign-In"
              onPress={() =>
                onGoogleButtonPress().then(() =>
                  console.log('Signed in with Google!'),
                )
              }
            /> */}
           
            {/* <GoogleSigninButton  style={{ width: width*0.9, height: 48 }}/> */}

            <TouchableOpacity
          style={styles.cardRegister}
          onPress={() => {
            setIsFocused(false);
            setIsFocused1(false);
            navigation.navigate('Register');
          }}>
          <Image
            source={require('../../assets/icons/Male.png')}
            style={{width: 25, height: 25}}
          />
          
          <Text style={styles.item}>Register</Text>
        
        </TouchableOpacity>
            {/* <Button
              title="තවමත් ලියාපදිංචිවී නොමැතිද ?"
              color="#42b72a"
              onPress={() => {
                setIsFocused(false);
                setIsFocused1(false);
                navigation.navigate('Register');
              }}
            /> */}
            <Modal
              isVisible={isErrorModalVisible}
              onBackdropPress={() => setIsErrorModalVisible(false)}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>උත්සහය අසාර්තකයි</Text>
                <Text style={styles.modalMessage}>
                  ඊ-මේල් ගිණුම හො මුරපදය වැරදියි
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setIsErrorModalVisible(false)}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <Modal
              isVisible={isActiveModalVisible}
              onBackdropPress={() => setIsActiveModalVisible(false)}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>උත්සහය අසාර්තකයි</Text>
                <Text style={styles.modalMessage}>
                  ඊ-මේල් ගිණුම තහවුරුකර නොමැත
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setIsActiveModalVisible(false)}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>

          {isFocused == false && isFocused1 == false && (
            <View style={styles.banner}>
              <GAMBannerAd
                unitId={adUnitId}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1877f2',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#1877f2',
    marginTop: 20,
  },

  in: {
    borderColor: '#1877f2',
    borderWidth: 1,
    width: width * 0.9,
    color: '#1877f2',
    height: 60,
    marginBottom: 10,
    fontSize: 15,
    paddingHorizontal: 15,
    borderRadius: 3,
  },
  in2: {
    borderColor: '#42b72a',
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: 'center',
  },
  modalContainer: {
    //width:200,
    //height:200,
    backgroundColor: '#faf8f7',
    padding: 5,
    alignItems: 'center',
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: '600',
    //color:''
  },
  modalMessage: {
    textAlign: 'center',
    marginTop: 10,
  },
  modalButton: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#1877f2',
    width: 100,
  },
  modalButtonText: {
    textAlign: 'center',
    color: '#faf8f7',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 15,
    marginBottom: 20,
    width: width * 0.9,
  },
  cardbutton:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#1877f2',
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
  cardRegister:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#42b72a',
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
    alignItems:'center',
    color:'#fff',
    fontSize:15
    //color:''
  },
});
