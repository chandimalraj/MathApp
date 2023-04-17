import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';

const Paper = ({navigation}) => {
    
  const route = useRoute();
  const {userInfo} = route.params;
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState();

  let x = time;

  useEffect(() => {
    console.log(userInfo);
  }, []);

  const start = () => {
    const intervalId = setInterval(() => {
      x = x + 1;
      setTime(x);
    }, 1000);

    setIntervalId(intervalId);
  };

  const stop = () => {
    clearInterval(intervalId);
  };

  return (
    <View style={styles.body}>
      <View style={styles.hview}>
        <Text style={styles.h1}>Paper Class</Text>
      </View>
      <Text>{new Date(time * 1000).toISOString().substr(11, 8)}</Text>
      <Text></Text>
      <Button title="start" onPress={start} />
      <Text></Text>
      <Button title="stop" onPress={stop} />
    </View>
  );
};

export default Paper;

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    flex: 1,
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
});
