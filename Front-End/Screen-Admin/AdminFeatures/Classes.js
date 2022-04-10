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
export default class ShowStudentList extends React.Component{
    state = {
        ClassDetails:'',
        loader:true,
        CollageID:'',
        column1Data:'',
        column2Data:'',
        w : Dimensions.get('window').width,
        h : Dimensions.get('window').height,
    }
    componentDidMount= async() =>{
        this.setState({CollageID:await AsyncStorage.getItem('ID')});
        this. GetClassDetails();
    }
    GetClassDetails=async()=>{
        await fetch('https://collage-collaborator.herokuapp.com/GetAllClass', {  
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
                this.setState({ ClassDetails:response });
                this.setState({ column1Data:response.filter((item, i) => i%2 === 0) })
                this.setState({ column2Data:response.filter((item, i) => i%2 === 1) });
                console.log(response.filter((item, i) => i%2 === 0))
                this.setState({ loader:false });

            }
        }) 
    }
    
    render(){
        // const data=this.state.ClassDetails;
        // const column1Data = data.filter((item, i) => i%2 === 0);
        // const column2Data =data.filter((item, i) => i%2 === 1);
        return(
          <View style={{marginTop : StatusBar.currentHeight,flex:1,backgroundColor:'white'}}>
               <StatusBar  backgroundColor = '#3498db'  barStyle = 'light-content' hidden = {false} translucent = {true}/>
           {this.state.loader==false ?
             <View > 
                <LinearGradient 
                            colors={['#3498db','#1464F4']}
                            style={{height:this.state.h/4.5,borderBottomLeftRadius:50,borderBottomRightRadius:50,alignItems:'center',justifyContent:'center'}}
                >
                   <Text style={styles.top_text}>ClassRooms</Text>
                   <Text style={{color:'white'}}>{'Total Classes: '+this.state.ClassDetails.length}</Text>
                </LinearGradient>
                {this.state.StudentDetails != ''?
                <View style={{flexDirection:'row',marginTop:50}}>
                    <View style={{flexDirection:'column',width:this.state.w/2,alignItems:'center'}}>
                        <FlatList
                            data={ this.state.column1Data }
                            renderItem={ ({ item ,index}) => (
                                <TouchableOpacity 
                                    onPress={()=>this.props.navigation.navigate('ClassRoomDetails', this.state.column1Data[index])}
                                 >
                                <LinearGradient 
                                    colors={['#3498db','#1464F4']}
                                    style={{height:(this.state.w/2)-30,width:(this.state.w/2)-30,borderRadius:10,alignItems:'center',justifyContent:'center',padding:5,marginBottom:15}}
                                 >
                                      <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{ item.classname }</Text>
                                     <Text style={{color:'white',fontSize:13,fontWeight:'500'}}>{ item.program }</Text>
                                     <Text style={{color:'white',fontSize:13,fontWeight:'500'}}>{ item.course }</Text>
                                     <Text style={{color:'white',fontSize:13,fontWeight:'500'}}>{'Sem: '+ item.semester+'   &   Year: '+item.year }</Text>
                                 </LinearGradient>
                                 </TouchableOpacity>
                            ) }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={{flexDirection:'column',width:this.state.w/2,alignItems:'center'}}>
                        <FlatList
                            data={ this.state.column2Data }
                            renderItem={ ({ item ,index}) => (
                                <TouchableOpacity 
                                    onPress={()=>this.props.navigation.navigate('ClassRoomDetails',this.state.column2Data[index])}
                                 >
                                <LinearGradient 
                                    colors={['#3498db','#1464F4']}
                                    style={{height:(this.state.w/2)-30,width:(this.state.w/2)-30,borderRadius:10,alignItems:'center',justifyContent:'center',padding:5,marginBottom:15}}
                                 >
                                     <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{ item.classname }</Text>
                                     <Text style={{color:'white',fontSize:13,fontWeight:'500'}}>{ item.program }</Text>
                                     <Text style={{color:'white',fontSize:13,fontWeight:'500'}}>{ item.course }</Text>
                                     <Text style={{color:'white',fontSize:13,fontWeight:'500'}}>{'Sem: '+ item.semester+'   &   Year: '+item.year }</Text>
                                 </LinearGradient>
                                 </TouchableOpacity>
                            ) }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
                :
                 <View>
                    <Text>Empty</Text>
                 </View>
                }
               
                   
                        <LinearGradient 
                            colors={['#3498db','#1464F4']}
                            style={{position:'absolute',marginTop:this.state.h-StatusBar.currentHeight-50,marginLeft:this.state.w/2-25,borderRadius:30,height:50,width:50,alignItems:'center',justifyContent:'center'}}
                        >
                            <TouchableOpacity 
                              onPress={()=>this.props.navigation.navigate('CreateClass')}
                             >
                                <Icon
                                    name="pluscircleo"
                                    color="white"
                                    size={20}
                                />
                             </TouchableOpacity>
                        </LinearGradient>
                   
             
             </View>   
             :
             <View>
                 <Text>Loader Running</Text>
             </View>
           }
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
        fontSize: 18,
        color: '#fff',
    },
      top_text: {
        fontSize: 30,
        fontWeight:'bold',
        color: 'white',
    },
});