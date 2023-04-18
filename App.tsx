/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Login from './android/app/src/components/Login/Login';
import Register from './android/app/src/components/Register/Register';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ComMath from './android/app/src/components/ComMaths/ComMath';
import Lesson from './android/app/src/components/Lesson/Lesson';
import QuestionContainer from './android/app/src/components/QuestionContainer';
import PureLessons from './android/app/src/components/Pure/PureLessons';
import AppliedLessons from './android/app/src/components/Applied/AppliedLessons';
import DailyQuestions from './android/app/src/components/DailyQuestions';
import Home from './android/app/src/components/Home/Home';
import Section from './android/app/src/components/Section/Section';
import PastPapers from './android/app/src/components/PastPapers/PastPapersYears';
import Syllabus from './android/app/src/components/PastPapers/Syllabus/Syllabus';
import TutionClasses from './android/app/src/components/Tution/TutionClasses';
import PaperClass from './android/app/src/components/PaperClass/PaperClass';
import Discussion from './android/app/src/components/Discussion/Discussion';
import AlPastpapers from './android/app/src/components/PastPapers/AL/AlPastpapers';
import Years from './android/app/src/components/PastPapers/AL/Years';
import AlPaper from './android/app/src/components/PastPapers/Paper/AlPaper';
import PaperView from './android/app/src/components/PastPapers/PaperView/PaperView';
import LoginRegister from './android/app/src/components/LoginRegister/LoginReg';
import Paper from './android/app/src/components/PaperClass/Paper/Paper';
import NetInfo from '@react-native-community/netinfo';


const Stack = createNativeStackNavigator();

const {height, width} = Dimensions.get('window');
const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [intervalId, setIntervalId] = useState(0)

  useEffect(() => {
  const id =  setInterval(()=>{
      NetInfo.fetch().then(state => {
        //
        console.log(state.isConnected+"asdasds");
        if (state.isConnected == true) {
          setIsConnected(true);
          clearInterval(id)
        }
  
  
      });
    },1000)

   
    
  }, []);

  
  if (isConnected) {
    return (
      //<Login></Login>
      //<Register></Register>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
          name="Entry"
          component={Entry}
          options={{headerShown: false}}
        /> */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ComMath"
            component={ComMath}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PureMaths"
            component={PureLessons}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{title: 'Register'}}
          />

          <Stack.Screen
            name="AppliedMaths"
            component={AppliedLessons}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Lesson"
            component={Lesson}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Qcontainer"
            component={QuestionContainer}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="DailyQ"
            component={DailyQuestions}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Section"
            component={Section}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PastPapers"
            component={PastPapers}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Syllabus"
            component={Syllabus}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Tution"
            component={TutionClasses}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaperClass"
            component={PaperClass}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Discussion"
            component={Discussion}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ALpastpapers"
            component={AlPastpapers}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Years"
            component={Years}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="AlPaper"
            component={AlPaper}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaperView"
            component={PaperView}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LoginRegister"
            component={LoginRegister}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Paper"
            component={Paper}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <View style={{justifyContent: 'center', height: height}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
  }
};

export default App;
