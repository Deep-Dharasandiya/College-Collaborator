import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
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
export default class CreateClass extends React.Component{
    state = {
        loader:true,
        FacultyDetails:'',
        SubjectDetails:'',
        program:'',
        course:'',
        class_Counselor:'',
        year:'',
        semester:'',
        class_name:'',
        subclasses:[],
        subjects:[],
        dropdown_sem:'',
        subclass_flag:'',
        subclass_name:'',
        subject_name:'',
        edit_flag:false,
        edit_state:0,
        sub_id:'',
        sub_ids:[],
        w : Dimensions.get('window').width,
        h : Dimensions.get('window').height,
    }
    componentDidMount= async() =>{
        this.setState({ CollageID:await AsyncStorage.getItem('ID')});
        this.GetFacultyDetails();
    }
    handleclass_name = (text) => {
        this.setState({ class_name: text })
    }
    handlesubclass_name = (text) => {
        this.setState({ subclass_name: text })
    }
    handlesubject_name = (text) => {
        this.setState({ subject_name: text })
    }
    checksubclasses=(name)=>{
        var temp=this.state.subclasses;
        var i=0;
        var c=0;
      for(i=0;i<temp.length;i++){
          if(temp[i]['name']==name){
            c=1;
          }
      }
      if(c==0){
          return true
      }else{
          return false
      }
    }
    checksubject=(name)=>{
        var temp=this.state.subjects;
        var i=0;
        var c=0;
      for(i=0;i<temp.length;i++){
          if(temp[i]['name']==name){
            c=1;
          }
      }
      if(c==0){
          return true
      }else{
          return false
      }
    }
    addsubclasses=async()=>{
    if(this.checksubclasses(this.state.subclass_name)==true){
        if(this.state.edit_flag==false){
            var temp=JSON.parse('{ "subclassname":"'+this.state.subclass_name+'"'+'}');
            var data=this.state.subclasses  ;
            console.log(data);
            data.push(temp)
            this.setState({ subclasses:  data })
            this.setState({ subclass_name:''})
             console.log(this.state.subclasses);
        }else{
            var temp=this.state.subclasses  
            temp[this.state.edit_state]['subclassname']=this.state.subclass_name;
            this.setState({ subclasses:temp})
            this.setState({ subclass_name:''})
            this.setState({ edit_flag:false})
        }
     }else{
        Alert.alert("Warning!!!","Sub Class name all ready taken...", [{ text: "OK"}],);
     }
    }
    addsubject=async()=>{
        if(this.checksubject(this.state.subject_name)==true){
                var temp=JSON.parse('{ "name":"'+this.state.subject_name+'"'+',"students":'+'[]'+'}');
                var temp2=JSON.parse('{ "subject":"'+this.state.sub_id+'"'+'}');
                var data=this.state.subjects ;
                var data2=this.state.sub_ids ;
                data.push(temp)
                data2.push(temp2)
                this.setState({ subjects:  data })
                this.setState({ sub_ids:  data2 })
                this.setState({ subject_name:''})
                this.setState({ sub_id:''})
                console.log(this.state.sub_ids)
         }else{
            Alert.alert("Warning!!!","Subject name all ready taken...", [{ text: "OK"}],);
         }
        }
    editbutton=async(a)=>{
       this.setState({ edit_flag:true})
       this.setState({ edit_state:a})
       var temp=this.state.subclasses  
       this.setState({ subclass_name:temp[a]['subclassname']})
    }
    deletebutton=async(a)=>{
        this.setState({ edit_flag:false})
        this.setState({ subclass_name:''})
        var temp=this.state.subclasses  
        var temp2=[]
        var i=0;
        var j=0;
        for (i =0;i<temp.length;i++){
          if(i!=a){
              temp2[j]=temp[i];
              j=j+1
          }
        }
        this.setState({ subclasses:temp2})
     }
     deletebuttonsub=async(a)=>{
        var temp=this.state.subjects  
        var tempid=this.state.sub_ids  
        var temp2=[]
        var temp22=[]
        var i=0;
        var j=0;
        var ii=0;
        var jj=0;
        for (i =0;i<temp.length;i++){
          if(i!=a){
              temp2[j]=temp[i];
              j=j+1
          }
        }
        for (ii =0;ii<tempid.length;ii++){
            if(ii!=a){
                temp22[jj]=tempid[ii];
                jj=jj+1
            }
          }

        this.setState({ subjects:temp2})
        this.setState({ sub_ids:temp22})
     }
    GetFacultyDetails=async()=>{
        await fetch('https://collage-collaborator.herokuapp.com/GetFacultyDetails', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                collage_id:this.state.CollageID,
            })  
        }).then((resp)=>resp.json())
        .then((response)=>{
            if(response=='0'){
                Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
            }
            else{
                this.setState({ FacultyDetails:response });
                this.GetSubjectDetails();

            }
        }) 
    }
    GetSubjectDetails=async()=>{
        await fetch('https://collage-collaborator.herokuapp.com/GetSubjectDetails', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                collage_id:this.state.CollageID,
            })  
        }).then((resp)=>resp.json())
        .then((response)=>{
            if(response=='0'){
                Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
            }
            else{
                this.setState({ SubjectDetails:response });
                this.setState({ loader:false });

            }
        }) 
    }
    CreateClassroom=async()=>{
        await fetch('https://collage-collaborator.herokuapp.com/CreateClassroom', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                collage_id:this.state.CollageID,
                program:this.state.program,
                course:this.state.course,
                year:this.state.year,
                semester:this.state.semester,
                counselor:this.state.class_Counselor,
                classname:this.state.class_name,
                subclass_flage:this.state.subclass_flag,
                subclasses:this.state.subclasses,
                subjects:this.state.sub_ids,

            })  
        }).then((resp)=>resp.json())
        .then((response)=>{
            if(response=='0'){
                Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
            }else if(response=='2'){
                Alert.alert("Warning!!!","Class Name All Ready Exist Use defferent Name..", [{ text: "OK"}],);
            }
            else{
                Snackbar.show({text: 'Class Successfully Created...',duration: Snackbar.LENGTH_SHORT });
                this.props.navigation.navigate('Classes')
            }
        }) 
    }
    createclassroom=async()=>{
     if(this.state.program !='' && this.state.course !='' && this.state.semester !='' && this.state.year !='' && this.state.class_Counselor !='' && this.state.class_name !='' && this.state.subclass_flag != '' && this.state.sub_ids!=''){
       if(this.state.subclass_flag == '0'){
        this.setState({ subclasses:''})
        this.CreateClassroom();
       }else {
           if(this.state.subclasses.length>=2){
            this.CreateClassroom();
           }else{
            Alert.alert("Warning!!!","If Your class have sub classes then minimum two subclass requires", [{ text: "OK"}],);
           }
         }
    }else{
        Alert.alert("Warning!!!","Please Enter All The Details...", [{ text: "OK"}],);
    }
    }
    
    
    render(){
        return(
            <LinearGradient 
                colors={['#3498db','#1464F4']}
                style={styles.container}
            >
                <StatusBar  backgroundColor = '#3498db'  barStyle = 'light-content' hidden = {false} translucent = {true}/>
            {this.state.loader==false ?
                <View style={styles.container}>
                <Text style={styles.top_text}>Create Class</Text>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.footer}
                >
                    <ScrollView>
                            <Text style={styles.text_footer}> Select Program </Text>
                            <DropDownPicker
                                placeholder="Select"
                                items={[
                                    { label: 'Bachelor of Engineering', value: 'Bachelor of Engineering' },
                                    { label: 'Bachelor of Technology', value: 'Bachelor of Technology' },
                                    { label: 'Master of Engineering', value: 'Master of Engineering' },
                                    { label: 'Master of Technology', value: 'Master of Technology' },
                                ]}
                                searchable={true}
                                containerStyle={{ height: 30 }}
                                style={styles.textInput}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => this.setState({
                                    program: item.value
                                })}
                            />
                            <Text style={[styles.text_footer, {marginTop: 10,marginBottom:20}]}> Select Courses </Text>
                            <DropDownPicker
                                placeholder="Select"
                                items={[
                                    { label: 'Computer Engineering', value: 'Computer Engineering' },
                                    { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
                                    { label: 'Chemical Engineering', value: 'Chemical Engineering' },
                                    { label: 'Imformation & Technology', value: 'Imformation & Technology' },
    
                                ]}
                                searchable={true}
                                
                                containerStyle={{ height: 30 }}
                                style={styles.textInput}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => this.setState({
                                    course: item.value
                                })}
                            />
                            <Text style={[styles.text_footer, {marginTop: 10,marginBottom:20}]}> Select Year </Text>
                            <DropDownPicker
                                placeholder="Select"
                                items={[
                                    { label: '1st', value: '1' },
                                    { label: '2nd', value: '2' },
                                    { label: '3rd', value: '3' },
                                    { label: '4th', value: '4' },
    
                                ]}
                                containerStyle={{ height: 30 }}
                                style={styles.textInput}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => (
                                    this.setState({ year: item.value})
                                )}
                            />
                            <Text style={[styles.text_footer, {marginTop: 10,marginBottom:20}]}> Select Semester </Text>
                            <DropDownPicker
                                placeholder="Select"
                                items={this.state.dropdown_sem}
                                containerStyle={{ height: 30 }}
                                style={styles.textInput}
                                items={[
                                    { label: '1st', value: '1' },
                                    { label: '2nd', value: '2' },
                                    { label: '3rd', value: '3' },
                                    { label: '4th', value: '4' },
                                    { label: '5th', value: '5' },
                                    { label: '6th', value: '6' },
                                    { label: '7th', value: '7' },
                                    { label: '8th', value: '8' },
                                ]}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => this.setState({
                                    semester: item.value
                                })}
                            />
                            <Text style={[styles.text_footer, {marginTop: 10}]}>Class Counselor</Text>
                            <DropDownPicker
                                placeholder="Select"
                                searchable={true}
                                containerStyle={{ height: 30 }}
                                style={styles.textInput}
                                items={this.state.FacultyDetails.map(item=>({label:item.faculty_firstname+" "+item.faculty_lastname,value:item._id}))}
    
                                
                                itemStyle={{
                                     justifyContent: 'flex-start',
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => this.setState({
                                    class_Counselor: item.value
                                })}
                            />
                            <Text style={[styles.text_footer, {marginTop: 10}]}>Class Name</Text>
                            <View style={styles.action}>
                                <Icon name="class" color="#05375a" size={20}/>
                                <TextInput placeholder="Name" 
                                    placeholderTextColor="#a6a6a6" 
                                    style={styles.textInput} 
                                    onChangeText={this.handleclass_name}
                                    autoCapitalize="none"
                                />
                            </View>
                            <RadioForm
                                style={{marginTop: 20}}
                                radio_props={[
                                    {label: "Class Haven't Sub Class", value: '0' },
                                    {label: 'Class Have Sub Class', value: '1' },  
                                  ]}
                                  initial={this.state.subclass_flag}
                                formHorizontal={false}
                                onPress={(value) => {this.setState({subclass_flag:value})}}
                            />
                            {
                                this.state.subclass_flag=='1'?
                                <View style={{borderColor:'#3498db',borderWidth:2,padding:10}}> 
                                    <Text style={[styles.text_footer, {marginTop: 10}]}>Sub Class Name</Text>
                                    <View style={{marginBottom:10}}>
                                        {
                                            this.state.subclasses.length != 0?
                                            <View>
                                                 {this.state.subclasses.map((item, index) => (
                                                    <View style={{borderColor:'#3498db',borderWidth:1,alignItems:'flex-start',padding:5,marginBottom:2,flexDirection:'row'}}>
                                                        <Text>{"  ("+(index+1)+")  "+item.subclassname +'   '}</Text>
                                                        <TouchableOpacity 
                                                            onPress={() => this.deletebutton(index)}>
                                                            <Icon name="delete" color="#3498db" size={20}/>
                                                        </TouchableOpacity>
                                                        <Text>   </Text>
                                                        <TouchableOpacity  
                                                            onPress={() => this.editbutton(index)}>
                                                            <Icon name="edit" color="#3498db" size={20}/>
                                                        </TouchableOpacity>
                                                        
                                                    </View>
                                                   
                                                 ))}
                                            </View>
                                            :
                                            <View style={{height:30,borderColor:'#3498db',borderWidth:1,alignItems:'center',padding:5}} >
                                                <Text>Please add SubClass</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={styles.action}>
                                        <Icon name="class" color="#05375a" size={20}/>
                                        <TextInput placeholder="Name" 
                                            placeholderTextColor="#a6a6a6" 
                                            defaultValue={this.state.subclass_name}
                                            style={styles.textInput} 
                                            onChangeText={this. handlesubclass_name}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                    <TouchableOpacity  
                                       style={{alignItems: 'center'}} 
                                       onPress={() => this.addsubclasses()}>
                                        <Icon name="done" color="#3498db" size={40}/>
                                       
                                     </TouchableOpacity>
                                </View>
                                    :
                                <View>
                                </View>  
                            }
                            <View style={{borderColor:'#3498db',borderWidth:2,padding:10,marginTop:15}}> 
                                    <Text style={[styles.text_footer, {marginTop: 10}]}>Add Subjects:</Text>
                                    <View style={{marginBottom:30}}>
                                        {
                                            this.state.subjects.length != 0?
                                            <View>
                                                 {this.state.subjects.map((item, index) => (
                                                    <View style={{borderColor:'#3498db',borderWidth:1,alignItems:'flex-start',padding:5,marginBottom:2,flexDirection:'row'}}>
                                                        <Text>{"  ("+(index+1)+")  "+item.name +'   '}</Text>
                                                        <TouchableOpacity 
                                                            onPress={() => this.deletebuttonsub(index)}>
                                                            <Icon name="delete" color="#3498db" size={20}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                   
                                                 ))}
                                            </View>
                                            :
                                            <View style={{height:30,borderColor:'#3498db',borderWidth:1,alignItems:'center',padding:5}} >
                                                <Text>Please add Subjects</Text>
                                            </View>
                                        }
                                    </View>
                                    
                                    <DropDownPicker
                                        placeholder="Select"
                                        searchable={true}
                                        containerStyle={{ height: 30 }}
                                        style={styles.textInput}

                                        items={this.state.SubjectDetails.map(item=>({label:item.subject_name+" ("+item.subject_code+")",value:item._id}))}
            
                                        
                                        itemStyle={{
                                            justifyContent: 'flex-start',
                                        }}
                                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                                        onChangeItem={item => this.setState({
                                            subject_name:item.label ,
                                            sub_id:item.value
                                        })}
                                    />
                                    
                                    <TouchableOpacity  
                                       style={{alignItems: 'center'}} 
                                       onPress={() => this.addsubject()}>
                                        <Icon name="done" color="#3498db" size={40}/>
                                       
                                     </TouchableOpacity>
                                </View>
                        {this.state.loader==false ?
                            <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={() => this.createclassroom()}
                            >
                                <LinearGradient
                                    colors={['#3498db','#1464F4']}
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
          :
          <View>
              <Text>Loader</Text>
          </View>
            }
        
        </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight,
       
        
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
        paddingVertical: 30,
        marginHorizontal:10
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#000000',
        fontSize: 18,
        marginBottom:20,
    },
    action: {
        flexDirection: 'row',
        marginTop: 0,
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
        paddingLeft:20,
        paddingBottom:20
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