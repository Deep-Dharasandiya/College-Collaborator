import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
export default class RegisterSubject extends React.Component{
    state = {
        loader:false,
        subject_name:'',
        subject_code:'',
        Details:'',
    
    }
    componentDidMount= async() =>{
        this.setState({ Details:JSON.parse(await AsyncStorage.getItem('Details'))});
    }
    handleSubject_name = (text) => {
        this.setState({ subject_name: text })
    }
    handleSubject_Code = (text) => {
        this.setState({ subject_code: text })
    }
    register_subject=async()=>{
    if(this.state.subject_code !='' && this.state.subject_name !=''){
        this.setState({ loader:true });
        await fetch('https://collage-collaborator.herokuapp.com/SubjectRegister', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                collage_id:(this.state.Details)[0]['_id'],
               subject_name:this.state.subject_name,
               subject_code:this.state.subject_code,
            })  
        }).then((resp)=>resp.json())
        .then((response)=>{
            console.log(response)
            if(response=='1'){
                this.setState({ loader:false });
                Snackbar.show({text: 'Subject Registered...',duration: Snackbar.LENGTH_SHORT,});
                this.props.navigation.navigate('Register')
            }
            else if(response=='2'){
              this.setState({ loader:false });
                Alert.alert("Warning!!!","Subject all ready exist ...", [{ text: "OK"}],);
            }
            else{
                Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
                 this.props.navigation.navigate('Register')
            }
        }) 
    }else{
        Alert.alert("Warning!!!","Please Enter All The Details...", [{ text: "OK"}],);
    }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar  backgroundColor = "#3498db"  barStyle = 'light-content' hidden = {false} translucent = {true}/> 
               <Text style={styles.top_text}>Register</Text>
                <Text style={styles.top_subtext}>Subject...</Text>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >  
                <ScrollView>
                        <Text style={styles.text_footer}> Subject Name </Text>
                        <View style={styles.action}>
                            <Icon name="person" color="#05375a" size={20}/>
                            <TextInput placeholder="Name" 
                                placeholderTextColor="#a6a6a6" 
                                style={styles.textInput} 
                                onChangeText={this.handleSubject_name}
                                autoCapitalize="none"
                            />
                        </View>
                        <Text style={[styles.text_footer, {marginTop: 10}]}> Subject Code </Text>
                        <View style={styles.action}>
                            <Icon name="person" color="#05375a" size={20}/>
                            <TextInput placeholder="Code" 
                                placeholderTextColor="#a6a6a6" 
                                style={styles.textInput} 
                                onChangeText={this.handleSubject_Code }
                                autoCapitalize="none"
                            />
                        </View>
                    
                    {this.state.loader==false ?
                        <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => this.register_subject()}
                        >
                            <LinearGradient
                                colors={['#3498db', '#A6BDF5']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]} >Register</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        </View>
                        :
                        
                        <View style={styles.button}>
                            <Text>Loader</Text>
                        </View>
                    }
                     
                </ScrollView>
            </Animatable.View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight,
        backgroundColor: '#3498db',
        paddingTop:40
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#000000',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    logIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#383838'
    },
    lottie: {
        width: 100,
        height: 100
      },
      top_text: {
        fontSize: 30,
        fontWeight:'bold',
        color: 'white',
        paddingLeft:20
    },
    top_subtext: {
        fontSize: 20,
        paddingBottom:80,
        paddingLeft:20,
        color: 'white',
    },
   profile: {
        fontSize: 15,
        color: '#3498db',
    },
    circle: {
        width: 150,
        height: 150,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 150 / 2,
        backgroundColor: "white",
      },
      image: {
        flex: 1,
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        resizeMode:"contain"
      },
});