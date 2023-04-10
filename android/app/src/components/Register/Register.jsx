import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import React, {useState} from 'react';
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';

const {height, width} = Dimensions.get('window');

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-9262239337077945/7084873787';

export default function Register({navigation}) {
  const [isMsgModalVisible, setIsMsgModalVisible] = useState(false);
  const [isRegModalVisible, setIsRegModalVisible] = useState(false);

  const [msg, setMsg] = useState('');

  const [username, setUserName] = useState('');
  const [useremail, setUserEmail] = useState('');
  const [userpassword, setUserPassword] = useState('');
  const [userconfpassword, setUserConfPassword] = useState('');

  const [errors, setErrors] = useState({
    error1: '',
    error2: '',
    error3: '',
    error4: '',
  });

  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    // setErrors({...errors, error1: '', error2: '', error3: ''});
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus1 = () => {
    setIsFocused1(true);
    //setErrors({...errors, error1: '', error2: '', error3: '', error4: ''});
  };
  const handleBlur1 = () => setIsFocused1(false);

  const handleFocus2 = () => {
    setIsFocused2(true);
    //setErrors({...errors, error1: '', error2: '', error3: '', error4: ''});
  };
  const handleBlur2 = () => setIsFocused2(false);

  const handleFocus3 = () => {
    setIsFocused3(true);
    //setErrors({...errors, error1: '', error2: '', error3: '', error4: ''});
  };
  const handleBlur3 = () => setIsFocused3(false);

  const handleFocus4 = () => {
    setIsFocused4(true);
    //setErrors({...errors, error1: '', error2: '', error3: '', error4: ''});
  };
  const handleBlur4 = () => setIsFocused4(false);

  const handleTouch = () => {
    Keyboard.dismiss();
  };

  const registerUser = async () => {
    // setShowPopup(true)
    if (
      username == '' ||
      useremail == '' ||
      userpassword == '' ||
      userconfpassword == ''
    ) {
      //setErrors({...errors, error4: 'please enter valid information'});
      setMsg('ඇතුලත් කල තොරතුරු නැවත පර්‍රක්ශා කරන්න');
      setIsMsgModalVisible(true);
      return;
    }
    if (userpassword.length < 6) {
      // setErrors({
      //   ...errors,
      //   error4: 'password should be at least 6 characters',
      // });
      setMsg('මුරපදය අවම වශයෙන් අක්ශර 6 ක් විය යුතුය');
      setIsMsgModalVisible(true);
      return;
    }
    if (userpassword != userconfpassword) {
      //setErrors({...errors, error4: "passwords don't match "});
      setMsg('මුරපදය නැවත පරීක්ශාකර බලන්න');
      setIsMsgModalVisible(true);
      return;
    }

    // if(useremail==''){
    //   setErrors({...errors , error2:'invalid email'})
    // }

    Keyboard.dismiss();

    // auth()
    // .createUserWithEmailAndPassword('email@example.com', 'password123')
    // .then(() => {
    //   console.log('User account created & signed in!');
    // })
    // .catch(error => {
    //   if (error.code === 'auth/email-already-in-use') {
    //     console.log('That email address is already in use!');
    //   }

    //   if (error.code === 'auth/invalid-email') {
    //     console.log('That email address is invalid!');
    //   }

    //   console.error(error);
    // });

    try {
      // const { email, password } = formData;

      // Check if email address is already in use
      const signInMethods = await auth().fetchSignInMethodsForEmail(useremail);
      if (signInMethods && signInMethods.length > 0) {
        // Email is already in use
        // Display an error message or redirect to a login screen
        // setErrors({...errors, error4: 'email is already registered'});
        setMsg('ඊමේල් ගිණුම දැනටමත් ලියාපදින්චි කර ඇත');
        setIsMsgModalVisible(true);
        return;
      }

      // Create user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(
        useremail,
        userpassword,
      );

      // Send verification email
      await userCredential.user.sendEmailVerification();
      setIsRegModalVisible(true);
      // Do something with the user data (e.g. save to Firebase database)
    } catch (error) {
        if (error.code === 'auth/invalid-email') {
          setMsg('ඊමේල් ගිණුම වලන්ගු නොවේ');
          setIsMsgModalVisible(true);
      }
      //console.error(error);
    }
  };

  return (
    <View style={styles.body}>
      <TouchableWithoutFeedback onPress={handleTouch}>
        <View style={styles.body}>
          <Text style={styles.h1}>Register</Text>
          <TextInput
            style={[styles.card, isFocused && styles.in2]}
            placeholder="username"
            onChangeText={text => setUserName(text)}
            value={username}
            underlineColorAndroid="transparent"
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={20}
          />
          {/* <View style={{width: width * 0.9}}>
            <Text style={styles.error}>{errors.error1}</Text>
          </View> */}

          <TextInput
            style={[styles.card, isFocused1 && styles.in2]}
            placeholder="email"
            onFocus={handleFocus1}
            onBlur={handleBlur1}
            onChangeText={text => setUserEmail(text)}
          />
          {/* <View style={{width: width * 0.9}}>
            <Text style={styles.error}>{errors.error2}</Text>
          </View> */}
          <TextInput
            style={[styles.card, isFocused2 && styles.in2]}
            placeholder="password"
            secureTextEntry={true}
            onFocus={handleFocus2}
            onBlur={handleBlur2}
            onChangeText={text => setUserPassword(text)}
            maxLength={10}
          />
          {/* <View style={{width: width * 0.9}}>
            <Text style={styles.error}>{errors.error3}</Text>
          </View> */}
          <TextInput
            style={[styles.card, isFocused3 && styles.in2]}
            placeholder="confirm password"
            secureTextEntry={true}
            onFocus={handleFocus3}
            onBlur={handleBlur3}
            onChangeText={text => setUserConfPassword(text)}
            maxLength={10}
          />
          <View style={{width: width * 0.9}}>
            <Text style={styles.error}>{errors.error4}</Text>
          </View>
          {/* <TextInput
          style={[styles.in, isFocused4 && styles.in2]}
          placeholder="password"
          secureTextEntry={true}
          onFocus={handleFocus4}
          onBlur={handleBlur4}
        /> */}

<TouchableOpacity
          style={styles.cardRegister}
          onPress={() => {
            setIsFocused(false);
            setIsFocused1(false);
            registerUser();
          }}>
          <Image
            source={require('../../assets/icons/Male.png')}
            style={{width: 25, height: 25}}
          />
          
          <Text style={styles.item}>Register</Text>
        
        </TouchableOpacity>
          {/* <View style={{width: width * 0.9}}>
            <Button
              title="තහවුරු කරන්න"
              color="#42b72a"
              onPress={() => {
                setIsFocused(false);
                setIsFocused1(false);
                registerUser();
              }}
            />
          </View> */}
          <Modal
            isVisible={isMsgModalVisible}
            onBackdropPress={() => setIsMsgModalVisible(false)}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>උත්සහය අසාර්තකයි</Text>
              <Text style={styles.modalMessage}>{msg}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsMsgModalVisible(false)}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <Modal
            isVisible={isRegModalVisible}
            onBackdropPress={() => setIsRegModalVisible(false)}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>උත්සහය සාර්තකයි</Text>
              <Text style={styles.modalMessage}>
                කරුණාකර අප එවූ ඊමේල් පණිවිඩය තහවුරුකර ලොග් වන්න.
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setIsRegModalVisible(false);
                  navigation.navigate('Login');
                }}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
      {isFocused == false &&
        isFocused1 == false &&
        isFocused2 == false &&
        isFocused3 == false &&
        isFocused4 == false && (
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
    marginBottom: 20,
    textShadowColor: '#1877f2',
  },

  in: {
    borderColor: '#1877f2',
    borderWidth: 1,
    width: width * 0.9,
    color: '#1877f2',
    height: 60,
    // marginBottom: 10,
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
  error: {
    color: '#fa0202',
    // backgroundColor:"#42b72a"
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
