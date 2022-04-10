import React from 'react';
import {View,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
export default class Auth extends React.Component{
    componentDidMount= async() =>{
        var role;
        role=await AsyncStorage.getItem('auth');
        if(role=='admin'){
            this.props.navigation.navigate('AdminHome')
        }
        else if(role=='student'){
            this.props.navigation.navigate('StudentHome')
        }
        else if(role=='faculty'){
            this.props.navigation.navigate('FacultyHome')
        }
        else{
            this.props.navigation.navigate('SignIn')
        }
        
    }
    render(){
        return(
            <View>
             
            </View>
        );
    }
}