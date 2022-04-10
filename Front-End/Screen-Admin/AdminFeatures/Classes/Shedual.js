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
import RadioForm from 'react-native-simple-radio-button';
export default class Shedual extends React.Component{
    state = {
       w : Dimensions.get('window').width,
       h : Dimensions.get('window').height,
       loader:false,
       ClassDetails:this.props.route.params,
       starth:'',
       startm:'',
       endh:'',
       endm:'',
       Subjects:'',
       subjectid:'',
       facultyid:'',
       subjectfaculty:this.props.route.params.subjects[0],
       type:'',
       hour:[
        { label: '01', value: '1' },
        { label: '02', value: '2' },
        { label: '03', value: '3' },
        { label: '04', value: '4' },
        { label: '05', value: '5' },
        { label: '06', value: '6' },
        { label: '07', value: '7' },
        { label: '08', value: '8' },
        { label: '09', value: '9' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' },
        { label: '15', value: '15' },
        { label: '16', value: '16' },
        { label: '17', value: '17' },
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' },
        { label: '21', value: '21' },
        { label: '22', value: '22' },
        { label: '23', value: '23' },
        { label: '24', value: '24' },
       ],
       min:[
        { label: '00', value: '0' },
        { label: '05', value: '5' },
        { label: '10', value: '10' },
        { label: '15', value: '15' },
        { label: '20', value: '20' },
        { label: '25', value: '25' },
        { label: '30', value: '30' },
        { label: '35', value: '35' },
        { label: '40', value: '40' },
        { label: '45', value: '45' },
        { label: '50', value: '50' },
        { label: '55', value: '55' },
       ],
       flag:'',
       subclass:'',

    }
    componentDidMount= async() =>{
        // this.setState({CollageID:await AsyncStorage.getItem('ID')});
    //   this.GetSubjectsDetails();
    }
    GetSubjectsDetails=async()=>{
        // this.setState({ Subjects:this. });
        this.setState({ subjectfaculty:response[0] });
        this.setState({ loader:false });
    }
    UpdateShedual=async()=>{
        this.setState({ loader:true });
        var a='';
        if(this.state.flag=='0'){
            a='B'
        }
        else{
            a=this.state.subclass;
        }
        await fetch('https://collage-collaborator.herokuapp.com/UpdateShedual', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                _id:this.state.ClassDetails.classid,
                day:this.state.ClassDetails.day,
                starth:this.state.starth,
                startm:this.state.startm,
                endh:this.state.endh,
                endm:this.state.endm,
                subjectid:this.state.subjectid,
                facultyid:this.state.facultyid,
                type:this.state.type,
                for:a

            })  
        }).then((resp)=>resp.json())
        .then((response)=>{
            console.log(response)
            if(response=='1'){
              this.setState({ loader:false });
              this.props.navigation.navigate('ClassRoomDetails')
            }
            else{
              Snackbar.show({text: 'Server did not Respond, Try Again Later...',duration: Snackbar.LENGTH_SHORT });
              this.setState({ loader:false });
              this.props.navigation.navigate('ClassRoomDetails')
            }
        }) 
    }
    render(){
        return(
            <View style={{flex:1}}>
            {this.state.loader==false?
            
        <LinearGradient 
        style={{justifyContent:'center',alignItems:'center',flex:2,padding:10,marginTop:StatusBar.currentHeight}}
        colors={['#3498db','#1464F4']}>
            <StatusBar  backgroundColor = "#3498db"  barStyle = 'light-content' hidden = {false} translucent = {true}/> 
            <ScrollView>
            <View style={{width:this.state.w-20,backgroundColor:'white',padding:10,borderRadius:10}}>
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:20,color:'#1464F4',fontWeight:'bold',alignItems:'center'}}>{this.state.ClassDetails.day}</Text>
                </View>
                <Text style={{fontSize:15,color:'#1464F4',fontWeight:'700',alignItems:'center',marginBottom:5}}>Duration:</Text>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <DropDownPicker
                        placeholder="hh"
                        items={this.state.hour}
                        containerStyle={{ height: 30,width:100}}
                        style={{pading:2}}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => (
                            this.setState({ starth: item.value})
                        )}
                    />
                    <Text style={{fontSize:30}}> : </Text>
                    <DropDownPicker
                        placeholder="mm"
                        items={this.state.min}
                        containerStyle={{ height: 30,width:100}}
                        style={{pading:2}}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => (
                            this.setState({ startm: item.value})
                        )}
                    />
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:15,color:'#1464F4',fontWeight:'700',alignItems:'center',marginBottom:5}}>To</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <DropDownPicker
                        placeholder="hh"
                        items={this.state.hour}
                        containerStyle={{ height: 30,width:100}}
                        style={{pading:2}}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => (
                            this.setState({ endh: item.value})
                        )}
                    />
                    <Text style={{fontSize:30}}> : </Text>
                    <DropDownPicker
                        placeholder="mm"
                        items={this.state.min}
                        containerStyle={{ height: 30,width:100}}
                        style={{pading:2}}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => (
                            this.setState({ endm: item.value})
                        )}
                    />
                </View>
                <Text style={{fontSize:15,color:'#1464F4',fontWeight:'700',alignItems:'center',marginBottom:20}}>Subject:</Text>
                <DropDownPicker
                    placeholder="Select"
                    searchable={false}
                    containerStyle={{ height: 30 }}
                    style={styles.textInput}
                    items={this.state.ClassDetails.subjects.map(item=>({label:item.subject.subject_name+" ("+item.subject.subject_code+")",value:item.subject._id}))}

                    itemStyle={{
                            justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={(item) => {
                        this.setState({subjectid: item.value })
                        for(var i=0;i<this.state.ClassDetails.subjects.length;i++){
                            if(this.state.ClassDetails.subjects[i].subject._id==item.value){
                                this.setState({subjectfaculty: this.state.ClassDetails.subjects[i] })
                            }
                        }
                      }}
                />
                <Text style={{fontSize:15,color:'#1464F4',fontWeight:'700',alignItems:'center',marginBottom:20,marginTop:5}}>Lecturer:</Text>
                <DropDownPicker
                    placeholder="Select"
                    searchable={false}
                    containerStyle={{ height: 30 }}
                    style={styles.textInput}
                    items={this.state.subjectfaculty.facultys.map(item=>({label:item.faculty_firstname+" "+item.faculty_lastname,value:item._id}))}

                    
                    itemStyle={{
                            justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={(item) => {
                        this.setState({facultyid: item.value })
                      }}
                />
                <Text style={{fontSize:15,color:'#1464F4',fontWeight:'700',alignItems:'center',marginBottom:20,marginTop:5}}>Type:</Text>
                <DropDownPicker
                    placeholder="Select"
                    items={[
                        { label: 'Lecture', value: 'Lecture' },
                        { label: 'Laboratory', value: 'Laboratory' },
                    ]}
                    containerStyle={{ height: 30 }}
                    style={styles.textInput}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => (
                        this.setState({type: item.value})
                    )}
                />
                 <RadioForm
                        style={{marginTop: 20,marginBottom:20}}
                        radio_props={[
                            {label: "For All Class", value: '0' },
                            {label: 'Specific SubClass', value: '1' },  
                            ]}
                            initial={this.state.flag}
                        formHorizontal={false}
                        onPress={(value) => {this.setState({flag:value})}}
                    />
                    {this.state.flag=='1'?
                     <DropDownPicker
                     placeholder="Select"
                     searchable={false}
                     containerStyle={{ height: 30 }}
                     style={styles.textInput}
                     items={this.state.ClassDetails.subclasses.map(item=>({label:item.subclassname,value:item.subclassname}))}
 
                     
                     itemStyle={{
                             justifyContent: 'flex-start',
                     }}
                     dropDownStyle={{ backgroundColor: '#fafafa' }}
                     onChangeItem={(item) => {
                         this.setState({subclass: item.value })
                       }}
                />
                :
                <View></View>
                    }
                <TouchableOpacity
                       style={styles.signIn}
                        onPress={() => this.UpdateShedual()}
                   >
                       <LinearGradient
                            colors={['#3498db','#1464F4']}
                           style={styles.signIn}
                       >
                           <Text style={[styles.textSign, {
                               color: '#fff'
                           }]} >Save</Text>
                       </LinearGradient>
                   </TouchableOpacity>
                <Text></Text>
            </View>
            </ScrollView>
        </LinearGradient>
        
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
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop:20
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    
});