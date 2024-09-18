import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import TabNavigator from './tab';

//before login onboarding stack
import Splash from '../screen/Splash';
import SearchDoc from '../screen/IntroScreen/SearchDoc';
import BookAppointment from '../screen/IntroScreen/BookAppointment';
import BookDiagonostic from '../screen/IntroScreen/BookDiagonostic';
import SignIn from '../screen/SignIn';
import SelectRole from '../screen/SelectRole';
import PhoneSignIn from '../screen/PhoneSignIn';
import PhoneAuth from '../screen/PhoneAuth';
import PhoneSignInVerify from '../screen/PhoneSignInVerify';
import UpdateUser from '../screen/UpdateUser/index';

// after login patient stack
import HomeScreen from '../screen/HomeScreen';
import SearchScreen from '../screen/SearchScreen';
import Filter from '../screen/Filter/index';
import HospitalDetailsScreen from "../screen/HospitalDetailsScreen/index";
import DoctorDetailsScreen from '../screen/DoctorDetailsScreen/index';
import DoctorBookFirst from '../screen/DoctorBookFirst/index'
import DoctorBookSecond from '../screen/DoctorBookSecond/index'
import DoctorBookFinal from '../screen/DoctorBookFinal/index'
import Account from '../screen/Account';
import MedicalRecords from '../screen/MedicalRecords/index';
import MyDoctors from '../screen/MyDoctors/index';
import Chat from '../screen/Chat';
import ChatSpecific from '../screen/ChatSpecific';
import CreatePostScreen from '../screen/CreatePostScreen/index';
import ForumScreen from '../screen/ForumScreen/index';
import ViewPost from '../screen/View Post/index';
import SignUpDetail from '../screen/SignUpDetail';
import BottomNavContainer from '../component/BottomNav';
import HealthInterust from '../screen/HealthInterust/index';
import Reminders from '../screen/Reminders/index';
import MedicineDescription from '../screen/MedicineDescription/index';
import ChangeSchedule from '../screen/ChangeSchedule/index';
import OnBoardingScreens from '../screen/OnBoardingScreens/Index';
import { DrawerNavigator } from './rootNavigator';
import FullImage from '../screen/ShowImage/index';
import Inbox from '../screen/Inbox';
import Gallery from '../screen/Gallery';
import DoctorDashboard from '../screen/DoctorDashboardScreen';
import MySchedule from '../screen/MySchedule/index';
import EditSchedule from '../screen/EditSchedule/index';
import Appointments from '../screen/appointments/index';
import ModalPopUp from '../component/wholeScreenModal/index'
import MyAllergies from '../screen/MyAllergies';
import AddAllergy from '../screen/AddAllergy';
import AddMedicalRecords from '../screen/AddMedicalRecord';
import { SCREEN_NAMES } from '../helper/Constant';
import Feedback from '../screen/Feedback';
import PostDetails from '../screen/View Post/index';

const Stack = createStackNavigator();
const OnboardingStack = createStackNavigator();
const PatientStack = createStackNavigator();

const SplashStack = createStackNavigator();
const TutorialStack = createStackNavigator();
const SignInStack = createStackNavigator();
const HomeForPatientStack = createStackNavigator();
const ChatStack = createStackNavigator();
const PatientAccountStack = createStackNavigator();
const HomeForDoctorStack = createStackNavigator();
const DoctorAccountStack = createStackNavigator();
const ForumStack = createStackNavigator();


export const SplashStackNavigator = () => {
  return (
    <SplashStack.Navigator screenOptions={{ headerShown: false }}>
      <SplashStack.Screen name={SCREEN_NAMES.Splash} component={Splash} />
    </SplashStack.Navigator>
  )
}

export const TutorialStackNavigator = () => {
  return (
    <TutorialStack.Navigator screenOptions={{ headerShown: false }}>
      <TutorialStack.Screen name={SCREEN_NAMES.Tutorial} component={OnBoardingScreens} />
    </TutorialStack.Navigator>
  )
}

export const SignInStackNavigator = () => {
  return (
    <SignInStack.Navigator screenOptions={{ headerShown: false }}>
      <SignInStack.Screen name={SCREEN_NAMES.SignIn} component={SignIn} />
      <SignInStack.Screen name={SCREEN_NAMES.PhoneAuth} component={PhoneAuth} />
      <SignInStack.Screen name={SCREEN_NAMES.UpdateProfile} component={UpdateUser} />
    </SignInStack.Navigator>
  )
}

export const HomeForPatientStackNavigator = () => {
  return (
    <HomeForPatientStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeForPatientStack.Screen name={SCREEN_NAMES.Home} component={HomeScreen} />
      <HomeForPatientStack.Screen name={SCREEN_NAMES.FilterResult} component={SearchScreen} />
      <HomeForPatientStack.Screen name={SCREEN_NAMES.Filters} component={Filter} />
      <HomeForPatientStack.Screen name={SCREEN_NAMES.HospitalDetail} component={HospitalDetailsScreen} />
      <HomeForPatientStack.Screen name={SCREEN_NAMES.DoctorDetail} component={DoctorDetailsScreen} />
      <HomeForPatientStack.Screen name={SCREEN_NAMES.FeedbackDetail} component={Feedback} />
      <HomeForPatientStack.Screen name={SCREEN_NAMES.DoctorBooking} component={DoctorBookFirst} />
    </HomeForPatientStack.Navigator>
  )
}

