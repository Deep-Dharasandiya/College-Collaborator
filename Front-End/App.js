import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './SignIn'
import AdminRegister from './Screen-Admin/AdminRegister';
import AdminHome from './Screen-Admin/AdminHome';
import FacultyHome from './Screen-Faculty/FacultyHome';
import StudentHome from './Screen-Student/StudentHome';
import CollageDetails from './Screen-Admin/CollageDetails';
import RegisterStudents from './Screen-Admin/AdminFeatures/Register/RegisterStudents';
import RegisterFacultys from './Screen-Admin/AdminFeatures/Register/RegisterFacultys';
import Auth from './Auth';
import AdminFeatures from './Screen-Admin/AdminFeatures';
import Register from './Screen-Admin/AdminFeatures/Register';
import Details from './Screen-Admin/AdminFeatures/Details';
import ShowStudentList from './Screen-Admin/AdminFeatures/Details/StudentDetails/ShowStudentList';
import ShowFacultyList from './Screen-Admin/AdminFeatures/Details/FacultyDetails/ShowFacultyList';
import Classes from './Screen-Admin/AdminFeatures/Classes';
import CreateClass from './Screen-Admin/AdminFeatures/Classes/CreateClass';
import RegisterSubjects from './Screen-Admin/AdminFeatures/Register/RegisterSubjects'
import FacultyFeatures from './Screen-Faculty/FacultyFeatuers'
import StudentFeatures from './Screen-Student/StudentFeatuers'
import ClassRoomDetails from './Screen-Admin/AdminFeatures/Classes/ClassRoomDetails'
import SubClassDetails from './Screen-Admin/AdminFeatures/Classes/SubClassDetails'
import SubjectDetails from './Screen-Admin/AdminFeatures/Classes/SubjectDetails'
import Shedual from './Screen-Admin/AdminFeatures/Classes/Shedual'
import MySubject from './Screen-Faculty/FacultyFeatures/MySubject/MySubject'
import MySubjectClass from './Screen-Faculty/FacultyFeatures/MySubject/MySubjectClass'
import Attendance from './Screen-Faculty/Attendance'
import ShowLectureForAttendance from './Screen-Faculty/Attendance/ShowLectureForAttendance'
import TakeAttendance from './Screen-Faculty/Attendance/TakeAttendance'
import ShowAttendance from './Screen-Faculty/Attendance/ShowAttendance'
import ShowLectureForShowAttendance from './Screen-Faculty/Attendance/ShowLectureForShowAttendance'
const Stack = createStackNavigator();

export default class App extends React.Component{
 
  render(){
      return (
        <NavigationContainer>
                <Stack.Navigator>
                <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}}/>
                <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
                <Stack.Screen name="AdminRegister" component={AdminRegister} options={{headerShown: false}}/>
                <Stack.Screen name="AdminHome" component={AdminHome} options={{headerShown: false}}/>
                <Stack.Screen name="CollageDetails" component={CollageDetails} options={{headerShown: false}}/>
                <Stack.Screen name="RegisterStudents" component={RegisterStudents} options={{headerShown: false}}/>
                <Stack.Screen name="RegisterFacultys" component={RegisterFacultys} options={{headerShown: false}}/>
                <Stack.Screen name="FacultyHome" component={FacultyHome} options={{headerShown: false}}/>
                <Stack.Screen name="StudentHome" component={StudentHome} options={{headerShown: false}}/>
                <Stack.Screen name="AdminFeatures" component={AdminFeatures} options={{headerShown: false}}/>
                <Stack.Screen name="FacultyFeatures" component={FacultyFeatures} options={{headerShown: false}}/>
                <Stack.Screen name="StudentFeatures" component={StudentFeatures} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                <Stack.Screen name="Details" component={Details} options={{headerShown: false}}/>
                <Stack.Screen name="ShowStudentList" component={ShowStudentList} options={{headerShown: false}}/>
                <Stack.Screen name="ShowFacultyList" component={ShowFacultyList} options={{headerShown: false}}/>
                <Stack.Screen name="Classes" component={Classes} options={{headerShown: false}}/>
                <Stack.Screen name="CreateClass" component={CreateClass} options={{headerShown: false}}/>
                <Stack.Screen name="RegisterSubjects" component={RegisterSubjects} options={{headerShown: false}}/>
                <Stack.Screen name="ClassRoomDetails" component={ClassRoomDetails} options={{headerShown: false}}/>
                <Stack.Screen name="SubClassDetails" component={SubClassDetails} options={{headerShown: false}}/>
                <Stack.Screen name="SubjectDetails" component={SubjectDetails} options={{headerShown: false}}/>
                <Stack.Screen name="Shedual" component={Shedual} options={{headerShown: false}}/>


                
                <Stack.Screen name="MySubject" component={MySubject} options={{headerShown: false}}/>
                <Stack.Screen name="MySubjectClass" component={MySubjectClass} options={{headerShown: false}}/>
                <Stack.Screen name="Attendance" component={Attendance} options={{headerShown: false}}/>
                <Stack.Screen name="ShowLectureForAttendance" component={ShowLectureForAttendance} options={{headerShown: false}}/>
                <Stack.Screen name="TakeAttendance" component={TakeAttendance} options={{headerShown: false}}/>
                <Stack.Screen name="ShowAttendance" component={ShowAttendance} options={{headerShown: false}}/>
                <Stack.Screen name="ShowLectureForShowAttendance" component={ShowLectureForShowAttendance} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
      );
    
  }
}
