import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {database, firebase} from '@react-native-firebase/database';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');

const Paper = ({navigation}) => {
  const route = useRoute();
  const {userInfo} = route.params;
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState();
  const [paperDetails, setPaperDetails] = useState({});

  //data that saved in app memory
  const [saveData, setSaveData] = useState({});

  const [duration, setDuration] = useState(0);

  let x = 0;

  const userEmail = userInfo.user.email.split('.')[0];

  useEffect(() => {
    // console.log(userInfo.user.email);
     retrieveDataInApp();
  }, []);

  //user start the paper
  const start = () => {

    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    if (paperDetails !== null) {

      const reference = firebase
        .app()
        .database(
          'https://math-app-1a402-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref(`users/${userEmail}/`)
        .set({
          name: userInfo.user.name,
          start_at: {
            year: year,
            month: month,
            date: date,
            hour: hour,
            minutes: minutes,
          },
          paper: paperDetails,
        })
        .then(() => console.log('Data set.'))
        .catch(error => {
          console.log(error);
        });

      const intervalId = setInterval(() => {
        x = x - 1;
        setTime(x);
        if (x == 0) {
          clearInterval(intervalId);
        }
        saveDataInApp();
      }, 1000);

      setIntervalId(intervalId);
    } else {
    }
  };


  const resume = ()=>{

    const intervalId = setInterval(() => {
      x = x - 1;
      setTime(x);
      if (x == 0) {
        clearInterval(intervalId);
      }
      saveDataInApp();
    }, 1000);

    setIntervalId(intervalId);

  }

  //save user paper details in app memory
  const saveDataInApp = async () => {
    // console.log("in aspp save")
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    const user = {
      user: {
        name: userEmail,
        // start_at: {
        //   year: year,
        //   month: month,
        //   date: date,
        //   hour: hour,
        //   minutes: minutes,
        // },
        leave_at: {
          year: year,
          month: month,
          date: date,
          hour: hour,
          minutes: minutes,
        },
        paper: paperDetails,
      },
    };

    const jsonValue = JSON.stringify(user);

    // setTime(paperDetails.duration)
    //  console.log(paperDetails.closeDate)
    try {
      await AsyncStorage.setItem('myData', jsonValue);
      setSaveData(user);
    } catch (error) {
      console.log(error);
    }
  };

  //data retrive from app memory and retrieve paper details from database
  const retrieveDataInApp = async () => {

    let savedData;

    try {
      const value = await AsyncStorage.getItem('myData');
      const data = JSON.parse(value);
      console.log(data)
      savedData = data;
      //console.log(data.userEmail.paper.duration);
      // setSaveData();
    } catch (error) {
      console.log(error);
    }
    if(savedData !==null){

      if (savedData.user.name == userEmail) {

        const reference = firebase
          .app()
          .database(
            'https://math-app-1a402-default-rtdb.asia-southeast1.firebasedatabase.app/',
          )
          .ref(`paperclass/paper01/`);
          
          // console.log("savedData.user.name")
          // console.log(savedData.user.name)
  
  
  
        reference
          .once('value', snapshot => {
            setPaperDetails(snapshot.val());
            // console.log(snapshot.val());
  
            //check saved data about user in app memory
            if (savedData !== null) {
              //setDuration();
              //how to get time left
              //first look at the present time at the moment
              const presentTime = new Date();
              //check last time that user leave the page
              //console.log(savedData.user.leave_at);
              const userLeaveTime = savedData.user.leave_at;
  
              //check start time of the paper
              const reference2 = firebase
                .app()
                .database(
                  'https://math-app-1a402-default-rtdb.asia-southeast1.firebasedatabase.app/',
                )
                .ref(`users/${userEmail}/`);
  
              reference2.once('value', snapshot => {
                const paperStartTime = snapshot.val().start_at;
                const paperDuration = snapshot.val();
                // console.log(paperStartTime);
                const presentTime = new Date()
                
                 const ituru = 1*60-(presentTime.getMinutes()-paperStartTime.minutes)
                // const leftTime = userLeaveTime.minutes - paperStartTime.minutes;
                 console.log(paperDuration)
                // setDuration(leftTime);
                  x=ituru*60;
              });
  
              //find time duration left if
            }
            // setDuration(snapshot.val().duration);
          })
          .then(r => {
            // setLoaded(true);
          });
  
          resume();
      }else{
  
      }



    }else{
       
      const reference = firebase
          .app()
          .database(
            'https://math-app-1a402-default-rtdb.asia-southeast1.firebasedatabase.app/',
          )
          .ref(`paperclass/paper01/`);
          
          // console.log("savedData.user.name")
          // console.log(savedData.user.name)
  
  
  
        reference
          .once('value', snapshot => {
            setPaperDetails(snapshot.val());
            setDuration(snapshot.val().duration);
            }
          )
          .then(r => {
            // setLoaded(true);
          });


    }
    
  };

  const stop = () => {
    clearInterval(intervalId);
  };

  return (
    <View style={styles.body}>
      <TouchableOpacity style={styles.card}>
        <Image
          source={require('../../../assets/icons/Document.png')}
          style={{width: 50, height: 50}}
        />
        <Text style={styles.item}>ප්‍රශ්නපත්‍ර පන්තිය</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.startcard}
          onPress={() => {
            start();
          }}>
          {/* <Image
            source={require('../../../assets/icons/User.png')}
            style={{width: 50, height: 50}}
          /> */}
          <Text style={styles.item}>Start Paper</Text>
        </TouchableOpacity>

        <Text style={styles.time}>
          Time Left {new Date(time * 1000).toISOString().substr(11, 8)}
        </Text>

        <TouchableOpacity
          style={styles.startcard}
          onPress={() => {
            stop();
          }}>
          {/* <Image
            source={require('../../../assets/icons/User.png')}
            style={{width: 50, height: 50}}
          /> */}
          <Text style={styles.item}>Submit Paper</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.startcard}
          onPress={async () => {
             
              try {
                await AsyncStorage.removeItem('myData');
                console.log(`Successfully removed item with key "`);
              } catch (error) {
                console.log(`Error removing item with key "`);
              }
            
          }}>
          {/* <Image
            source={require('../../../assets/icons/User.png')}
            style={{width: 50, height: 50}}
          /> */}
          <Text style={styles.item}>Submit Paper</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Paper;

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 20,
  },
  hview: {
    height: 60,
    zIndex: 1,
    backgroundColor: '#42b72a',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  h1: {
    fontFamily: 'Roboto-Black',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: '#1877f2',
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
    marginBottom: 10,
    width: width * 0.9,
  },
  startcard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  time: {
    marginBottom: 10,
    fontSize: 20,
  },
});
