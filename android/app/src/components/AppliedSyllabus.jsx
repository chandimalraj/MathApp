import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import React from 'react';

export default function AppliedSyllabus({navigation}) {
  const modules = [
    {
      id: 1,
      name: 'පාඩම 1',
    },
    {
      id: 2,
      name: 'පාඩම 2',
    },
    {
      id: 3,
      name: 'පාඩම 3',
    },
    {
      id: 4,
      name: 'පාඩම 4',
    },
    {
      id: 5,
      name: 'පාඩම 5',
    },
    {
      id: 6,
      name: 'පාඩම 6',
    },
    {
      id: 7,
      name: 'පාඩම 7',
    },
    {
      id: 8,
      name: 'පාඩම 8',
    },
    {
      id: 9,
      name: 'පාඩම 9',
    },
    {
      id: 10,
      name: 'පාඩම 10',
    },
    {
      id: 11,
      name: 'පාඩම 11',
    },
    {
      id: 12,
      name: 'පාඩම 12',
    },
    {
      id: 13,
      name: 'පාඩම 13',
    },
    {
      id: 14,
      name: 'පාඩම 1',
    },
    {
      id: 15,
      name: 'පාඩම 2',
    },
    {
      id: 16,
      name: 'පාඩම 3',
    },
    {
      id: 17,
      name: 'පාඩම 4',
    },
    {
      id: 18,
      name: 'පාඩම 5',
    },
    {
      id: 19,
      name: 'පාඩම 6',
    },
    {
      id: 20,
      name: 'පාඩම 7',
    },
    {
      id: 21,
      name: 'පාඩම 8',
    },
    {
      id: 22,
      name: 'පාඩම 9',
    },
    {
      id: 23,
      name: 'පාඩම 10',
    },
    {
      id: 24,
      name: 'පාඩම 11',
    },
    {
      id: 25,
      name: 'පාඩම 12',
    },
    {
      id: 26,
      name: 'පාඩම 13',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={styles.hview}>
          <Text style={styles.h1}>ව්‍යවහාරික ගණිතය</Text>
          <Text style={styles.h2}>විශය නිර්දේශය</Text>
        </View>

        {modules.map((item, index) => {
          return (
            <View style={styles.textcontainer} key={item.id}>
              <Text style={styles.lesson}>
                {item.id}. {'  '} {'වර්ගජ සමීකරණ'}
              </Text>
              <View style={styles.btncontainer}>
                <Button
                  title="වැඩිදුර ..."
                  color={'#42b72a'}
                  onPress={() => {
                    navigation.navigate('Lesson', {lesson: item.name});
                  }}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor:''
    flex: 1,
    flexDirection: 'column',
    //flexDirection :'row'
    //paddingTop: StatusBar.currentHeight,
  },
  textcontainer: {
    flexDirection: 'row',
  },
  hview: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#eeeeee',
  },
  h1: {
    fontFamily: 'Noto-Sans-Sinhala-Bold',
    fontSize: 30,
    //fontWeight: 'bold',
    color: '#1877f2',
    textAlign: 'center',
    marginBottom: 2,
    textShadowColor: '#1877f2',
    marginTop: 20,
  },
  h2: {
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    //fontWeight: 'bold',
    color: '#1877f2',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: '#1877f2',
    marginTop: 0,
  },
  lesson: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 20,
    // marginTop:10,
    color: '#1877f2',
    fontFamily: 'Noto-Sans-Sinhala-Bold',
    fontSize: 15,
    fontWeight: 600,
    // borderBottomColor : '#1877f2',
    // borderWidth :1,
    // borderTopColor : '#1877f2',
    // borderTopWidth :0,
    width: '70%',
  },
  lessonPressed: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 20,
    // marginTop:10,
    color: '#1877f2',
    fontFamily: 'Noto-Sans-Sinhala-Bold',
    fontSize: 15,
    fontWeight: 900,
    borderBottomColor: '#1877f2',
    borderWidth: 1,
    borderTopColor: '#1877f2',
    borderTopWidth: 0,
  },
  btncontainer: {
    //backgroundColor : "#42b72a",
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
});
