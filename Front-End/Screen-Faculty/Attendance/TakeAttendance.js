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
export default class TakeAttendance extends React.Component{
    state = {
        data:this.props.route.params,
        loader:true,
        FacutyID:'',
        CollageID:'',
        Students:(this.props.route.params.class.subjects.filter((itemfilter) => itemfilter.subject._id ==this.props.route.params.lec.subjectid._id))[0].students,
        attendance:[],
        w : Dimensions.get('window').width,
        h : Dimensions.get('window').height,
    }
    componentDidMount= async() =>{
        this.setState({FacutyID:await AsyncStorage.getItem('ID')});
        this.setState({CollageID:JSON.parse(await AsyncStorage.getItem('Details'))[0].collage_id});
        var abc=[]
        this.state.Students.map((item, index) => {
            var temp=JSON.parse(JSON.stringify({"student":item._id,"present":''}))
            abc.push(temp)
        }
        );
        this.setState({attendance:abc});
        this.setState({loader:false});
    }
    AddAttendance= (pre,index,id) =>{
        var data=this.state.attendance
        data[index].present=pre
        this.setState({attendance:data})
    }
    insertattendance=async()=>{
        let d = new Date();
        this.setState({ loader:true});
        await fetch('https://collage-collaborator.herokuapp.com/InsertLecture', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            
            body:JSON.stringify({
                collage_id:this.state.CollageID,
                class_id:this.state.data.class._id,
                faculty_id:this.state.FacutyID,
                subject_id:this.state.data.lec.subjectid._id,
                type:this.state.data.lec.type,
                start_time:this.state.data.lec.starth+':'+this.state.data.lec.startm,
               duration:(this.state.data.lec.endh-this.state.data.lec.starth)*60+(this.state.data.lec.endm-this.state.data.lec.startm),
               date:d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear(),
                attendance:this.state.attendance,
                for:this.state.data.lec.for,
            })  
        }).then((resp)=>resp.json())
        .then((response)=>{
            console.log(response)
            if(response=='1'){
              this.setState({ loader:false });
              Snackbar.show({text: 'Submit Successfully Done...',duration: Snackbar.LENGTH_SHORT,});
              this.props.navigation.navigate('Attendance')
            }
            else{
              Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
              this.deleteimage();
              this.props.navigation.navigate('SignIn');
            }
        }) 
    }
    render(){
        console.log(this.state.attendance)
     
        return(
          <ScrollView style={{marginTop : StatusBar.currentHeight,flex:1,backgroundColor:'white'}}>
               <StatusBar  backgroundColor = '#3498db'  barStyle = 'light-content' hidden = {false} translucent = {true}/>
           {this.state.loader==false ?
             <View > 
                <LinearGradient 
                    style={{height:this.state.h/2.5,borderBottomLeftRadius:50,borderBottomRightRadius:50,padding:20,justifyContent:'flex-end'}}
                    colors={['#3498db','#1464F4']}>
                    <StatusBar  backgroundColor = "#3498db"  barStyle = 'light-content' hidden = {false} translucent = {true}/> 
                    <View  style={{alignItems:'center',justifyContent:'center'}}>
                        <View style={{flexDirection:'row',marginBottom:3}}>
                        <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>{this.state.data.class.classname} </Text>
                        <Text style={{fontSize:20,color:'white',fontWeight:'900'}}>- Division</Text>
                        </View>
                        <Text style={{fontSize:15,color:'white',fontWeight:'900'}}>{this.state.data.class.program}</Text>
                        <Text style={{fontSize:15,color:'white',fontWeight:'900'}}>{this.state.data.class.course}</Text>
                        <Text style={{color:'white',fontSize:13,fontWeight:'500'}}>{"Year: "+ this.state.data.class.year+"  &  Sem: "+this.state.data.class.semester }</Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:15,color:'white',fontWeight:'800'}}>Class Counselor: </Text>
                        <Text style={{fontSize:15,color:'white',fontWeight:'900'}}>{this.state.data.class.counselor.faculty_firstname +" "+this.state.data.class.counselor.faculty_lastname}</Text>
                        </View>
                        
                    
                    <Text style={{color:'white',fontSize:17,fontWeight:'bold'}}>{ this.state.data.lec.subjectid.subject_name }</Text>
                                     <Text style={{color:'white',fontSize:13,fontWeight:'500'}}>{ this.state.data.lec.subjectid.subject_code }</Text>
                </View>
                    <View
                        style={{
                            borderBottomColor: '#fff',
                            borderBottomWidth: 3,
                            marginTop:20,
                            marginBottom:15,
                        }}
                    />
                    <View style={styles.fline}>
                                <Text style={styles.fline_text2}>{"Total Student: "+this.state.Students.length}</Text>
                                <Text style={styles.fline_text2}>{"Present: "+this.state.attendance.filter((item, i) => item.present=='present').length}</Text>
                    </View>
                </LinearGradient>
                {
                    this.state.Students.map((item, index) => (
                        <LinearGradient 
                                    colors={['#3498db','#1464F4']}
                                    style={{marginVertical:4,paddingVertical:10,paddingHorizontal:10,marginHorizontal:10, backgroundColor: '#3498db', borderRadius: 30}}
                                    >
                            <View >
                                <View style={styles.middle_circle_position}>
                                    <View >
                                        <Image
                                            style={styles.image}
                                            source={{uri:(item.profile).toString()}}
                                        />
                                    </View>
                                    <View style={styles.middle_circle_right_position}>
                                        <View  style={{flexDirection:'row'}}>
                                            {/* <Icon
                                                name="person"
                                                color="#fff"
                                                size={20}
                                            /> */}
                                            <Text style={{marginLeft:10,color:'white',fontSize:20,fontWeight:'bold'}}>{item.student_firstname+' '+item.student_lastname}</Text>
                                        </View>
                                        
                                        <View  style={{flexDirection:'row'}}>
                                            {/* <Icon
                                                name="person"
                                                color="#fff"
                                                size={20}
                                            /> */}
                                            <Text style={{marginLeft:10,color:'white',fontSize:15,fontWeight:'500'}}>{item.student_en_no}</Text>
                                        </View>
                                        <View  style={{flexDirection:'row'}}>
                                            {/* <Icon
                                                name="email"
                                                color="#fff"
                                                size={20}
                                            /> */}
                                            <Text style={{marginLeft:10,color:'white',fontSize:15,fontWeight:'500',flexShrink: 1}}>{item.student_email}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',flex:1,marginTop:5}}>
                                    <TouchableOpacity 
                                         onPress={()=>{
                                        
                                            this.AddAttendance('present',index,item._id)
                            
                                        }}
                                    >
                                        {this.state.attendance[index].present!='present'?
                                        <View style={{backgroundColor:'white',borderRadius:10,padding:5,alignItems:'center',justifyContent:'center',marginHorizontal:10}}>
                                        <Text style={{marginLeft:10,color:'black',fontSize:20,fontWeight:'500'}}>  Present    </Text>
                                        </View>
                                        :
                                        <View style={{backgroundColor:'#00ff00',borderRadius:10,padding:5,alignItems:'center',justifyContent:'center',marginHorizontal:10}}>
                                        <Text style={{marginLeft:10,color:'black',fontSize:20,fontWeight:'500'}}> Present    </Text>
                                        </View>
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={()=>{
                                            this.AddAttendance('absent',index,item._id)
                                        }}
                                    >
                                        {this.state.attendance[index].present!='absent'?
                                        <View style={{backgroundColor:'white',borderRadius:10,padding:5,alignItems:'center',justifyContent:'center',marginHorizontal:10}}>
                                        <Text style={{marginLeft:10,color:'black',fontSize:20,fontWeight:'500'}}>  Absent    </Text>
                                        </View>
                                        :
                                        <View style={{backgroundColor:'#f44336',borderRadius:10,padding:5,alignItems:'center',justifyContent:'center',marginHorizontal:10}}>
                                        <Text style={{marginLeft:10,color:'black',fontSize:20,fontWeight:'500'}}>  Absent    </Text>
                                        </View>
                                        }
                                    
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </LinearGradient>

                      
                    ))
                    }
                    <View style={styles.button}>
                   <TouchableOpacity
                       style={styles.signIn}
                       onPress={() => this.insertattendance()}
                   >
                       <LinearGradient
                          colors={['#3498db','#1464F4']}
                           style={styles.signIn}
                       >
                           <Text style={[styles.textSign, {
                               color: '#fff'
                           }]} >Submit</Text>
                       </LinearGradient>
                   </TouchableOpacity>


               </View>
             </View>   
             :
             <View>
                 <Text>Loader Running</Text>
             </View>
           }
          </ScrollView>
            
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