import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
  } from 'react-native';
  import React, {useState} from 'react';
  import {
      GAMBannerAd,
      BannerAdSize,
      TestIds,
      InterstitialAd,
      AdEventType,
    } from 'react-native-google-mobile-ads';
    
    const adUnitId = __DEV__
      ? TestIds.BANNER
      : 'ca-app-pub-9262239337077945/7084873787';
  
  const {height, width} = Dimensions.get('window');

const Discussion = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.card}>
        <Image
          source={
            require('../../assets/icons/Document.png')
            //   uri: 'https://i.ibb.co/411mVGZ/Document.png',
          }
          style={{width: 50, height: 50}}
        />
        <Text style={styles.item}>ප්‍රශ්නපත්‍ර පන්තිය</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.scroll}
      contentContainerStyle={{alignItems: 'center'}}
      >

        <Text style={styles.txt}>
        අපගේ ප්‍රශ්නපත්‍ර පන්තියට සහභාගී වීම සදහා පලමුව ලියාපදිංචි විය යුතුය
        ඒ සදහා පහත අයිතමය ක්ලික් කරන්න
        </Text>

        <TouchableOpacity style={styles.card}
        onPress={
            ()=>{
                navigation.navigate('Register')
            }
        }
        >
        <Image
          source={
            require('../../assets/icons/Bill.png')
            //   uri: 'https://i.ibb.co/411mVGZ/Document.png',
          }
          style={{width: 50, height: 50}}
        />
        <Text style={styles.item}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.txt}>
      දැනටමත් ලියාපදිංචිවී ඇත්නම්
        </Text>
      

      <TouchableOpacity style={styles.card}
       onPress={
        ()=>{
            navigation.navigate('Login')
        }
    }
      >
        <Image
          source={
            require('../../assets/icons/User.png')
            //   uri: 'https://i.ibb.co/411mVGZ/Document.png',
          }
          style={{width: 50, height: 50}}
        />
        <Text style={styles.item}>Login</Text>
      </TouchableOpacity>
      
        {/* <Button title='ontime' 
      onPress={()=>{
         startSession()
      }}
     />
     <Text></Text>

    <Button title='ontime' 
      onPress={()=>{
         endSession()
      }}
     /> */}
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
    </View>
  )
}

export default Discussion

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        paddingTop: 20,
        //backgroundColor: '#fcfcfa',
        flex: 1,
      },
      scroll: {
        width: '100%',
        flexDirection: 'column',
        //backgroundColor: '#fcfcfa',
        //paddingTop: 20,
        //paddingBottom:200
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
    
      txt:{
        width:width*0.9,
        marginBottom:20
      }
})