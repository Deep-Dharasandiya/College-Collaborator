import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class Attendance extends React.Component{
    render(){
        return(
        <View style={styles.container}>
       <StatusBar  backgroundColor = "#3498db"  barStyle = 'light-content' hidden = {false} translucent = {true}/> 
        <View style={styles.top}>



        <View style={styles.top_icon}>
        <TouchableOpacity 
                 onPress={()=>this.props.navigation.openDrawer()}
                >
            <Icon
            name="bars"
            color="#fff"
            size={25}
            />
            </TouchableOpacity>
            <Text style={styles.top_text}>Attendance</Text>
            <Icon
            name="power-off"
            color="#fff"
            size={25}
            />
        </View>



        </View>

        <Animatable.View
        animation="fadeInUpBig"
        style={styles.bottom}
        >


        <ScrollView showsVerticalScrollIndicator={false} >


            <View style={styles.distance}>

            <TouchableOpacity 
                style={styles.card}
                   onPress={()=>this.props.navigation.navigate('ShowLectureForAttendance')}
                >
            <View >
                <Icon
                name="address-card"
                color="#fff"
                size={35}
                />
            </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.card}
                onPress={()=>this.props.navigation.navigate('ShowLectureForShowAttendance')}
                >
            <View style={styles.card}>
                <Icon
                name="clipboard-list"
                color="#fff"
                size={35}
                />
            </View>
            </TouchableOpacity>
            </View>

            <View style={styles.maintitle}>

            <Text style={styles.card_title1}>Take</Text>
            <Text style={styles.card_title2}>Show</Text>
            </View>
          
            {/* <View style={styles.distance}>

            <View style={styles.card}>
                <Icon
                name="school"
                color="#fff"
                size={50}
                />
            </View>


            </View>
            <View style={styles.maintitle}>

            <Text style={styles.card_title5}>Details</Text>
            
            </View> */}


        </ScrollView>
        </Animatable.View>

        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    marginTop:StatusBar.currentHeight,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff'
  },
  top: {
    flex: 3,
    height: '10%',
    width: '100%',
    backgroundColor: '#3498db',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  top_icon:
  {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  top_text: {
    fontSize: 25,
    color: '#fff'
  },
  view_top_info: {
    color: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  text_top_info: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottom: {
    height: '90%',
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

  },
  card: {
    height: 120,
    width: '35%',
    borderRadius: 100,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center'
  },
  distance: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  maintitle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  card_title1: {
    color: '#000',
    fontSize: 20,
    paddingVertical: 5,
    paddingLeft: 16
  },
  card_title2: {
    color: '#000',
    fontSize: 20,
    paddingVertical: 5,
    paddingRight: 20
  },
  card_title3: {
    color: '#000',
    fontSize: 20,
    paddingVertical: 5,
    paddingRight: -2
  },
  card_title4: {
    color: '#000',
    fontSize: 20,
    paddingVertical: 5,
    paddingRight: 32
  },
  card_title5: {
    color: '#000',
    fontSize: 20,
    paddingVertical: 5,
    paddingLeft: 16
  },
  card_title6: {
    color: '#000',
    fontSize: 20,
    paddingVertical: 5,
    paddingRight: 25
  },


});