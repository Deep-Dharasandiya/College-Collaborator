// import React from 'react';
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity
// } from 'react-native';

// import * as Animatable from 'react-native-animatable';
// import Snackbar from 'react-native-snackbar';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// export default class FacultyHome extends React.Component{
//     async removeItemValue(key1,key2) {
//         try {
//             await AsyncStorage.removeItem(key1);
//             await AsyncStorage.removeItem(key2);
//             console.log("sad")
           
//         }
//         catch(exception) {
//             return false;
//         }
// }
//     render(){
//         return(
//             <View>
//                 <TouchableOpacity 
//                  onPress={()=>this.removeItemValue('auth','Details')}
//                 >
//                 <Text style={{justifyContent:'center',paddingTop:300,textAlign:'center',fontWeight:'bold',color:'#3498db',fontSize:15}}>Logout</Text>

//                 </TouchableOpacity>
                 
//                 <Text style={{justifyContent:'center',paddingTop:300,textAlign:'center',fontWeight:'bold',color:'#3498db',fontSize:15}}> Faculty Home</Text>

//             </View>
//         );
//     }
// }

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { View, TouchableOpacity, Text ,SafeAreaView,} from 'react-native';
import StudentFeatuers from './StudentFeatuers';
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();


export default class StudentHome extends React.Component{
  async removeItemValue(key1,key2) {
          try {
              await AsyncStorage.removeItem(key1);
              await AsyncStorage.removeItem(key2);
              this.props.navigation.navigate('SignIn');
          }
          catch(exception) {
              return false;
          }
  }
  render(){
      return (
          <Drawer.Navigator  drawerContent={(props) => {
          return (
              <SafeAreaView style={{ flex: 1 },{paddingVertical:50}} >
                
                  <View
                  style={{
                      paddingVertical:10,
                      alignItems:'center',
                      justifyContent:'center',
                  }}
                  >
                  {/* <Image
                      source={require("./appicon.png")}
                      width={50}
                      height={50}
                  /> */}
                  </View>
                  
                  <TouchableOpacity
                  onPress={()=>this.removeItemValue('auth','Details')}>
                  <View style={{alignItems:'center'}}>
                  <Text style={{justifyContent:'center',textAlign:'center',color:'#3498db',fontWeight:'bold',fontSize:15}}>Logout</Text>
                  </View>
                  </TouchableOpacity>
              </SafeAreaView>
          );
        }}
        >
          <Drawer.Screen name="Home" component={studenthome} options={{headerShown:false}} />
          
      </Drawer.Navigator>
       
      );
  }
  }


const Tab = createMaterialTopTabNavigator();
class studenthome extends React.Component{
  componentDidMount(){
    SplashScreen.hide();
 }
  render(){
    return(
      <Tab.Navigator tabBarOptions={{ showIcon: true }} tabBarPosition={'bottom'} tabBar={props => <MyTabBar {...props} />}  >
        <Tab.Screen name="Home" component={StudentFeatuers} />
        
      </Tab.Navigator>
    );
  }
}


function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: "#3498db", height: 60, borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: 'center', paddingLeft: 65 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#fff' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}