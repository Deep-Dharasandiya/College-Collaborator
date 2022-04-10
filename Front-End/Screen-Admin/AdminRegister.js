import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
export default class AdminRegister extends React.Component{
    state = {
        loader:false,
        collage_name:'',
        email:'',
        password:'',
        repassword:'',
        local_add:'',
        city:'',
        state:'',
        pin:'',
        password_secure:true,
        path:'',
        firebaseurl:'',
        filename:'',
    }
    handleCollage_name = (text) => {
        this.setState({ collage_name: text })
    }
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    handleReassword = (text) => {
        this.setState({ repassword: text })
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
    signup=async()=>{
          await fetch('https://collage-collaborator.herokuapp.com/SignUp', {  
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body:JSON.stringify({
                  collage_name:this.state.collage_name,
                  email:this.state.email,
                  password:this.state.password,
                  local_add:this.state.local_add,
                  city:this.state.city,
                  state:this.state.state,
                  pin:this.state.pin,
                  icon:this.state.firebaseurl,
                  role:"admin",
              })  
          }).then((resp)=>resp.json())
          .then((response)=>{
              console.log(response)
              if(response=='1'){
                this.setState({ loader:false });
                Snackbar.show({text: 'SignUp Successfully Done...',duration: Snackbar.LENGTH_SHORT,});
                this.props.navigation.navigate('SignIn')
              }
              else if(response=='2'){
                this.setState({ loader:false });
                  Alert.alert("Warning!!!","Email Already Exist...", [{ text: "OK"}],);
                  this. deleteimage();
              }
              else{
                Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
                this.deleteimage();
                this.props.navigation.navigate('SignIn');
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
     if(this.state.collage_name !='' && this.state.email !='' && this.state.password !='' && this.state.repassword !='' && this.state.local_add !='' && this.state.city !='' && this.state.state !='' && this.state.pin !='' && this.state.path){
         if(this.state.password==this.state.repassword){
            this.setState({loader:true })
        const uri = this.state.path;
          console.log(this.state.filename);
          var fname=this.state.email+new Date().toLocaleString()+'icon';
          this.setState({filename:fname})
          try {
            await storage().ref((fname)).putFile(uri);
       
            const storage1 = firebase.storage();
            storage1.ref((fname)).getDownloadURL()
            .then((url) => {
                this.setState({firebaseurl:url})
                this.signup();
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
    return (
        <View style={styles.container}>

        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}> Collage Name </Text>
                    <View style={styles.action}>
                        <Icon name="person" color="#05375a" size={20}/>
                        <TextInput placeholder="Collage Name" 
                            placeholderTextColor="#a6a6a6" 
                            style={styles.textInput} 
                            onChangeText={this.handleCollage_name}
                            autoCapitalize="none"
                        />
                    </View>
                    <Text style={[styles.text_footer, {marginTop: 10}]}> Email </Text>
                    <View style={styles.action}>
                        <Icon name="email" color="#05375a" size={20}/>
                        <TextInput placeholder="Email" 
                            placeholderTextColor="#a6a6a6" 
                            style={styles.textInput} 
                            onChangeText={this.handleEmail}
                            autoCapitalize="none"
                        />
                    </View>
                    <Text style={[styles.text_footer, {marginTop: 10}]}>Password</Text>
                    <View style={styles.action}>
                        <Icon
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput 
                            placeholder="Your Password"
                            secureTextEntry={this.state.password_secure}
                            style={styles.textInput}
                            onChangeText={this.handlePassword}
                            autoCapitalize="none"
                            
                        />
                        <TouchableOpacity
                        onPress={() =>{
                            if(this.state.password_secure==true){
                                this.setState({ password_secure: false })
                            }else{
                                this.setState({ password_secure: true })
                            }
                         }}>
                            <Icon name="visibility" color="black" size={20}/>
                        </TouchableOpacity>
                    </View>
  
                    <Text style={[styles.text_footer, {marginTop: 10}]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Icon 
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput 
                            placeholder="Confirm Your Password"
                            secureTextEntry={true}
                            style={styles.textInput}
                            onChangeText={this.handleReassword}
                            autoCapitalize="none"
                        />
                    </View>
                    <Text style={[styles.text_footer, {marginTop: 10}]}>Collage Address</Text>
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
                                <Text style={styles.profile}>Collage Icon</Text>
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
                            }]} >Signup</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    </View>
                    :
                    
                    <View style={styles.button}>
                        <Text>Loader</Text>
                    </View>
                
                }
                 
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminHome')}
                        style={[styles.logIn,
                        {
                            borderColor: '#344955',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >

                        <Text style={styles.textSign1}>Already have an account? login</Text>


                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Animatable.View>
    </View>
  )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
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
      profile: {
        fontSize: 15,
        color: '#3498db',
    },
});