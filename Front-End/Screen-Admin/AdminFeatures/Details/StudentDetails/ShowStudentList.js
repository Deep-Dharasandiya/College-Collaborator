import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
export default class ShowStudentList extends React.Component{
    state = {
        StudentDetails:'',
        loader:true,
        CollageID:'',
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
    render(){
        return(
          <View>
           {this.state.loader==false ?
             <View>
                {this.state.StudentDetails != ''?
                 <View   style={{marginTop:50}}>
                    {
                    this.state.StudentDetails.map((item, index) => (
                        <ScrollView>
                        <TouchableOpacity
                            key = {item._id}
                        >
                            <View style={{marginVertical:4,paddingVertical:10,paddingHorizontal:10,marginHorizontal:10, backgroundColor: '#3498db', borderRadius: 30}}>
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
                            </View>
                        </TouchableOpacity>
                        </ScrollView>
                    ))
                    }
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
});