import React from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  VirtualizedView,
  StatusBar,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
export default class SubClassDetails extends React.Component{
    state = {
       w : Dimensions.get('window').width,
       h : Dimensions.get('window').height,
       loader:true,
       ClassDetails:this.props.route.params,
       ClassID:'',
       ClassDetails2:(this.props.route.params).class,
       student:'',
    }
    componentDidMount= async() =>{
        this.setState({CollageID:await AsyncStorage.getItem('ID')});
        this.GetStudentDetails();
    }
    GetStudentDetails=async()=>{
        await fetch('https://collage-collaborator.herokuapp.com/GetStudentDetails', {  
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
            console.log(response);
            if(response=='0'){
                Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
            }
            else{
                this.setState({ StudentDetails:response });
                this.setState({ loader:false });

            }
        }) 
    }
    GetClassDetails=async()=>{
        await fetch('https://collage-collaborator.herokuapp.com/GetClassroomDetails', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                _id:this.state.ClassDetails2._id,
            })  
        }).then((resp)=>resp.json())
        .then((response)=>{
            console.log(response);
            if(response=='0'){
                Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
            }
            else{
                this.setState({ ClassDetails2:response[0] });
                this.setState({ loader:false });

            }
        }) 
    }
    UpdateSubClass=async()=>{
        if(this.state.student !=''){
        this.setState({ loader:true });
        await fetch('https://collage-collaborator.herokuapp.com/UpdateSubClass', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                _id:this.state.ClassDetails2._id,
                subclass_id:this.state.ClassDetails.subclass._id,
                student_id:this.state.student,
            })  
        }).then((resp)=>resp.json())
        .then((response)=>{
            console.log(response);
            if(response=='0'){
                Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
            }
            else if(response=='2'){
                Alert.alert("Warning!!!","Student All Ready exist...", [{ text: "OK"}],);
            }
            else{
                this.setState({ student:'' });
                this.GetClassDetails();

            }
        }) 
    }else{
        Alert.alert("Warning!!!","Please Enter All The Details...", [{ text: "OK"}],);
      }
    }
    render(){
        return(
            <View style={{backgroundColor:'white',flex:1,marginTop:StatusBar.currentHeight,}}>
                 <StatusBar  backgroundColor = "#3498db"  barStyle = 'light-content' hidden = {false} translucent = {true}/> 
                {this.state.loader==false ?
                 <View>
                    <LinearGradient
                    style={{height:this.state.h/4,borderBottomLeftRadius:50,borderBottomRightRadius:50,padding:20,justifyContent:'flex-end'}}
                    colors={['#3498db','#1464F4']}>
                    <StatusBar  backgroundColor = "#3498db"  barStyle = 'light-content' hidden = {false} translucent = {true}/>
                    <View  style={{alignItems:'center',justifyContent:'center'}}>
                         <View style={{flexDirection:'row',marginBottom:10}}>
                            <Text style={{fontSize:30,color:'white',fontWeight:'bold'}}>{this.state.ClassDetails2.classname} </Text>
                            <Text style={{fontSize:30,color:'white',fontWeight:'900'}}>- Division</Text>
                        </View>
                        <Text style={{fontSize:20,color:'white',fontWeight:'900'}}>{this.state.ClassDetails.subclass.subclassname+" - Batch"}</Text>
                        <Text style={{fontSize:20,color:'white',fontWeight:'900'}}>{'No of Students: '+this.state.ClassDetails2.subclasses[this.state.ClassDetails.index].students.length}</Text>
                    </View>
                </LinearGradient>
                <Text style={{fontSize:20,color:'#1464F4',fontWeight:'bold',marginTop:20,marginLeft:20,marginBottom:30}}>Students:</Text>
                   <DropDownPicker
                        placeholder="Add Student"
                        searchable={true}
                        containerStyle={{ height: 30 }}
                        style={styles.textInput}

                        items={this.state.StudentDetails.map(item=>({label:item.student_firstname,value:item._id}))}

                        
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => this.setState({
                            student:item.value
                        })}
                    />
                    <LinearGradient 
                            colors={['#3498db','#1464F4']}
                            style={{marginTop:10,marginLeft:this.state.w/2-25,borderRadius:30,height:50,width:50,alignItems:'center',justifyContent:'center'}}
                        >
                            <TouchableOpacity 
                              onPress={()=>this.UpdateSubClass()}
                             >
                                <Icon
                                    name="pluscircleo"
                                    color="white"
                                    size={20}
                                />
                             </TouchableOpacity>
                        </LinearGradient>
                    <FlatList
                        data={ this.state.ClassDetails2.subclasses[this.state.ClassDetails.index].students}
                        style={{marginTop:20}}
                        renderItem={ ({ item ,index}) => (
                            <TouchableOpacity 
                                // onPress={()=>this.addStudent(item._id,index)}
                                >
                            <LinearGradient 
                                style={{height:50,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginHorizontal:20,marginBottom:10}}
                                colors={['#3498db','#1464F4']}>
                                <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>{item.student_firstname}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        ) }
                        keyExtractor={(item, index) => index.toString()}
                    /> 
                
                 </View>
                 :
                 <View>

                 </View>}
            </View>
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
      
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        marginHorizontal:20,
    },
});