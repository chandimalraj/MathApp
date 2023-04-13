import {
  StyleSheet,
  PermissionsAndroid,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Platform,
  Share,
  
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import {database, firebase} from '@react-native-firebase/database';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import {ReactNativeBlobUtil, Dirs} from 'react-native-blob-util';
import RNFetchBlob from 'rn-fetch-blob';

const {height, width} = Dimensions.get('window');

const PaperView = () => {
  const route = useRoute();
  //const {subjectPart, subject, year, syllabus} = route.params;
  const [loaded, setLoaded] = useState(true);

  // useEffect(() => {

  //     LoadImages(section);
  //  },[]);

  //  const LoadImages = async (section) => {
  //    let reference;

  //    if(path=='pure'){
  //         reference = storage().ref(`Pure Mathematics/${lesson}/${section}`);
  //    }
  //    else{
  //         reference = storage().ref(`Applied Mathematics/${lesson}/${section}`);
  //    }

  //    const list = await reference.listAll();

  //    const imageUrls = await Promise.all(list.items.map(async (itemRef) => {
  //        const url = await itemRef.getDownloadURL();
  //        return { name: itemRef.name, url };
  //      }));

  //    console.log(imageUrls)
  //    setImgs(imageUrls)
  //    setLoaded(true)
  //    return imageUrls;

  //  };

  const fileUrl = 'http://samples.leanpub.com/thereactnativebook-sample.pdf';

  const downloadPDF = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage',
        },
      );
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage Permission Granted');
        download();
      } else {
        console.log('Storage Permission not Granted');
      }
    } catch (error) {
      console.error(error);
    }

    
    };
   


  const download = () => {
    const {config, fs} = RNFetchBlob;
    console.log('awa');
    let options = {
      fileCache: true,
      appendExt: 'pdf',
      //path: `${dirs.DocumentDir}/${fileName}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: "fileName",
        description: 'File downloaded by download manager.',
        mime: 'application/pdf',
      },
    };
   

    config(options)
      .fetch('GET', fileUrl)
      .then(res => {
        console.log(JSON.stringify(res));

      });
    
    }

  return (
    <View style={styles.container}>
      {loaded == false && (
        <View style={{justifyContent: 'center', height: height}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {loaded == true && (
        <Pdf
          source={{
            uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
            cache: true,
          }}
          style={{flex: 1, width: width, height: height}}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          trustAllCerts={false}
        />
      )}

      <View style={styles.banner}>
        {/* <GAMBannerAd
          unitId={adUnitId}
          sizes={[BannerAdSize.BANNER]}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        /> */}
        <Button title="download" onPress={downloadPDF} />
      </View>
    </View>
  );
};

export default PaperView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',

    // paddingBottom: 50,
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
});
