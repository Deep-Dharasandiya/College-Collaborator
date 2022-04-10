import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class Register extends React.Component{
    render(){
        return(
        <View style={styles.container}>
        <StatusBar  backgroundColor = "white"  barStyle = 'dark-content' hidden = {false} translucent = {true}/> 
    


        <Animatable.View
            animation="fadeInUpBig"
            style={styles.bottom}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.top_text}>Register</Text>
                <Text style={styles.top_subtext}>Select one entity to Register</Text>
                <TouchableOpacity 
                    style={styles.middle}
                    onPress={()=>this.props.navigation.navigate('RegisterFacultys')}
                >
                <View >
                    <View style={styles.card}>
                        <Text style={styles.name}>Faculty</Text>
                        <View style={styles.subject}>
                            <Icon
                                name="arrow-forward"
                                color="#fff"
                                size={30}
                            />
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.middle}
                    onPress={()=>this.props.navigation.navigate('RegisterStudents')}
                >
                <View style={styles.middle}>
                    <View style={styles.card}>
                        <Text style={styles.name}>Student</Text>
                        <View style={styles.subject}>
                            <Icon
                                name="arrow-forward"
                                color="#fff"
                                size={30}
                            />
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.middle}
                    onPress={()=>this.props.navigation.navigate('RegisterSubjects')}
                >
                <View style={styles.middle}>
                    <View style={styles.card}>
                        <Text style={styles.name}>Subjects</Text>
                        <View style={styles.subject}>
                            <Icon
                                name="arrow-forward"
                                color="#fff"
                                size={30}
                            />
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
            </ScrollView>
        </Animatable.View>

        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    top: {
        flex: 1,
        height: '10%',
        width: '100%',
        backgroundColor: '#3498db',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    top_icon:
    {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    top_text: {
        fontSize: 30,
        fontWeight:'bold',
        color: '#3498db'
    },
    top_subtext: {
        fontSize: 15,
        color: '#000',
        paddingBottom:100,
    },
    top_circle_position: {
        flexDirection: 'row',
        paddingTop: 10
    },
    top_circle: {
        height: 130,
        width: '35%',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        borderRadius: 100,
        paddingVertical: 10,
        marginTop: 10

    },
    top_circle_title: {
        fontSize: 25,
        color: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 1
    },
    top_circle_right_position: {
        flexDirection: 'column',



    },
    top_circle_right_text: {
        fontSize: 40,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingHorizontal: 70,
        color: '#fff'
    },
    top_circle_right_smalltext: {
        fontSize: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingHorizontal: 50,
        paddingVertical: 15,
        color: '#fff'
    },

    bottom: {
        height: '92%',
        width: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 40,

    },
    middle:
    {
        height: 150,
        width: '100%',
        flexDirection: 'row',
        padding: 5
    },

    card: {
        height: 110,
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#3498db',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row'
    },
    name: {
        fontSize: 25,
        color: '#fff'

    },
    subject: {
        flexDirection: 'column',
        paddingLeft: 150
    },
    subject_name: {
        fontSize: 20,

    }

});