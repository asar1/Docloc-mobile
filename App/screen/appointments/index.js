/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { BACKGROUND, TEXT } from '../../helper/Color';
import CustomHeader from '../../component/CustomHeader';
import { FlatList } from 'react-native-gesture-handler';
import { BASE_URL, PopUpMenuOfDoctorInMyAppointments, PopUpMenuOfPatient, SCREEN_NAMES } from '../../helper/Constant';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../component/Loader';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Route from "../../Network/route";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const route = new Route(BASE_URL);

export default Appointments = (props) => {
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [popUp, setPopUp] = useState(false);
  const [appointmentItem, setItem] = useState(null);

  const user = useSelector(state => state.user);
  console.log(user, 'user in redux');

  const getDoctorAppointment = () => {
    const tempUser = JSON.parse(user.userDetail.userDetails)
    route.getAuthenticated('user/my-appointments-doctor/' + tempUser.user._id, user.userToken)
      .then(res => {
        if (res.status) {
          setAppointments(res.data);
        }
        else {
          Alert.alert("Error", res.message)
        }
      })
      .catch(err => console.log(err, 'err'))

  }

  const getPatientAppointment = () => {

    const tempUser = JSON.parse(user.userDetail.userDetails)

    route.getAuthenticated('user/my-appointments/' + tempUser.user._id, user.userToken)
      .then(res => {
        if (res.status) {
          setAppointments(res.data);
        }
        else {
          Alert.alert("Error", res.message)
        }
      })
      .catch(err => console.log(err, 'err'))

  }
  // const isFocused = useIsFocused();


  // useEffect(() => {
  //   if (isFocused) {
  //     console.log('in focus');
  //   }
  // }, [isFocused]);

  useEffect(() => {
    if (user.userRole === "doctor") {
      getDoctorAppointment();
    }
    else {
      getPatientAppointment();
    }
    // setAppointments([])
  }, []);


  const cancelAppointment = (status) => {
    route.put(`appointment/`, { id: appointmentItem._id, status: status }, user.userToken)
      .then(res => {
        if (res.status) {
          if (user.userRole === "doctor") {
            getDoctorAppointment();
          }
          else {
            getPatientAppointment();
          }
        }
        else {
          Alert.alert("Error", JSON.stringify(res.message))
        }
      })
      .catch(err => {
        Alert.alert("Error", JSON.stringify(err))
      });
  }

  return (
    <View style={styles.container} >

      <View style={styles.header} >
        <CustomHeader
          paddingTop={25}
          left="Skip"
          type="icon"
          leftPress={() => props.navigation.goBack()}
          color={TEXT.primary}
          iconName="arrowleft"
          inFrontOfLeft="My Appointments"
          bgColor={BACKGROUND.primary}
          inFrontOfLeftStyle={styles.headerTitle}
        />
      </View>

      {appointments.length != 0 && <View style={styles.threadsContainer} >
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={appointments}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setPopUp(true);
                setItem(item);
                // props.navigation.navigate('chat-specific', {
                //   img: item.profileImg,
                //   name: item.sender._id === sender ? item.receiver.firstName + ' ' + item.receiver.lastName : item.sender.firstName + ' ' + item.sender.lastName,
                //   userId: item.sender._id === sender ? item.receiver._id : item.sender._id,
                //   from: userRole
                // });
              }}
              style={{ paddingVertical: 10 }}
            >
              <View style={{ flex: 1, backgroundColor: TEXT.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, borderColor: '#ECECEC', borderWidth: 1 }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }} >
                  <View style={{ flexDirection: 'row' }} >
                    <FontAwesome5 name={'clipboard-list'} size={18} color={BACKGROUND.primary} />
                    <Text style={{ paddingLeft: 10, fontSize: 16, fontFamily: 'Poppins', fontWeight: 'bold', color: BACKGROUND.primary }} >
                      {user.userRole === "doctor" ? (item.patient.firstName + ' ' + item.patient.lastName) : ('Dr.' + item.doctor.firstName + ' ' + item.doctor.lastName)}
                    </Text>
                  </View>
                  {index !== selectedIndex && <MaterialIcons name={'keyboard-arrow-down'} size={24} color={BACKGROUND.primary} onPress={() => setSelectedIndex(index)} />}
                  {index === selectedIndex && <MaterialIcons name={'keyboard-arrow-up'} size={24} color={BACKGROUND.primary} onPress={() => setSelectedIndex(-1)} />}
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                  <Fontisto name={'calendar'} size={15} color={'gray'} />
                  <Text style={{ paddingLeft: 7 }} >
                    {new Date(item.createdAt).getDate() + ' ' + months[new Date(item.createdAt).getMonth()] + ', ' + item.timeSlot}
                  </Text>
                </View>
                {console.log(item.notes, 'notes')}
                {item.notes != null && selectedIndex === index &&
                  <Text style={{ paddingLeft: 25, width: '85%', paddingVertical: 5 }} >
                    {item.notes}
                  </Text>
                }

              </View>
            </TouchableOpacity>
          )}
        />
      </View>}

      {appointments.length === 0 && <View style={styles.noConversations} >
        <Text>No appointments yet.  </Text>
      </View>}

      {loading && <Loader loadingText={"Loading..."} />}

      {
        <Modal
          animationType="slide"
          transparent={true}
          visible={popUp}
          onRequestClose={() => {
            setPopUp(false)
          }}
        >
          <View style={styles.centeredView}>
            <Pressable style={styles.modalEmpty} onPress={() => setPopUp(false)} >

            </Pressable>
            <View style={styles.modalView}>
              <View style={{ alignSelf: 'center', backgroundColor: 'white', elevation: 8, width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <FlatList
                  data={user.userRole === "patient" ? PopUpMenuOfPatient : PopUpMenuOfDoctorInMyAppointments}
                  renderItem={({ item }) =>
                    <View>
                      <Pressable style={{ width: '100%', justifyContent: 'center', }}
                        onPress={() => {
                          if (item.text === "Call") {
                            setPopUp(false)
                          }
                          else if (item.text === "Message" && user.userRole === "doctor") {
                            setPopUp(false)
                            props.navigation.navigate(SCREEN_NAMES.ChatSpecific, {
                              img: appointmentItem.patient.profileImg,
                              name: appointmentItem.patient.firstName + ' ' + appointmentItem.patient.lastName,
                              userId: appointmentItem.patient._id,
                              from: "doctor"
                            });
                          }
                          else if (item.text === "Message" && user.userRole === "patient") {
                            setPopUp(false)
                            props.navigation.navigate(SCREEN_NAMES.ChatSpecific, {
                              img: appointmentItem.doctor.profileImg,
                              name: appointmentItem.doctor.firstName + ' ' + appointmentItem.doctor.lastName,
                              userId: appointmentItem.doctor._id,
                              from: "patient"
                            });
                          }
                          else if (item.text === "Attachments") {
                            setPopUp(false)
                            const gallery = [];
                            for (let index = 0; index < appointmentItem.attachments.length; index++) {
                              const element = appointmentItem.attachments[index];
                              gallery.push({
                                src: element,
                                type: 'image'
                              });

                            }
                            props.navigation.navigate(SCREEN_NAMES.Gallery, {
                              attachments: appointmentItem.attachments
                            });
                          }
                          else if (item.text === 'Medical Records') {
                            setPopUp(false)
                            props.navigation.navigate(SCREEN_NAMES.MedicalRecord, {
                              id: appointmentItem.patient._id,
                            });
                          }
                          else if (item.text === 'Allergies') {
                            setPopUp(false)
                            props.navigation.navigate(SCREEN_NAMES.MyAllergies, {
                              id: appointmentItem.patient._id
                            });
                          }
                          else if (item.text === "Cancel Appointment") {
                            setPopUp(false)
                            if (appointmentItem.status === "booked") {
                              cancelAppointment("cancelled");
                            }
                            else if (appointmentItem.status === "cancelled") {
                              Alert.alert('Appoinment already cancelled.');
                            }
                            else if (appointmentItem.status === "attended") {
                              Alert.alert('Appoinment already attended.');
                            }
                          }
                          else if (item.text === "Profile") {
                            setPopUp(false);
                            props.navigation.navigate(SCREEN_NAMES.DoctorDetail,
                              { doctorId: appointmentItem.doctor._id }
                            );
                          }
                        }}
                      >
                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 20 }}>
                          <MaterialCommunityIcons name={item.icon} size={18} color={'gray'} />
                          <Text style={{ marginLeft: 30, color: 'gray', fontSize: 15 }}>{item.text}</Text>
                        </View>
                      </Pressable>
                      <View style={{ width: '100%', height: 1, backgroundColor: '#f5f5f5', marginTop: 10 }} />
                    </View>
                  }
                />
              </View>
            </View>
          </View>

        </Modal>

      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  header: {
    backgroundColor: BACKGROUND.primary,
    width: '100%',
    height: 90,
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    fontWeight: '700',
    color: TEXT.primary
  },
  threadsContainer: {
    width: '90%',
    alignSelf: 'center',
    flex: 1
  },
  noConversations: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalEmpty: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%"
  },
});