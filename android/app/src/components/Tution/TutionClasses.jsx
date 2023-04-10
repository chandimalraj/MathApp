import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import SendIntentAndroid from 'react-native-send-intent';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import RadioGroup from 'react-native-radio-buttons-group';

const {height, width} = Dimensions.get('window');

const TutionClasses = () => {

  const [selectedValue, setSelectedValue] = useState(null);
  const [showList, setShowList] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [radioButtons, setRadioButtons] = useState([
    {
        id: '0', // acts as primary key, should be unique and non-empty string
        label: 'All',
        value: 'option1',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item,
        selected:true
    },
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Gampaha',
        value: 'option1',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },
    {
        id: '2',
        label: 'Colombo',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },
    {
        id: '3',
        label: 'Kegalle',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },
    {
        id: '4',
        label: 'Kurunegala',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },
    {
        id: '5',
        label: 'Kandy',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '6',
        label: 'Kalutara',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '7',
        label: 'Matale',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '8',
        label: 'Nuwara Eliya',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '9',
        label: 'Galle',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '10',
        label: 'Matara',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '11',
        label: 'Hambantota',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '12',
        label: 'Jaffna',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '13',
        label: 'Kilinochchi',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '14',
        label: 'Mannar',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '15',
        label: 'Vavuniya',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '16',
        label: 'Mullaitivu',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '17',
        label: 'Batticaloa',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '18',
        label: 'Ampara',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '19',
        label: 'Trincomalee',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '20',
        label: 'Puttalam',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '21',
        label: 'Anuradhapura',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '22',
        label: 'Polonnaruwa',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '23',
        label: 'Badulla',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },{
        id: '24',
        label: 'Monaragala',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    },
    {
        id: '25',
        label: 'Ratnapura',
        value: 'option2',
        onPress : ()=>{
            console.log("option 1")
        },
        containerStyle: styles.modalcard,
        labelStyle: styles.item
    }
]);

  const dropdownItems = [
    {label: 'Item 1', value: 'item1'},
    {label: 'Item 2', value: 'item2'},
    {label: 'Item 3', value: 'item3'},
  ];
  const districts = [
    'Gampaha' , 'Colombo' , 'Kegalle' ,'Kurunegala' ,'Kandy' , 'Kalutara','Matale','Nuwara Eliya','Galle','Matara','Hambantota',
    'Jaffna','Kilinochchi','Mannar', 'Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee','Puttalam','Anuradhapura','Polonnaruwa',
    'Badulla','Moneragala','Ratnapura'
  ]

  const toggleList = () => {
    setShowList(!showList);
  };

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    console.log(radioButtonsArray)
}

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setIsModalVisible(true);
        }}>
        <Image
          source={
            require('../../assets/icons/Right.png')
            
          }
          style={{width: 20, height: 20}}
        />

        <Text style={styles.itemAd}>Filter Ads By District</Text>
      </TouchableOpacity>

      <ScrollView
       style={styles.scroll}
       contentContainerStyle={{alignItems: 'center'}}
       showsVerticalScrollIndicator={false}
       >

<TouchableOpacity
        style={styles.adcard}
        onPress={() => {
         
        }}>
        <Image
          source={
            require('../../assets/icons/Sale.png')
            
          }
          style={{width: 50, height: 50}}
        />

        <Text style={styles.item}>
          ඔබගේ දැන්වීම් පලකරගැනීමට අප හා සම්බන්ධ වන්න
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.adcard}
        onPress={() => {
          
        }}>
        <Image
          source={
            require('../../assets/icons/Sale.png')
            
          }
          style={{width: 50, height: 50}}
        />

        <Text style={styles.item}>
          ඔබගේ දැන්වීම් පලකරගැනීමට අප හා සම්බන්ධ වන්න
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.adcard}
        onPress={() => {
          
        }}>
        <Image
          source={
            require('../../assets/icons/Sale.png')
            
          }
          style={{width: 50, height: 50}}
        />

        <Text style={styles.item}>
          ඔබගේ දැන්වීම් පලකරගැනීමට අප හා සම්බන්ධ වන්න
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.adcard}
        onPress={() => {
         
        }}>
        <Image
          source={
            require('../../assets/icons/Sale.png')
            
          }
          style={{width: 50, height: 50}}
        />

        <Text style={styles.item}>
          ඔබගේ දැන්වීම් පලකරගැනීමට අප හා සම්බන්ධ වන්න
        </Text>
      </TouchableOpacity>
      

      </ScrollView>
      

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>


          <ScrollView style={styles.modalscroll}
           contentContainerStyle={{alignItems: 'center'}}
           showsVerticalScrollIndicator={false}
          >

        <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
            containerStyle={styles.radiogroup}
        />

          </ScrollView>
          
        </View>
      </Modal>

      <View style={styles.banner}>
      <TouchableOpacity
        style={styles.bannercard}
        onPress={() => {
          SendIntentAndroid.openAppWithUri(
            'whatsapp://send?phone=+94778407137&text=Hello%2C%20World!',
          );
        }}>
        <Image
          source={
            require('../../assets/icons/WhatsApp1.png')
            
          }
          style={{width: 50, height: 50}}
        />

        <Text style={styles.item}>
          ඔබගේ දැන්වීම් පලකරගැනීමට අප හා සම්බන්ධ වන්න
        </Text>
      </TouchableOpacity>
      </View>

    </View>
  );
};

export default TutionClasses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#fcfcfa',
    paddingBottom:80
  },
  scroll: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fcfcfa',
    paddingTop: 20,
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
    paddingRight: 20,
  },
  item: {
    paddingLeft: 30,
    fontWeight: '700',
    width: '90%',
   // backgroundColor:'#eb4034'
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    alignItems: 'center',
  },
  itemAd: {
    paddingLeft: 30,
    fontWeight: '700',
    width: '90%',
    textAlign: 'center',
  },
  modalContainer: {
    //width:200,
    //height:200,
    backgroundColor: '#faf8f7',
    padding: 10,
    alignItems: 'center',
    height:height*0.8,
    borderRadius: 10,
    paddingBottom:0,
    //backgroundColor:'#eb4034'

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
  modalcard: {
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
    marginBottom: 5,
    
    //paddingRight: 20,
  },
  modalscroll:{
    //width:800,
    //backgroundColor:'#eb4034',
    width:'90%',
    //paddingHorizontal:2
  },
  radiogroup:{
    width:'100%',
    //width:400,
    //backgroundColor:'#eb4034'
  },
  adcard: {
    flexDirection: 'row',
    //alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
    marginBottom: 5,
    width: width * 0.9,
    height: width*9/16,
    paddingRight: 20,
  },
  bannercard:{
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
    //marginBottom: 20,
    width: width * 0.9,
    paddingRight: 20,
  },
});
