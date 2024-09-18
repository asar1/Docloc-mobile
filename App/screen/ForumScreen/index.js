import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BACKGROUND, BLUE, TEXT } from "../../helper/Color";
import { FlatList, TextInput } from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import picture from "../../assets/person_black.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomHeader from "../../component/CustomHeader";
import Route from "../../Network/route";
import {
  BASE_URL,
  SCREEN_NAMES,
  TEM_TOKEN,
  timeSince,
} from "../../helper/Constant";
import { DrawerActions, useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

const route = new Route(BASE_URL);

const Forum = (props) => {
  const [list, setList] = useState([]);
  const user = useSelector((state) => state.user);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getForum();
    }
  }, [isFocused]);

  useEffect(() => {
    getForum();
  }, []);

  const getForum = () => {
    route
      .getAuthenticated(`forum/true`, user.userToken)
      .then((res) => {
        if (res.status) {
          const formattedForum = res.data.map((item, i) => {
            return {
              title: item.title,
              text: item.content,
              profile: item.user.profileImg,
              comments: item.comments.filter((x) => x.published === true)
                .length,
              name: item.user.firstName + " " + item.user.lastName,
              lastSeen: timeSince(item.createdAt),
              _id: item._id
            };
          });
          setList(formattedForum);
        } else {
          Alert.alert(res.message);
        }
      })
      .catch((err) => {
        Alert.alert(err.toString());
      });
  };

  const search = (txt) => {
    if (txt.length !== 0) {
      route
        .getAuthenticated(`forum/search/` + txt, user.userToken)
        .then((res) => {
          if (res.status) {
            const formattedForum = res.data.map((item, i) => {
              return {
                title: item.title,
                text: item.content,
                profile: item.user.profileImg,
                comments: item.comments.length,
                name: item.user.firstName + " " + item.user.lastName,
                lastSeen: timeSince(item.createdAt),
              };
            });
            setList(formattedForum);
          } else {
            Alert.alert(res.message);
          }
        })
        .catch((err) => {
          Alert.alert(err.toString());
        });
    } else {
      getForum();
    }
  };
  return (
    <View>
      <View style={styles.header}>
        <CustomHeader
          paddingTop={25}
          left="Skip"
          type="icon"
          leftPress={() =>
            props.navigation.dispatch(DrawerActions.openDrawer())
          }
          color={TEXT.primary}
          iconName="menuunfold"
          inFrontOfLeft="Forum"
          bgColor={BACKGROUND.primary}
          inFrontOfLeftStyle={styles.headerTitle}
          rightType="icon"
          rightIconName="edit"
          rightIconColor={TEXT.primary}
          rightIconClick={() => props.navigation.navigate(SCREEN_NAMES.CreatePost)}
        />
      </View>
      <View style={styles.mainCard}>
        <View style={styles.InputView}>
          <TextInput
            placeholderTextColor="grey"
            onChangeText={(e) => {
              search(e);
            }}
            style={styles.inputPlaceholder}
            placeholder="Search in public forum..."
          />
          <View style={styles.attachmentView}>
            <TouchableOpacity>
              <AntDesign
                style={styles.attachmenticon}
                name={"search1"}
                color={"gray"}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={list}
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                {console.log(item._id, 'received id');
                props.navigation.navigate(SCREEN_NAMES.PostDetail, {
                  id: item._id,
                })}
              }
            >
              <View style={styles.innerCard}>
                <View>
                  <Text numberOfLines={2} style={styles.cardTitle}>
                    {item.title}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", paddingTop: 1 }}>
                  <View style={styles.activeStatusBadge}></View>

                  <Text style={{ color: "gray", fontSize: 10 }}>
                    {item.lastSeen}
                  </Text>
                </View>
                <Text style={styles.ForumText} numberOfLines={3}>
                  {item.text}
                </Text>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={styles.ForumProfile}
                      source={{ uri: list[0].profile }}
                    />
                    <Text style={styles.name}>{item.name}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginRight: 20,
                      paddingTop: 5,
                    }}
                  >
                    <Text style={{ paddingTop: 1, marginRight: 5 }}>
                      {" "}
                      <FontAwesome5
                        name={"comment-alt"}
                        color={BACKGROUND.primary}
                        size={13}
                      />
                    </Text>
                    <Text
                      style={{
                        color: "gray",
                        fontSize: 10,
                        paddingTop: 3,
                        marginRight: -5,
                        fontWeight: "bold",
                      }}
                    >
                      {item.comments}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: BACKGROUND.primary,
    height: 90,
    width: "100%",
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 17,
    fontWeight: "700",
    color: TEXT.primary,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 20,
    color: "white",
  },
  mainCard: {
    width: "100%",
    height: "90%",
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    alignSelf: "center",
    padding: 20,
  },
  inputPlaceholder: {
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    borderColor: "white",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "white",
    fontSize: 12,
    textAlign: "left",
    paddingLeft: 30,
  },
  innerCard: {
    borderRadius: 10,
    elevation: 2,
    marginHorizontal: 1,
    overflow: "hidden",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    // textAlign:'center'
  },
  activeStatusBadge: {
    width: 7,
    height: 7,
    backgroundColor: "#339dfa",
    borderRadius: 5,
    marginTop: 4,
    marginRight: 5,
  },
  ForumText: {
    color: "#707070",
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: "Poppins",
  },
  ForumProfile: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  name: {
    color: "#707070",
    fontWeight: "bold",
    paddingTop: 5,
    marginLeft: 10,
  },
  InputView: {
    width: "95%",
    alignSelf: "center",
    elevation: 2,
    overflow: "hidden",
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: "white",
  },
  attachmentView: {
    width: 40,
    height: 40,
    position: "absolute",
    left: 10,
    top: 5,
  },
  attachmenticon: {
    paddingTop: 10,
    paddingLeft: 5,
  },
});
export default Forum;
