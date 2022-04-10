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
export default class MySubject extends React.Component{
    state = {
        Classes:'',
        Subject:this.props.route.params,
        loader:true,
        FacutyID:'',
        CollageID:'',
        w : Dimensions.get('window').width,
        h : Dimensions.get('window').height,
    }
    componentDidMount= async() =>{
        this.setState({FacutyID:await AsyncStorage.getItem('ID')});
        this.setState({CollageID:JSON.parse(await AsyncStorage.getItem('Details'))[0].collage_id});
        this.GetMySubjectClassesDetails();
    }
    GetMySubjectClassesDetails=async()=>{
        await fetch('https://collage-collaborator.herokuapp.com/GetMySubjectClasses', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                collage_id:this.state.CollageID,
                faculty_id:this.state.FacutyID,
                subject_id:this.state.Subject._id
            })  
        }).then((resp)=>resp.json())
        .then((response)=>{
            console.log(response);
            if(response=='0'){
                Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
            }
            else{
                this.setState({ Classes:response });
                this.setState({ loader:false });

            }
        }) 
    }
    
    render(){
        return(
          <View style={{marginTop : StatusBar.currentHeight,flex:1,backgroundColor:'white'}}>
               <StatusBar  backgroundColor = '#3498db'  barStyle = 'light-content' hidden = {false} translucent = {true}/>
           {this.state.loader==false ? 
        <View > 
        <LinearGradient 
                    colors={['#3498db','#1464F4']}
                    style={{height:this.state.h/4.5,borderBottomLeftRadius:50,borderBottomRightRadius:50,alignItems:'center',justifyContent:'center'}}
        >
            <Text style={styles.top_text}>{this.state.Subject.subject_name+"'s Classes"}</Text>
            <Text style={{color:'white'}}>{'Total Classes: '+this.state.Classes.length}</Text>
        </LinearGradient>
        {this.state.Classes != ''?
        <View style={{alignItems:'center',justifyContent:'center',marginTop:50}}>
            <FlatList
                    data={ this.state.Classes }
                    numColumns={2}
                    renderItem={ ({ item ,index}) => (
                        <TouchableOpacity 
                            
                       
                            >
                        <LinearGradient 
                            colors={['#3498db','#1464F4']}
                            style={{height:(this.state.w/2)-30,width:(this.state.w/2)-30,borderRadius:10,alignItems:'center',justifyContent:'center',padding:5,marginBottom:15,marginHorizontal:5}}
                            >
                                <Text style={{color:'white',fontSize:17,fontWeight:'bold'}}>{ item.classname }</Text>
                                <Text style={{color:'white',fontSize:13,fontWeight:'500'}}>{ item.program }</Text>
                                <Text style={{color:'white',fontSize:13,fontWeight:'500'}}>{ item.course }</Text>
                                <Text style={{color:'white',fontSize:13,fontWeight:'500'}}>{"Year: "+ item.year+"  &  Sem: "+item.semester }</Text>
                            </LinearGradient>
                            </TouchableOpacity>
                    ) }
                    keyExtractor={(item, index) => index.toString()}
                />
                </View>
                :
                 <View>
                    <Text>Empty</Text>
                 </View>
                }
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
        fontSize: 20,
        fontWeight:'bold',
        color: 'white',
    },
});