export const ChatStackNavigator = () => {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name={SCREEN_NAMES.Inbox} component={Inbox} />
      <ChatStack.Screen name={SCREEN_NAMES.ChatSpecific} component={ChatSpecific} />
      <ChatStack.Screen name={SCREEN_NAMES.ImageDetail} component={FullImage} />
    </ChatStack.Navigator>
  )
}

export const PatientAccountStackNavigator = () => {
  return (
    <PatientAccountStack.Navigator screenOptions={{ headerShown: false }}>
      <PatientAccountStack.Screen name={SCREEN_NAMES.Account} component={Account} />
      <PatientAccountStack.Screen name={SCREEN_NAMES.Appointment} component={Appointments} />
      <PatientAccountStack.Screen name={SCREEN_NAMES.MedicalRecord} component={MedicalRecords} />
      <PatientAccountStack.Screen name={SCREEN_NAMES.MyDoctors} component={MyDoctors} />
      <PatientAccountStack.Screen name={SCREEN_NAMES.MyAllergies} component={MyAllergies} />
      <PatientAccountStack.Screen name={SCREEN_NAMES.AddAllergy} component={AddAllergy} />
      <PatientAccountStack.Screen name={SCREEN_NAMES.UpdateProfile} component={UpdateUser} />
      <PatientAccountStack.Screen name={SCREEN_NAMES.Gallery} component={Gallery} />
      <PatientAccountStack.Screen name={SCREEN_NAMES.ChatSpecific} component={ChatSpecific} />
      <PatientAccountStack.Screen name={SCREEN_NAMES.DoctorDetail} component={DoctorDetailsScreen} />
      <HomeForDoctorStack.Screen name={SCREEN_NAMES.AddMedicalRecord} component={AddMedicalRecords} />
    </PatientAccountStack.Navigator>
  )
}

export const HomeForDoctorStackNavigator = () => {
  return (
    <HomeForDoctorStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeForDoctorStack.Screen name={SCREEN_NAMES.DoctorDashboard} component={DoctorDashboard} />
      <HomeForDoctorStack.Screen name={SCREEN_NAMES.MedicalRecord} component={MedicalRecords} />
      <HomeForDoctorStack.Screen name={SCREEN_NAMES.AddMedicalRecord} component={AddMedicalRecords} />
      <HomeForDoctorStack.Screen name={SCREEN_NAMES.Gallery} component={Gallery} />
      <HomeForDoctorStack.Screen name={SCREEN_NAMES.MyAllergies} component={MyAllergies} />
      <HomeForDoctorStack.Screen name={SCREEN_NAMES.ChatSpecific} component={ChatSpecific} />
    </HomeForDoctorStack.Navigator>
  )
}

export const DoctorAccountStackNavigator = () => {
  return (
    <DoctorAccountStack.Navigator screenOptions={{ headerShown: false }}>
      <PatientAccountStack.Screen name={SCREEN_NAMES.Account} component={Account} />
      <DoctorAccountStack.Screen name={SCREEN_NAMES.Appointment} component={Appointments} />
      <DoctorAccountStack.Screen name={SCREEN_NAMES.MyDoctors} component={MyDoctors} />
      <DoctorAccountStack.Screen name={SCREEN_NAMES.Schedule} component={MySchedule} />
      <DoctorAccountStack.Screen name={SCREEN_NAMES.EditSchedule} component={EditSchedule} />
      <DoctorAccountStack.Screen name={SCREEN_NAMES.UpdateProfile} component={UpdateUser} />
      <DoctorAccountStack.Screen name={SCREEN_NAMES.ChatSpecific} component={ChatSpecific} />
      <DoctorAccountStack.Screen name={SCREEN_NAMES.MyAllergies} component={MyAllergies} />
      <DoctorAccountStack.Screen name={SCREEN_NAMES.MedicalRecord} component={MedicalRecords} />
    </DoctorAccountStack.Navigator>
  )
}

export const ForumStackNavigator = () => {
  return (
    <ForumStack.Navigator screenOptions={{ headerShown: false }}>
      <ForumStack.Screen name={SCREEN_NAMES.Forum} component={ForumScreen} />
      <ForumStack.Screen name={SCREEN_NAMES.CreatePost} component={CreatePostScreen} />
      <ForumStack.Screen name={SCREEN_NAMES.PostDetail} component={PostDetails} />
      <ForumStack.Screen name={SCREEN_NAMES.Gallery} component={Gallery} />
      <ForumStack.Screen name={SCREEN_NAMES.ImageDetail} component={FullImage} />
    </ForumStack.Navigator>
  )
}
