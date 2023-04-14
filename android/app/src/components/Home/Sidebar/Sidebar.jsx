import { StyleSheet, Text, View,Dimensions ,Animated, Image ,TouchableOpacity } from 'react-native'
import React ,{useState}from 'react'
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';



const {height, width} = Dimensions.get('window');

const Sidebar = () => {

  const [menuAnimation] = useState(new Animated.Value(-250));

  const [user , setUser] = useState("user")

  useEffect(() => {
    findUser()
  }, []);

  const findUser = async () => {
    
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      console.log(isSignedIn)
      if (isSignedIn) {
        const userInfo = await GoogleSignin.signInSilently();
        setUser(userInfo.user.name)
        console.log(userInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Animated.View style={[styles.menuContainer, {left: menuAnimation}]}>
    <View style={styles.sidebarHeaderContainer}>
      <Image
        source={
          require('../../../assets/icons/User.png')
          
        }
        style={{width: 80, height: 80}}
      />
      <Text style={styles.sidebarHeader}>{user}</Text>
    </View>

    <TouchableOpacity style={styles.sidebarItemContainer}>
      <Image
        source={
          require('../../../assets/icons/Gear.png')
          
        }
        style={{width: 30, height: 30}}
      />
      <Text style={styles.sidebarItem}>Settings</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.sidebarItemContainer}>
      <Image
        source={
          require('../../../assets/icons/Share.png')
          
        }
        style={{width: 30, height: 30}}
      />
      <Text style={styles.sidebarItem}>Share App</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.sidebarItemContainer}>
      <Image
        source={
          require('../../../assets/icons/Comments.png')
          
        }
        style={{width: 30, height: 30}}
      />
      <Text style={styles.sidebarItem}>Feedback</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.sidebarItemContainer}>
      <Image
        source={
          require('../../../assets/icons/Popular.png')
          
        }
        style={{width: 30, height: 30}}
      />
      <Text style={styles.sidebarItem}>Rate App</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.sidebarItemContainer}>
      <Image
        source={
          require('../../../assets/icons/Plane.png')
          
        }
        style={{width: 30, height: 30}}
      />
      <Text style={styles.sidebarItem}>Conatct Us</Text>
    </TouchableOpacity>

    
  </Animated.View>
  )
}

export default Sidebar

const styles = StyleSheet.create({

    menuContainer: {
        position: 'absolute',
        top: 0,
        left: -250,
        width: 250,
        height: height,
        backgroundColor: '#fff',
        //padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 2, height: 0},
        shadowRadius: 2,
        elevation: 3,
        //zIndex: 1,
      },

    
  sidebarHeaderContainer: {
    width: '100%',
    height: height * 0.2,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarHeader: {
    fontSize: 15,
    fontWeight: 800,
  },
  sidebarItem: {
    fontWeight: 600,
    marginLeft: 30,
    fontSize: 15,
  },
  sidebarItemContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 30,
    alignItems: 'center',
  },
  slide:{
    width:width,
    justifyContent:'center',
    alignItems:'center'
  }
})