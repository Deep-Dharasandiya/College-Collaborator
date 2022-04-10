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
  ViewBase,
  StatusBar,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage'
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import DropDownPicker from 'react-native-dropdown-picker';
export default class RegisterStudents extends React.Component{
    state = {
        loader:false,
        student_firstname:'',
        student_middlename:'',
        student_lastname:'',
        student_en_no:'',
        student_email:'',
        co_no:'',
        local_add:'',
        city:'',
        state:'',
        pin:'',
        path:'',
        firebaseurl:'',
        filename:'',
        Details:'',
        admission_year:'',
    }
    componentDidMount= async() =>{
        this.setState({ Details:JSON.parse(await AsyncStorage.getItem('Details'))});
    }
    handleStudent_firstname = (text) => {
        this.setState({ student_firstname: text })
    }
    handleStudent_middlename = (text) => {
        this.setState({ student_middlename: text })
    }
    handleStudent_lastname = (text) => {
        this.setState({ student_lastname: text })
    }
    handleStudent_En_No = (text) => {
        this.setState({ student_en_no: text })
    }
    handleStudent_Email = (text) => {
        this.setState({ student_email: text })
    }
    handleCO_NO = (text) => {
        this.setState({ co_no: text })
    }
    handleLocal_add = (text) => {
        this.setState({ local_add: text })
    }
    handleCity = (text) => {
        this.setState({ city: text })
    }
    handleState = (text) => {
        this.setState({ state: text })
    }
    handlePin = (text) => {
        this.setState({ pin: text })
    }
    register_student=async()=>{
          await fetch('https://collage-collaborator.herokuapp.com/StudentRegister', {  
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body:JSON.stringify({
                  collage_id:(this.state.Details)[0]['_id'],
                  student_firstname:this.state.student_firstname,
                  student_middlename:this.state.student_middlename,
                  student_lastname:this.state.student_lastname,
                  student_en_no:this.state.student_en_no,
                  student_email:this.state.student_email,
                  password:this.state.co_no,
                  co_no:this.state.co_no,
                  admission_year:this.state.admission_year,
                  local_add:this.state.local_add,
                  city:this.state.city,
                  state:this.state.state,
                  pin:this.state.pin,
                  profile:this.state.firebaseurl,
                  role:"student",
              })  
          }).then((resp)=>resp.json())
          .then((response)=>{
              console.log(response)
              if(response=='1'){
                  this.setState({ loader:false });
                  Snackbar.show({text: 'Registered Student...',duration: Snackbar.LENGTH_SHORT,});
                  this.props.navigation.navigate('Register')
              }
              else if(response=='2'){
                this.setState({ loader:false });
                  Alert.alert("Warning!!!","Email Already Exist...", [{ text: "OK"}],);
                  this. deleteimage();
              }
              else{
                  Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
                  this. deleteimage();
                  this.props.navigation.navigate('Register')
              }
          }) 
      }
      async SelectFile(){
        var Imagepicker='';
         Imagepicker=ImagePicker.openPicker({
            width: 500,
            height: 500,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            avoidEmptySpaceAroundImage: true,
            cropperCircleOverlay: true,
            cropping: true
          }).then(image => {
            
           
            ImgToBase64.getBase64String(image.path)
            .then(base64String => this.setState({base64:{base64String}}))
            .catch(err => doSomethingWith(err));
            
            this.setState({path:image.path });
          }).catch(function(error) {
            Alert.alert("Warning!!!","Image not pikked...", [{ text: "OK"}],);
            });
        
    }
    async deleteimage(){
        const storage1 = firebase.storage();
            storage1.ref((this.state.filename)).delete();
    }
    async uploadfile(){
        if(this.state.student_name !='' && this.state.student_en_no !='' && this.state.student_email !='' && this.state.co_no !='' && this.state.local_add !='' && this.state.city !='' && this.state.state !='' && this.state.pin !='' && this.state.admission_year !=''){
            if(this.state.password==this.state.repassword){
            this.setState({loader:true })
        const uri = this.state.path;
        var fname=this.state.student_email+new Date().toLocaleString()+'S_profile';
        this.setState({filename:fname})
          try {
            await storage().ref(fname).putFile(uri);
       
            const storage1 = firebase.storage();
            storage1.ref(fname).getDownloadURL()
            .then((url) => {
                this.setState({firebaseurl:url})
                this.register_student();
            })
            
          } catch (e) {
            Alert.alert("Warning!!!","Problem occur in uploading image...", [{ text: "OK"}],);
          }
        } 
        else{
            Alert.alert("Warning!!!","Password must be Same...", [{ text: "OK"}],);
        }  
      }else{
        Alert.alert("Warning!!!","Please Enter All The Details...", [{ text: "OK"}],);
      }
         
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar  backgroundColor = "#3498db"  barStyle = 'light-content' hidden = {false} translucent = {true}/> 
               <Text style={styles.top_text}>Register</Text>
                <Text style={styles.top_subtext}>Student...</Text>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >  
                <ScrollView>
                        <Text style={styles.text_footer}> Student Name </Text>
                        <View style={styles.action}>
                            <Icon name="person" color="#05375a" size={20}/>
                            <TextInput placeholder="First Name" 
                                placeholderTextColor="#a6a6a6" 
                                style={styles.textInput} 
                                onChangeText={this.handleStudent_firstname}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.action}>
                            <Icon name="person" color="#05375a" size={20}/>
                            <TextInput placeholder="Middle Name" 
                                placeholderTextColor="#a6a6a6" 
                                style={styles.textInput} 
                                onChangeText={this.handleStudent_middlename}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.action}>
                            <Icon name="person" color="#05375a" size={20}/>
                            <TextInput placeholder="Last Name" 
                                placeholderTextColor="#a6a6a6" 
                                style={styles.textInput} 
                                onChangeText={this.handleStudent_lastname}
                                autoCapitalize="none"
                            />
                        </View>
                        <Text style={[styles.text_footer, {marginTop: 10}]}> Student En. No. </Text>
                        <View style={styles.action}>
                            <Icon name="person" color="#05375a" size={20}/>
                            <TextInput placeholder="No." 
                                placeholderTextColor="#a6a6a6" 
                                style={styles.textInput} 
                                onChangeText={this.handleStudent_En_No}
                                autoCapitalize="none"
                            />
                        </View>
                        <Text style={[styles.text_footer, {marginTop: 10}]}> Student Email </Text>
                        <View style={styles.action}>
                            <Icon name="email" color="#05375a" size={20}/>
                            <TextInput placeholder="Email" 
                                placeholderTextColor="#a6a6a6" 
                                style={styles.textInput} 
                                onChangeText={this.handleStudent_Email}
                                autoCapitalize="none"
                            />
                        </View>
                        <Text style={[styles.text_footer, {marginTop: 10}]}> Student Contact </Text>
                        <View style={styles.action}>
                            <Icon name="email" color="#05375a" size={20}/>
                            <TextInput placeholder="Co. No." 
                                keyboardType = 'numeric'
                                maxLength={10}
                                placeholderTextColor="#a6a6a6" 
                                style={styles.textInput} 
                                onChangeText={this.handleCO_NO}
                                autoCapitalize="none"
                            />
                        </View>
                        <Text style={[styles.text_footer, {marginTop: 10,marginBottom:20}]}> Admission Year </Text>
                        <DropDownPicker
                            placeholder="Select"
                            items={[
                                { label: '2021', value: '2021' },
                                { label: '2020', value: '2020' },
                                { label: '2019', value: '2019' },
                                { label: '2018', value: '2018' },
                                { label: '2017', value: '2017' },
                                { label: '2016', value: '2016' },
                                { label: '2015', value: '2015' },

                            ]}
                            containerStyle={{ height: 30 }}
                            style={styles.textInput}
                            itemStyle={{
                                justifyContent: 'flex-start',
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={item => this.setState({
                                admission_year: item.value
                            })}
                        />
                        <Text style={[styles.text_footer, {marginTop: 10}]}>Student Address</Text>
                        <View style={styles.action}>
                            <Icon name="email" color="#05375a" size={20}/>
                            <TextInput placeholder="Local Address" 
                                placeholderTextColor="#a6a6a6" 
                                style={styles.textInput} 
                                onChangeText={this.handleLocal_add}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.action}>
                            <Icon name="email" color="#05375a" size={20}/>
                            <TextInput placeholder="City" 
                                placeholderTextColor="#a6a6a6" 
                                style={styles.textInput}
                                onChangeText={this.handleCity} 
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.action}>
                            <Icon name="email" color="#05375a" size={20}/>
                            <TextInput placeholder="State" 
                                placeholderTextColor="#a6a6a6" 
                                style={styles.textInput} 
                                onChangeText={this.handleState}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.action}>
                            <Icon name="email" color="#05375a" size={20}/>
                            <TextInput placeholder="Pin Code" 
                                keyboardType = 'numeric'
                                maxLength={6}
                                placeholderTextColor="#a6a6a6" 
                                style={styles.textInput} 
                                onChangeText={this.handlePin}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={{alignItems:'center',justifyContent:'center',paddingTop:5}}>
                         <TouchableOpacity onPress={()=>this.SelectFile()}
                            style={[styles.circle,
                            {borderColor:'#344955',    
                            borderWidth:1,
                            marginTop:15}]}
                         >
                            {this.state.path==''?
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Icon name="image" color="#05375a" size={30}/>
                                <Text style={styles.profile}>Profile Picture</Text>
                            </View>
                              
                              
                              :
                              <Image
                              style={styles.image}
                              source={{uri:this.state.path}}
                          />
                            
                            }
                        </TouchableOpacity>
                     </View>
                    
                    {this.state.loader==false ?
                        <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => this.uploadfile()}
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
        marginTop:StatusBar.currentHeight,
        flex: 1,
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