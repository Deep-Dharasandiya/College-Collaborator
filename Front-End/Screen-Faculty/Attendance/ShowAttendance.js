import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
export default class ShowAttendance extends React.Component{
    state = {
        
        loader:true,
        FacutyID:'',
        lacturedetails:this.props.route.params,
        CollageID:'',
        Lectures:'',
        Students:'',
        counter:'',
        w : Dimensions.get('window').width,
        h : Dimensions.get('window').height,
    }
    componentDidMount= async() =>{
        this.setState({FacutyID:await AsyncStorage.getItem('ID')});
        this.setState({CollageID:JSON.parse(await AsyncStorage.getItem('Details'))[0].collage_id});
        this.GetLectureDetails()
    }
    GetLectureDetails=async()=>{
        await fetch('https://collage-collaborator.herokuapp.com/CalculateLectureAttendance', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                collage_id:this.state.lacturedetails.collage_id,
                faculty_id:this.state.lacturedetails.faculty_id,
                class_id:this.state.lacturedetails.classid,
                subject_id:this.state.lacturedetails.subject_id
            })  
        }).then((resp)=>resp.json())
        .then((response)=>{
            console.log(response);
            if(response=='0'){
                Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
            }
            else{
                this.setState({ Lectures:response });
                // console.log(response)
                //  console.log((response[0].class_id.subjects.filter((item, i) => item.subject==lacturedetails.subject_id)))
                 this.setState({ Students:(response[0].class_id.subjects.filter((item, i) => item.subject==this.state.lacturedetails.subject_id))[0].students});
                this.setState({ loader:false });

            }
        }) 
    }
render(){
    console.log("Deep")
   console.log(this.state.Students)
    return(
        <View style={{flex:1,marginTop:50}}>
            {this.state.loader==false?
            <ScrollView >
               <View style={{flexDirection:'row'}}>
                   <View>
                             <View style={{height:60,width:60,borderColor:'blue',marginTop:3,marginBottom:3,marginRight:3,marginLeft:15,borderWidth:2,padding:5,justifyContent:'center',alignItems:'center'}}>
                            </View>
                        {
                            
                            this.state.Students.map((item, index) => (
                                <View style={{height:60,width:60,borderColor:'blue',marginTop:3,marginBottom:3,marginRight:3,marginLeft:15,borderWidth:2,padding:5,justifyContent:'center',alignItems:'center'}}>
                                      <Text>{item.student_firstname}</Text>
                                 </View>
                              ))
                        }
                    </View>
                    <View >
                    <ScrollView horizontal={true} >
                        <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'row'}}>
                                        {
                                            this.state.Lectures.map((item, index) => (
                                                <View style={{height:60,width:60,borderColor:'blue',margin:3,borderWidth:2,padding:5,justifyContent:'center',alignItems:'center'}}>
                                                    <Text>{item.date}</Text>
                                                </View>
                                            ))
                                        }
                        </View>
                        <View style={{flexDirection:'row'}}>
                        {
                                this.state.Lectures.map((item2, index) => (
                                    <View style={{flexDirection:'column'}}>
                                        {
                                            item2.attendance.map((item, index) => (
                                                <View style={{height:60,width:60,borderColor:'blue',margin:3,borderWidth:.5,padding:5,justifyContent:'center',alignItems:'center'}}>
                                                <Text>{item.present}</Text>
                                            </View>
                                            ))
                                        }
                                    </View>
                                ))
                            }
                        </View>
                        </View>
                    </ScrollView>
                    </View>
                    {/* <View >
                        <ScrollView horizontal={true}>
                            <View style={{flexDirection:'row'}}>
                                    {
                                        this.state.Lectures.map((item, index) => (
                                            <View style={{height:60,width:60,borderColor:'blue',borderWidth:2,padding:5,justifyContent:'center',alignItems:'center'}}>
                                                <Text>{item.date}</Text>
                                            </View>
                                        ))
                                    }
                            </View>
                            {
                                this.state.Lectures.map((item2, index) => (
                                    <View style={{flexDirection:'column'}}>
                                        {
                                            item2.attendance.map((item, index) => (
                                                <View style={{height:60,width:60,borderColor:'blue',borderWidth:2,padding:5,justifyContent:'center',alignItems:'center'}}>
                                                <Text>{item.present}</Text>
                                            </View>
                                            ))
                                        }
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View> */}
                </View>
                {/* <View >
                 <ScrollView style={{flexDirection:'row'}}>
                    <View>
                            <View style={{height:60,width:60,borderColor:'blue',borderWidth:2,padding:5,justifyContent:'center',alignItems:'center'}}>
                            </View>
                        {
                            
                            this.state.Students.map((item, index) => (
                                <View style={{height:60,width:60,borderColor:'blue',borderWidth:2,padding:5,justifyContent:'center',alignItems:'center'}}>
                                      <Text>{item.student_firstname}</Text>
                                 </View>
                              ))
                        }
                    </View>
                    <ScrollView horizontal={true}>
                            <View style={{flexDirection:'row'}}>
                            {
                                this.state.Lectures.map((item, index) => (
                                    <View style={{height:60,width:60,borderColor:'blue',padding:5,justifyContent:'center',alignItems:'center'}}>
                                        <Text>{item.date}</Text>
                                    </View>
                                ))
                            }
                            </View>
                        </ScrollView>
                
                </ScrollView>
                </View> */}
            </ScrollView>
            :
            <View>
                <Text>Loader</Text>
            </View>}
        </View>
    );
}
}

const styles = StyleSheet.create({
    bottom: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 5,
        flexDirection: 'column'

    },
    middle:
    {
        flexDirection: 'column',
        padding: 15,
        backgroundColor: '#3498db',
        borderRadius: 30,
        justifyContent: 'space-evenly'



    },
    fline: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fline_text1: {
        fontSize: 21,
        color: '#fff',
    },
    fline_text2: {
        fontSize: 15,
        color: '#fff',
    },
      top_text: {
        fontSize: 30,
        fontWeight:'bold',
        color: 'white',
    },
    middle_circle_position: {
        flexDirection: 'row',
    },
  
    middle_circle_right_position: {
        flexDirection: 'column',
        justifyContent:'center'
    },
    middle:
    {
        height: 110,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal:10,
        backgroundColor: '#3498db',
        borderRadius: 30
    },
    image: {
        flex: 1,
        width: 80,
        height: 80,
        borderRadius: 80,
        resizeMode:"contain",
        marginRight:10
      },
      button: {
        alignItems: 'center',
        marginTop: 50,
        marginHorizontal:30
  
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
});