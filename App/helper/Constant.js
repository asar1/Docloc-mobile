/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
// @flow

import { Dimensions } from 'react-native';

export const BASE_URL = 'http://192.168.10.2:5000/api/';
export const BASE_HOST_URL = 'http://192.168.10.2:5000/';
export const IMAGE_BASE_URL = 'http://www.aromaticfragrances.com/TestApp/public/project-assets/uploaded/images/';
export const TEM_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJxZnpia2ZAZ21haWwuY29tIiwiX2lkIjoiNWZhODM5YjBkYjY4ZDUwMDJhN2YzNmRiIiwicm9sZSI6InVzZXIiLCJ1aWQiOiJ0WkpvVkZTSWc2aDRaalRaMjE0cDltMFl2SXIxIiwiaWF0IjoxNjI5MDA2OTk0LCJleHAiOjE2MzMwMDY1OTR9.iTGq1VArfz73PbPHWVOiY733bEh2oBpjKiSObSFE0A8';

export const SCREEN = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};
export const TOKEN = "TOKENSAVE";
export const USERID = "USERID";
export const USERDETAIL = "USERDETAIL";
export const ATTENTEDTUTORIAL = "ATTENTEDTUTORIAL";
export const USERROLE = "USERROLE";
export const isIphoneXorAbove = (SCREEN.height === 812 || SCREEN.width === 812 || (SCREEN.height === 896 || SCREEN.width === 896)) ? true : false;

export const PopUpMenuOfDoctor = [
  {
    text: 'Call',
    icon: "phone",
  },
  {
    text: 'Message',
    icon: "message-outline",
    path: "chat-specific"

  },
  {
    text: 'Attachments',
    icon: "attachment",
    path: "gallery"

  },
  {
    text: 'Allergies',
    icon: "virus-outline",
    path: 'allergies'
  },
  {
    text: 'Medical Records',
    icon: "clipboard-list",
    path: 'medical-records'
  },
  {
    text: 'Update Appointment Status',
    icon: "update",

  },
  {
    text: 'Cancel Appointment',
    icon: "close",

  },
];

export const PopUpMenuOfDoctorInMyAppointments = [
  {
    text: 'Call',
    icon: "phone",
  },
  {
    text: 'Message',
    icon: "message-outline",
    path: "chat-specific"

  },
  {
    text: 'Attachments',
    icon: "attachment",
    path: "gallery"

  },
  {
    text: 'Allergies',
    icon: "virus-outline",
    path: 'allergies'
  },
  {
    text: 'Medical Records',
    icon: "clipboard-list",
    path: 'medical-records'
  },
  {
    text: 'Cancel Appointment',
    icon: "close",
  },
];

export const PopUpMenuOfPatient = [
  {
    text: 'Message',
    icon: "message-outline",
    path: "chat-specific"
  },
  {
    text: 'Attachments',
    icon: "attachment",
    path: "gallery"
  },
  {
    text: 'Profile',
    icon: "account-outline",
    path: 'doctor-details',
  },
  {
    text: 'Cancel Appointment',
    icon: "close",

  },
];

export const timeSince = (date) => {

  var seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }

  return Math.floor(seconds) < 0 ? "just now" : Math.floor(seconds) + " seconds ago";
}

export const SCREEN_NAMES = {
  Splash: 'splash',
  Tutorial: 'tutorial',
  SignIn: 'signIn',
  PhoneAuth: 'phoneAuth',
  UpdateProfile: 'updateProfile',
  Home: 'home',
  FilterResult: 'filterResult',
  Filters: 'filters',
  HospitalDetail: 'hospitalDetail',
  DoctorDetail: 'doctorDetail',
  FeedbackDetail: 'feedbackDetail',
  DoctorBooking: 'doctorBooking',
  Inbox: 'inbox',
  ChatSpecific: 'chatSpecific',
  Gallery: 'gallery',
  ImageDetail: 'imageDetail',
  Account: 'account',
  Appointment: 'appointment',
  MedicalRecord: 'medicalRecord',
  MyDoctors: 'myDoctors',
  MyPatients: 'myPatients',
  MyAllergies: 'myAllergies',
  AddAllergy: 'addAllergy',
  UpdateProfile: 'updateProfile',
  DoctorDashboard: 'doctorDashboard',
  AddMedicalRecord: 'addMedicalRecord',
  Schedule: 'schedule',
  EditSchedule: 'editSchedule',
  CreatePost: 'createPost',
  Forum: 'forum',
  PostDetail: 'postDetail',
  HealthInterest: 'HealthInterest'
}

export const MAIN_STACKS = {
  HomeStack: 'homeStack',
  ChatStack: 'chatStack',
  AccountStack: 'accountStack',
  SplashStack: 'splashStack',
  TutorialStack: 'tutorialStack',
  SignInStack: 'signInStack',
  DrawerStack: 'drawerStack',
  TabStack: 'tabStack',
  ForumStack: 'ForumStack'
}

export const withTabBarRoutes = [
  SCREEN_NAMES.Home,
  SCREEN_NAMES.DoctorDashboard,
  SCREEN_NAMES.Inbox
]