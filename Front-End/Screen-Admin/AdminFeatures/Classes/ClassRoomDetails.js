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
  StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
export default class ClassRoomDetails extends React.Component{
    state = {
       w : Dimensions.get('window').width,
       h : Dimensions.get('window').height,
       loader:true,
       class:this.props.route.params,
       ClassDetails:'',
       ClassID:'',
    }
    componentDidMount= async() =>{
        this.setState({CollageID:await AsyncStorage.getItem('ID')});
        this. GetClassDetails();
    }
    GetClassDetails=async()=>{
        await fetch('https://collage-collaborator.herokuapp.com/GetClassroomDetails', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                _id:this.state.class._id,
            })  
        }).then((resp)=>resp.json())
        .then((response)=>{
            console.log(response);
            if(response=='0'){
                Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
            }
            else{
                this.setState({ ClassDetails:response[0] });
                this.setState({ loader:false });

            }
        }) 
    }
    ShedualChecker=async(day)=>{
        return this.state.ClassDetails.shedual.day==day
    }
    render(){
     
        return(
            <ScrollView style={{backgroundColor:'white',flex:1,marginTop:StatusBar.currentHeight,}}>
                {this.state.loader==false ?
                <View>
                <LinearGradient 
                    style={{height:this.state.h/2.5,borderBottomLeftRadius:50,borderBottomRightRadius:50,padding:20,justifyContent:'flex-end'}}
                    colors={['#3498db','#1464F4']}>
                    <StatusBar  backgroundColor = "#3498db"  barStyle = 'light-content' hidden = {false} translucent = {true}/> 
                    <View  style={{alignItems:'center',justifyContent:'center'}}>
                        <View style={{flexDirection:'row',marginBottom:10}}>
                        <Text style={{fontSize:30,color:'white',fontWeight:'bold'}}>{this.state.ClassDetails.classname} </Text>
                        <Text style={{fontSize:30,color:'white',fontWeight:'900'}}>- Division</Text>
                        </View>
                        <Text style={{fontSize:20,color:'white',fontWeight:'900'}}>{this.state.ClassDetails.program}</Text>
                        <Text style={{fontSize:20,color:'white',fontWeight:'900'}}>{this.state.ClassDetails.course}</Text>
                        <Text style={{fontSize:20,color:'white',fontWeight:'800',marginTop:20}}>Class Counselor:</Text>
                    <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>{this.state.ClassDetails.counselor.faculty_firstname +" "+this.state.ClassDetails.counselor.faculty_lastname}</Text>
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
                                <Text style={styles.fline_text2}>{"Sem: "+this.state.ClassDetails.semester}</Text>
                                <Text style={styles.fline_text2}>{"Year: "+this.state.ClassDetails.year}</Text>
                    </View>
                </LinearGradient>
                <Text style={{fontSize:20,color:'#1464F4',fontWeight:'bold',marginLeft:20,marginTop:20}}>Sub Classes:</Text>
                <ScrollView horizontal={true} style={{flexDirection:'row',marginLeft:20,marginTop:20}}>
                    <FlatList
                        data={ this.state.ClassDetails.subclasses }
                        numColumns={this.state.ClassDetails.subclasses.length}
                        renderItem={ ({ item ,index}) => (
                            <TouchableOpacity 
                                onPress={()=>this.props.navigation.navigate('SubClassDetails', {class:this.state.ClassDetails,subclass:this.state.ClassDetails.subclasses[index],index:index})}
                                >
                            <LinearGradient 
                                style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                                colors={['#3498db','#1464F4']}>
                                <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>{item.subclassname}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        ) }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>
                <Text style={{fontSize:20,color:'#1464F4',fontWeight:'bold',marginLeft:20,marginTop:20}}>Subject:</Text>
                <ScrollView horizontal={true} style={{flexDirection:'row',marginLeft:20,marginTop:20}}>
                    <FlatList
                        data={ this.state.ClassDetails.subjects }
                        numColumns={this.state.ClassDetails.subjects.length}
                        renderItem={ ({ item ,index}) => (
                            <TouchableOpacity 
                            onPress={()=>this.props.navigation.navigate('SubjectDetails', {class:this.state.ClassDetails,subject:this.state.ClassDetails.subjects[index],index:index})}
                                >
                            <LinearGradient 
                            style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                            colors={['#3498db','#1464F4']}>
                                <Text style={{fontSize:15,color:'white',fontWeight:'bold'}}>{item.subject.subject_name}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        ) }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>
                <Text style={{fontSize:20,color:'#1464F4',fontWeight:'bold',marginLeft:20,marginTop:20}}>Schedule:</Text>
                <Text style={{fontSize:15,color:'#3498db',fontWeight:'bold',marginLeft:20,marginTop:20}}>Monday:</Text>
                    <ScrollView horizontal={true} style={{flexDirection:'row',marginLeft:20,marginTop:20}}>
                        <FlatList
                            data={(this.state.ClassDetails.shedual).filter(function (entry) {
                                return entry.day === 'monday';
                            })}
                            numColumns={(this.state.ClassDetails.shedual).filter(function (entry) {
                                return entry.day === 'monday';
                            }).length}
                            renderItem={ ({ item ,index}) => (
                                <TouchableOpacity 
                                    // onPress={()=>this.props.navigation.navigate('ClassRoomDetails', this.state.column1Data[index])}
                                    >
                                <LinearGradient 
                                    style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                                    colors={['#3498db','#1464F4']}>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'700'}}>{item.starth+':'+item.startm+' To '+item.endh+':'+item.endm}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.subjectid.subject_name}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.facultyid.faculty_firstname+' '+item.facultyid.faculty_lastname}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.type}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{'For : '+item.for}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            ) }
                            keyExtractor={(item, index) => index.toString()}
                        />
                         <TouchableOpacity 
                                     onPress={()=>this.props.navigation.navigate('Shedual', {classid:this.state.class._id,day:'monday',subjects:this.state.ClassDetails.subjects,subclasses:this.state.ClassDetails.subclasses})}
                                    >
                             <LinearGradient 
                                    style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                                    colors={['#3498db','#1464F4']}>
                                    <Icon
                                    name="pluscircleo"
                                    color="white"
                                    size={40}
                                />
                                </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
                <Text style={{fontSize:15,color:'#3498db',fontWeight:'bold',marginLeft:20,marginTop:20}}>Tuesday:</Text>
                <ScrollView horizontal={true} style={{flexDirection:'row',marginLeft:20,marginTop:20}}>
                        <FlatList
                            data={(this.state.ClassDetails.shedual).filter(function (entry) {
                                return entry.day === 'tuesday';
                            })}
                            numColumns={(this.state.ClassDetails.shedual).filter(function (entry) {
                                return entry.day === 'tuesday';
                            }).length}
                            renderItem={ ({ item ,index}) => (
                                <TouchableOpacity 
                                    // onPress={()=>this.props.navigation.navigate('ClassRoomDetails', this.state.column1Data[index])}
                                    >
                                <LinearGradient 
                                    style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                                    colors={['#3498db','#1464F4']}>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'700'}}>{item.starth+':'+item.startm+' To '+item.endh+':'+item.endm}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.subjectid.subject_name}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.facultyid.faculty_firstname+' '+item.facultyid.faculty_lastname}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.type}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            ) }
                            keyExtractor={(item, index) => index.toString()}
                        />
                         <TouchableOpacity 
                                     onPress={()=>this.props.navigation.navigate('Shedual', {classid:this.state.class._id,day:'tuesday',subjects:this.state.ClassDetails.subjects,subclasses:this.state.ClassDetails.subclasses})}
                                    >
                             <LinearGradient 
                                    style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                                    colors={['#3498db','#1464F4']}>
                                    <Icon
                                    name="pluscircleo"
                                    color="white"
                                    size={40}
                                />
                                </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
                <Text style={{fontSize:15,color:'#3498db',fontWeight:'bold',marginLeft:20,marginTop:20}}>Wednesday:</Text>
                <ScrollView horizontal={true} style={{flexDirection:'row',marginLeft:20,marginTop:20}}>
                        <FlatList
                            data={(this.state.ClassDetails.shedual).filter(function (entry) {
                                return entry.day === 'wednesday';
                            })}
                            numColumns={(this.state.ClassDetails.shedual).filter(function (entry) {
                                return entry.day === 'wednesday';
                            }).length}
                            renderItem={ ({ item ,index}) => (
                                <TouchableOpacity 
                                    // onPress={()=>this.props.navigation.navigate('ClassRoomDetails', this.state.column1Data[index])}
                                    >
                                <LinearGradient 
                                    style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                                    colors={['#3498db','#1464F4']}>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'700'}}>{item.starth+':'+item.startm+' To '+item.endh+':'+item.endm}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.subjectid.subject_name}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.facultyid.faculty_firstname+' '+item.facultyid.faculty_lastname}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.type}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            ) }
                            keyExtractor={(item, index) => index.toString()}
                        />
                         <TouchableOpacity 
                                     onPress={()=>this.props.navigation.navigate('Shedual', {classid:this.state.class._id,day:'wednesday',subjects:this.state.ClassDetails.subjects,subclasses:this.state.ClassDetails.subclasses})}
                                    >
                             <LinearGradient 
                                    style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                                    colors={['#3498db','#1464F4']}>
                                    <Icon
                                    name="pluscircleo"
                                    color="white"
                                    size={40}
                                />
                                </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
                <Text style={{fontSize:15,color:'#3498db',fontWeight:'bold',marginLeft:20,marginTop:20}}>Thursday:</Text>
                <ScrollView horizontal={true} style={{flexDirection:'row',marginLeft:20,marginTop:20}}>
                        <FlatList
                            data={(this.state.ClassDetails.shedual).filter(function (entry) {
                                return entry.day === 'thursday';
                            })}
                            numColumns={(this.state.ClassDetails.shedual).filter(function (entry) {
                                return entry.day === 'thursday';
                            }).length}
                            renderItem={ ({ item ,index}) => (
                                <TouchableOpacity 
                                    // onPress={()=>this.props.navigation.navigate('ClassRoomDetails', this.state.column1Data[index])}
                                    >
                                <LinearGradient 
                                    style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                                    colors={['#3498db','#1464F4']}>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'700'}}>{item.starth+':'+item.startm+' To '+item.endh+':'+item.endm}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.subjectid.subject_name}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.facultyid.faculty_firstname+' '+item.facultyid.faculty_lastname}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.type}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            ) }
                            keyExtractor={(item, index) => index.toString()}
                        />
                         <TouchableOpacity 
                                     onPress={()=>this.props.navigation.navigate('Shedual', {classid:this.state.class._id,day:'thursday',subjects:this.state.ClassDetails.subjects,subclasses:this.state.ClassDetails.subclasses})}
                                    >
                             <LinearGradient 
                                    style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                                    colors={['#3498db','#1464F4']}>
                                    <Icon
                                    name="pluscircleo"
                                    color="white"
                                    size={40}
                                />
                                </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
                <Text style={{fontSize:15,color:'#3498db',fontWeight:'bold',marginLeft:20,marginTop:20}}>Friday:</Text>
                <ScrollView horizontal={true} style={{flexDirection:'row',marginLeft:20,marginTop:20}}>
                        <FlatList
                            data={(this.state.ClassDetails.shedual).filter(function (entry) {
                                return entry.day === 'friday';
                            })}
                            numColumns={(this.state.ClassDetails.shedual).filter(function (entry) {
                                return entry.day === 'friday';
                            }).length}
                            renderItem={ ({ item ,index}) => (
                                <TouchableOpacity 
                                    // onPress={()=>this.props.navigation.navigate('ClassRoomDetails', this.state.column1Data[index])}
                                    >
                                <LinearGradient 
                                    style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                                    colors={['#3498db','#1464F4']}>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'700'}}>{item.starth+':'+item.startm+' To '+item.endh+':'+item.endm}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.subjectid.subject_name}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.facultyid.faculty_firstname+' '+item.facultyid.faculty_lastname}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.type}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            ) }
                            keyExtractor={(item, index) => index.toString()}
                        />
                         <TouchableOpacity 
                                     onPress={()=>this.props.navigation.navigate('Shedual', {classid:this.state.class._id,day:'friday',subjects:this.state.ClassDetails.subjects,subclasses:this.state.ClassDetails.subclasses})}
                                    >
                             <LinearGradient 
                                    style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                                    colors={['#3498db','#1464F4']}>
                                    <Icon
                                    name="pluscircleo"
                                    color="white"
                                    size={40}
                                />
                                </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
                <Text style={{fontSize:15,color:'#3498db',fontWeight:'bold',marginLeft:20,marginTop:20}}>Saturday:</Text>
                <ScrollView horizontal={true} style={{flexDirection:'row',marginLeft:20,marginTop:20}}>
                        <FlatList
                            data={(this.state.ClassDetails.shedual).filter(function (entry) {
                                return entry.day === 'saturday';
                            })}
                            numColumns={(this.state.ClassDetails.shedual).filter(function (entry) {
                                return entry.day === 'saturday';
                            }).length}
                            renderItem={ ({ item ,index}) => (
                                <TouchableOpacity 
                                    // onPress={()=>this.props.navigation.navigate('ClassRoomDetails', this.state.column1Data[index])}
                                    >
                                <LinearGradient 
                                    style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                                    colors={['#3498db','#1464F4']}>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'700'}}>{item.starth+':'+item.startm+' To '+item.endh+':'+item.endm}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.subjectid.subject_name}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.facultyid.faculty_firstname+' '+item.facultyid.faculty_lastname}</Text>
                                    <Text style={{fontSize:10,color:'white',fontWeight:'800'}}>{item.type}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            ) }
                            keyExtractor={(item, index) => index.toString()}
                        />
                         <TouchableOpacity 
                                     onPress={()=>this.props.navigation.navigate('Shedual', {classid:this.state.class._id,day:'saturday',subjects:this.state.ClassDetails.subjects,subclasses:this.state.ClassDetails.subclasses})}
                                    >
                             <LinearGradient 
                                    style={{height:100,width:100,borderRadius:10,backgroundColor:'#3498db',padding:3,alignItems:'center',justifyContent:'center',marginRight:20}}
                                    colors={['#3498db','#1464F4']}>
                                    <Icon
                                    name="pluscircleo"
                                    color="white"
                                    size={40}
                                />
                                </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
                <Text style={{fontSize:20,color:'#1464F4',fontWeight:'bold',marginLeft:20,marginTop:20}}>Students:</Text>
                    <LinearGradient 
                            style={{height:30,backgroundColor:'#3498db',margin:20,borderRadius:5,justifyContent:'space-between',flexDirection:'row'}}
                            colors={['#3498db','#1464F4']}>
                            <Text style={{fontSize:15,color:'white',fontWeight:'bold',margin:5}}>There are 60 Students</Text>
                     {/* name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} */}
                     <Icon style={{marginRight:10,marginVertical:3}} name="caretdown" color="white" size={20} />
                    </LinearGradient>
                    </View>
                    :
                    <View>
                    </View>}
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
        justifyContent: 'space-between',
        marginBottom:2
    },
    fline_text1: {
        fontSize: 21,
        color: '#fff',
    },
    fline_text2: {
        fontSize: 18,
        color: '#fff',
    },
      top_text: {
        fontSize: 30,
        fontWeight:'bold',
        color: '#3498db',
        paddingLeft:20,
        paddingVertical:30,
    },
});