import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';
export default class SignIn extends React.Component {
  state = {
    loader: false,
    email: '',
    password: '',
    password_secure: true,
  };
  handleEmail = text => {
    this.setState({email: text});
  };
  handlePassword = text => {
    this.setState({password: text});
  };
  componentDidMount() {
    SplashScreen.hide();
  }

  signin = async () => {
    if (this.state.email != '' && this.state.password != '') {
      this.setState({loader: true});
      await AsyncStorage.setItem('auth', 'Not');
      await fetch('https://collage-collaborator.herokuapp.com/SignIn', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then(resp => resp.json())
        .then(async response => {
          console.log(response);
          if (response == '0') {
            Snackbar.show({
              text: 'Server did not Respond, Try Again Later...',
              duration: Snackbar.LENGTH_SHORT,
            });
          } else if (response == '1') {
            Alert.alert('Warning!!!', 'User Dose Not Exist...', [{text: 'OK'}]);
            this.setState({loader: false});
          } else {
            await AsyncStorage.setItem('auth', response[0]['role']);
            await AsyncStorage.setItem('ID', response[0]['_id']);
            await AsyncStorage.setItem('Details', JSON.stringify(response));
            this.setState({loader: false});
            Snackbar.show({
              text: 'Welcome!!!',
              duration: Snackbar.LENGTH_SHORT,
            });
            if (response[0]['role'] == 'admin') {
              this.props.navigation.navigate('AdminHome');
            }
            if (response[0]['role'] == 'student') {
              this.props.navigation.navigate('StudentHome');
            }
            if (response[0]['role'] == 'faculty') {
              this.props.navigation.navigate('FacultyHome');
            }
          }
        });
    } else {
      Alert.alert('Warning!!!', 'Please Enter All The Details...', [
        {text: 'OK'},
      ]);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#3498db"
          barStyle="light-content"
          hidden={false}
          translucent={true}
        />
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome!</Text>
        </View>

        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <Text style={[styles.text_footer]}>Username</Text>
            <View style={styles.action}>
              <Icon name="person" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Username"
                placeholderTextColor="#a6a6a6"
                style={styles.textInput}
                onChangeText={this.handleEmail}
                autoCapitalize="none"
              />
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}>
              Password
            </Text>
            <View style={styles.action}>
              <Icon name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Password"
                secureTextEntry={this.state.password_secure}
                style={styles.textInput}
                onChangeText={this.handlePassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => {
                  if (this.state.password_secure == true) {
                    this.setState({password_secure: false});
                  } else {
                    this.setState({password_secure: true});
                  }
                }}>
                <Icon name="visibility" color="black" size={20} />
              </TouchableOpacity>
            </View>

            {this.state.loader == false ? (
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => this.signin()}>
                  <LinearGradient
                    colors={['#3498db', '#A6BDF5']}
                    style={styles.signIn}>
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: '#fff',
                        },
                      ]}>
                      Login
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.button}>
                <Text>Loader</Text>
              </View>
            )}

            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AdminRegister')}
                style={[
                  styles.logIn,
                  {
                    borderColor: '#344955',

                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}>
                <Text style={styles.textSign1}>Create Account As Admin!</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#000000',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  logIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#383838',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
