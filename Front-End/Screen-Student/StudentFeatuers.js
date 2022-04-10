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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class StudentFeatures extends React.Component{
   
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
            name="menu"
            color="#fff"
            size={30}
            />
            </TouchableOpacity>
            <Text style={styles.top_text}>Welcome</Text>
            <Icon
            name="person"
            color="#fff"
            size={30}
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
                //  onPress={()=>this.props.navigation.navigate('Register')}
                >
            <View >
                <Icon
                name="how-to-reg"
                color="#fff"
                size={50}
                />
            </View>
            </TouchableOpacity>

            <View style={styles.card}>
                <Icon
                name="trophy"
                color="#fff"
                size={50}
                />
            </View>

            </View>

            <View style={styles.maintitle}>

            <Text style={styles.card_title1}>Register</Text>
            <Text style={styles.card_title2}>Result</Text>
            </View>
            <View style={styles.distance}>


            <View style={styles.card}>
                <Icon
                name="person"
                color="#fff"
                size={50}
                />
            </View>
            <TouchableOpacity 
                 style={styles.card}
                >
            <View>
                <Icon
                name="person"
                color="#fff"
                size={50}
                />
            </View>
            </TouchableOpacity>

            </View>

            <View style={styles.maintitle}>

            <Text style={styles.card_title3}>Examination</Text>
            <Text style={styles.card_title4}>Classes</Text>
            </View>
            <View style={styles.distance}>

            <View style={styles.card}>
                <Icon
                name="school"
                color="#fff"
                size={50}
                />
            </View>

            <View style={styles.card}>
                <Icon
                name="calendar"
                color="#fff"
                size={50}
                />
            </View>
            </View>
            <View style={styles.maintitle}>

            <Text style={styles.card_title5}>Academic</Text>
            <Text style={styles.card_title6}>Events</Text>
            </View>
            <View style={styles.distance}>
            <TouchableOpacity 
                 style={styles.card}
                //  onPress={()=>this.props.navigation.navigate('Details')}
                >
              <View >
                  <Icon
                  name="school"
                  color="#fff"
                  size={50}
                  />
              </View>
            </TouchableOpacity>
            <View style={styles.card}>
                <Icon
                name="calendar"
                color="#fff"
                size={50}
                />
            </View>
            </View>
            <View style={styles.maintitle}>

            <Text style={styles.card_title5}>Details</Text>
            <Text style={styles.card_title6}>Fees</Text>
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
    height: 140,
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