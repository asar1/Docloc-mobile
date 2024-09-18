/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { BACKGROUND, TEXT } from '../../helper/Color';
import CustomHeader from '../../component/CustomHeader';
import { FlatList, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import io from 'socket.io-client';
import { BASE_HOST_URL, SCREEN_NAMES, USERID } from '../../helper/Constant';
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../component/Loader';
import AsyncStorage from "@react-native-community/async-storage";

const socket = io(BASE_HOST_URL);

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

export default Inbox = (props) => {
  const [messages, setMessages] = useState([
    {
      img: 'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
      doctorName: 'Dr. Maria Alex',
      message: 'What\'s your condition now?',
      received: '2 hours ago',
      read: false
    },
    {
      img: 'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
      doctorName: 'Dr. Andrew Moore',
      message: 'What\'s your condition now?',
      received: '5 hours ago',
      read: true
    },
    {
      img: 'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
      doctorName: 'Dr. Diane Tucker',
      message: 'What\'s your condition now?What\'s your condition now?What\'s your condition now?',
      received: 'Nov 2',
      read: true
    },
    {
      img: 'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
      doctorName: 'Dr. Rejina Freak',
      message: 'What\'s your condition now?What\'s your condition now?What\'s your condition now?',
      received: 'Oct 12',
      read: false
    },
    {
      img: 'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
      doctorName: 'Dr. Jonny Doe',
      message: 'What\'s your condition now?',
      received: 'Jul 12',
      read: true
    },
    {
      img: 'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
      doctorName: 'Dr. Selin Jose',
      message: 'What\'s your condition now?',
      received: '2 hours ago',
      read: true
    },
    {
      img: 'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
      doctorName: 'Dr. Rejina Freak',
      message: 'What\'s your condition now?What\'s your condition now?What\'s your condition now?',
      received: 'Oct 12',
      read: false
    },
    {
      img: 'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
      doctorName: 'Dr. Jonny Doe',
      message: 'What\'s your condition now?',
      received: 'Jul 12',
      read: true
    },
    {
      img: 'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
      doctorName: 'Dr. Selin Jose',
      message: 'What\'s your condition now?',
      received: '2 hours ago',
      read: true
    },
    {
      img: 'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
      doctorName: 'Dr. Rejina Freak',
      message: 'What\'s your condition now?What\'s your condition now?What\'s your condition now?',
      received: 'Oct 12',
      read: false
    },
    {
      img: 'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
      doctorName: 'Dr. Jonny Doe',
      message: 'What\'s your condition now?',
      received: 'Jul 12',
      read: true
    },
    {
      img: 'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
      doctorName: 'Dr. Selin Jose',
      message: 'What\'s your condition now?',
      received: '2 hours ago',
      read: true
    }
  ]);
  const [sender, setSender] = useState('');

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);

  const userRole = useSelector(state => state.user.userRole);

  const setCurrentUser = async () => {
    let sender = await AsyncStorage.getItem(USERID);
    setSender(sender);
  }

  const timeSince = (date) => {

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
    return Math.floor(seconds) + " seconds ago";
  }

  useState(async () => {

    setLoading(true);

    await setCurrentUser();
    let senderIs = await AsyncStorage.getItem(USERID);

    socket.emit('fetchInbox', { sender: senderIs });

    socket.on('fetchInboxResponse', (messages) => {
      console.log('fetchInboxResponse received');
      setLoading(false);
      setThreads(messages);

    });

  }, []);

  const convertDate = (dateInString) => {
    let date = new Date(dateInString);

    let datein = date.getDate();
    let month = date.getMonth();
    let time = date.getHours() + ":" + date.getMinutes();

    return `${months[month]} ${datein}, ${time}`;

  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      socket.emit('fetchInbox', { sender: sender });
    }
  }, [isFocused])
  return (
    <View style={styles.container} >

      <View style={styles.header} >
        <CustomHeader
          paddingTop={25}
          center={"Messages"}
          centerStyle={styles.headerTitle}
        />
      </View>

      <View style={styles.threadsContainer} >
        <ScrollView>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={threads}
            ListFooterComponent={<View style={{ width: 25 }}></View>}
            renderItem={({ item, index }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate(SCREEN_NAMES.ChatSpecific, {
                    img: item.profileImg,
                    name: item.sender._id === sender ? item.receiver.firstName + ' ' + item.receiver.lastName : item.sender.firstName + ' ' + item.sender.lastName,
                    userId: item.sender._id === sender ? item.receiver._id : item.sender._id,
                    from: userRole
                  });
                }}
              >
                <View

                  style={index === 0 ? [styles.thread, { marginTop: 30 }] : styles.thread}>
                  <View style={styles.imageContainer} >
                    <Image
                      source={{ uri: item.sender._id === sender ? item.receiver.profileImg : item.sender.profileImg }}
                      style={styles.imageStyle}
                    />
                  </View>
                  <View style={styles.messageContainer} >
                    <Text style={styles.doctorName} >
                      {item.sender._id === sender ? item.receiver.firstName + ' ' + item.receiver.lastName : item.sender.firstName + ' ' + item.sender.lastName}
                    </Text>
                    <Text style={styles.messageText} numberOfLines={1} >
                      {item.messages[item.messages.length - 1].text}
                    </Text>
                  </View>
                  <View style={styles.timeBeforeContainer} >
                    <Text style={styles.timeBefore} >
                      {timeSince(item.messages[item.messages.length - 1].date)}
                      {/* {convertDate(item.messages[item.messages.length - 1].date)} */}
                    </Text>
                    {!item[userRole + 'Read'] && <View style={styles.unread} />}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </ScrollView>
      </View>
      {threads.length === 0 && <View style={styles.noConversations} >
        <Text>No conversations yet.  </Text>
      </View>}
      {loading && <Loader loadingText={"Loading..."} />}
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
    marginTop: -15,
    marginBottom: 15
  },
  thread: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '90%',
    padding: 15,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 15,
    borderColor: '#ECECEC',
    borderWidth: 1,
  },
  imageContainer: {
    width: '15%'
  },
  imageStyle: {
    height: 40,
    width: 40,
    alignSelf: 'center',
    borderRadius: 20
  },
  messageContainer: {
    width: '58%',
    paddingLeft: 7
  },
  doctorName: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '700'
  },
  messageText: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '700',
    color: '#707070',
    paddingTop: 7
  },
  timeBeforeContainer: {
    width: '27%'
  },
  timeBefore: {
    textAlign: 'right',
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '700',
    color: '#C9CACC'
  },
  unread: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: BACKGROUND.primary,
    alignSelf: 'flex-end',
    marginTop: 14
  },
  noConversations: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});