import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Pressable,
  SafeAreaView,
  Keyboard,
  Dimensions
} from "react-native";
import { BACKGROUND, TEXT } from "../../helper/Color";
import { FlatList, TextInput } from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { useState } from "react";
import CustomHeader from "../../component/CustomHeader";
import {
  BASE_HOST_URL,
  BASE_URL,
  SCREEN_NAMES,
  timeSince,
} from "../../helper/Constant";
import Route from "../../Network/route";
import * as ImagePicker from "react-native-image-picker";
import { useSelector } from "react-redux";

const route = new Route(BASE_URL);

const PostDetails = (props) => {
  // const [picture, setPicture] = useState([
  //   {
  //     pic: "https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*",
  //   },
  //   {
  //     pic: "https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*",
  //   },
  //   {
  //     pic: "https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*",
  //   },
  //   {
  //     pic: "https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*",
  //   },
  //   {
  //     pic: "https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*",
  //   },
  //   {
  //     pic: "https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*",
  //   },
  //   {
  //     pic: "https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*",
  //   },
  // ]);

  const user = useSelector((state) => state.user);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const flatListRef = useRef(null);
  const windowHeight = Dimensions.get('window').height;

  const getPost = () => {
    const id = props.route.params.id;

    if (id) {
      route
        .getAuthenticated(`forum/get-a-post/${id}`, user.userToken)
        .then((res) => {
          if (res.status) {
            const post = res.data;
            let postComments = res.data[0].comments || [];

            const formattedPost = post.map((item, i) => {
              return {
                title: item.title,
                text: item.content,
                profile: item.user.profileImg,
                comments: item.comments.length,
                name: item.user.firstName + " " + item.user.lastName,
                lastSeen: timeSince(item.createdAt),
                image: item.image,
              };
            });
            postComments = postComments.filter((x) => x.published === true);
            const formattedComments = postComments.map((item, i) => {
              if (item) {
                return {
                  text: item.content,
                  profile: item.user.profileImg,
                  name: item.user.firstName + " " + item.user.lastName,
                  lastSeen: timeSince(item.dateEntered),
                  image: item.image,
                };
              }
            });
            setPost(formattedPost);
            setComments(formattedComments);
          } else {
            Alert.alert(res.message);
          }
        })
        .catch((err) => {
          Alert.alert(err.toString());
        });
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    if (comments.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 500);
    }
  }, [comments]);

  const hideKeyboard = () => {
    inputRef.current.blur();
    Keyboard.dismiss();
  };

  const selectFile = () => {
    const option = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.launchImageLibrary(option, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        // Base 64
        var photo = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
          base64: response.base64,
        };

        try {
          fetch(`${BASE_HOST_URL}/api/open/upload-chat-image`, {
            headers: {
              Authorization: `Bearer nothing`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(photo),
          })
            .then((response) => {
              response.json().then((res) => {
                if (res.data.length > 0) {
                  let previousNotUploadedImages = images;
                  let indexShouldBe = previousNotUploadedImages.findIndex(
                    (x) => {
                      return !x.uri.includes("https://storage.googleapis.com/");
                    }
                  );
                  if (indexShouldBe > -1) {
                    previousNotUploadedImages.splice(indexShouldBe, 1);
                  }
                  setImages([...images, res.data[0]]);
                }
              });
            })
            .catch((e) => {
              console.log(e, "err");
            });
        } catch (error) {
          console.log(error, "err");
        }
      }
    });
  };
  { console.log(windowHeight, 'windowHeightwindowHeight') }

  const onSubmit = () => {
    const id = props.route.params.id;
    if (text && id) {
      const reqBody = {
        content: text,
        image: images,
      };
      route
        .postAuthenticated(`forum/comment/${id}`, reqBody, user.userToken)
        .then((res) => {
          if (res.status) {
            setText('')
            hideKeyboard()
            getPost();
          } else {
            Alert.alert(res.message);
          }
        })
        .catch((err) => {
          console.log(err, "error");
          Alert.alert(err.toString());
        });
    }
  };

  // const isFocused = useIsFocused();

  // useEffect(() => {
  //     if (isFocused) {
  //         console.log('in focus');
  //         getForum();
  //     }
  // }, [isFocused]);

  return (
    <View style={{ backgroundColor: "#F5F5F5", flex: 1 }}>
      <View style={styles.InputView}>
        <TextInput
          placeholderTextColor="grey"
          value={text}
          onChangeText={(e) => {
            setText(e);
          }}
          ref={inputRef}
          style={styles.inputPlaceholder}
          placeholder="Well, i think..."
        />
        <View style={styles.inputIconView}>
          <TouchableOpacity onPress={() => onSubmit()}>
            <FontAwesome5
              style={styles.inputicon}
              name={"location-arrow"}
              color={BACKGROUND.primary}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <Pressable
          style={styles.attachmentView}
          onPress={() => {
            selectFile();
          }}
        >
          <View>
            <Entypo
              style={styles.attachmenticon}
              name={"attachment"}
              color={BACKGROUND.primary}
              size={20}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.mainBg}>
        <CustomHeader
          paddingTop={25}
          left="Skip"
          type="icon"
          leftPress={() => props.navigation.goBack()}
          color={TEXT.primary}
          iconName="arrowleft"
          inFrontOfLeft="Post"
          bgColor={BACKGROUND.primary}
          inFrontOfLeftStyle={styles.headerTitle}
        />
      </View>

      {post.length > 0 ? (
        <SafeAreaView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.mainCard}>
            <View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={styles.ForumProfile}
                    source={{ uri: post[0]?.profile }}
                  />
                  <View
                    style={{ flexDirection: "column", paddingHorizontal: 10 }}
                  >
                    <Text style={{ fontWeight: "bold" }}>{post[0]?.name}</Text>
                    <View
                      style={{
                        justifyContent: "flex-start",
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: 5,
                          backgroundColor: BACKGROUND.primary,
                          marginTop: 5,
                          marginRight: 5,
                        }}
                      />
                      <Text style={{ fontSize: 10, color: "gray" }}>
                        {post[0]?.lastSeen}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  paddingVertical: 5,
                  color: "black",
                }}
              >
                {post[0]?.title}
              </Text>
              <Text
                style={{
                  color: "gray",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {" "}
                {post[0]?.text}{" "}
              </Text>
              {post[0]?.image && post[0]?.image.length > 0 ? (
                <FlatList
                  data={post[0]?.image}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        props.navigation.navigate(SCREEN_NAMES.Gallery, {
                          attachments: post[0].image,
                        });
                      }}
                    >
                      <View style={styles.pictureList}>
                        <Image style={styles.picture} source={{ uri: item }} />
                      </View>
                    </Pressable>
                  )}
                />
              ) : (
                <></>
              )}
            </View>
          </View>
          <Text style={{ paddingTop: 15, fontWeight: "bold", paddingLeft: 25 }}>
            Replies <Text> {comments.length} </Text>
          </Text>
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              marginBottom: 70,
              height: '48%',
              // flex: 1,
            }}
          >
            <FlatList
              nestedScrollEnabled={true}
              data={comments}
              ref={flatListRef}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.innerCard}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={styles.ForumProfile}
                      source={{ uri: item.profile }}
                    />
                    <View
                      style={{ flexDirection: "column", paddingHorizontal: 10 }}
                    >
                      <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: 5,
                            backgroundColor: BACKGROUND.primary,
                            marginTop: 5,
                            marginRight: 5,
                          }}
                        />
                        <Text style={{ fontSize: 10, color: "gray" }}>
                          {item.lastSeen}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={{ color: "gray", marginTop: 10 }}>
                    {item.text}
                  </Text>
                  <FlatList
                    data={item.image}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() => {
                          props.navigation.navigate(SCREEN_NAMES.ImageDetail, {
                            img: item
                          });
                        }}
                      >
                        <View style={styles.pictureList}>
                          <Image
                            style={styles.picture}
                            source={{ uri: item }}
                          />
                        </View>
                      </Pressable>
                    )}
                  />
                </View>
              )}
            />
          </View>
        </SafeAreaView>
      ) : (
        <></>
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  mainBg: {
    backgroundColor: BACKGROUND.primary,
    height: 90,
    width: "100%",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 17,
    fontWeight: "700",
    color: TEXT.primary,
  },
  mainCard: {
    width: "90%",
    borderRadius: 10,
    marginTop: 20,
    elevation: 1,
    overflow: "hidden",
    backgroundColor: "white",
    alignSelf: "center",
    padding: 10,
    marginVertical: 0,
  },
  inputPlaceholder: {
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    borderColor: "white",
    width: "90%",
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#D3D3D3",
    fontSize: 12,
    textAlign: "left",
    paddingHorizontal: 20,
    paddingRight: 30,
  },
  innerCard: {
    borderRadius: 10,
    elevation: 1,
    overflow: 'hidden',
    backgroundColor: "white",
    padding: 10,
    flex: 1,
    marginVertical: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    // textAlign:'center'
  },
  activeStatusBadge: {
    width: 7,
    height: 7,
    backgroundColor: "#339dfa",
    borderRadius: 5,
    marginTop: 4,
    marginRight: 10,
  },
  ForumText: {
    color: "gray",
    paddingVertical: 10,
  },
  ForumProfile: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  name: {
    color: "gray",
    fontWeight: "bold",
    paddingTop: 5,
  },
  pictureList: {
    width: 50,
    borderRadius: 10,
    overflow: "hidden",
    paddingTop: 20,
    marginHorizontal: 5,
  },
  picture: {
    width: "100%",
    height: 50,
    borderRadius: 10,
  },
  InputView: {
    // marginTop: 5,
    width: "90%",
    alignSelf: "center",
    bottom: 15,
    position: "absolute",
    // marginBottom:20,
    elevation: 2,
    overflow: "hidden",
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: "white",
    zIndex: 100,
  },
  inputPlaceholder: {
    height: 55,
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    backgroundColor: "white",
    fontSize: 15,
    paddingLeft: 50,
  },
  inputIconView: {
    width: 40,
    height: 40,
    borderRadius: 10,
    position: "absolute",
    right: 10,
    top: 5,
  },
  inputicon: {
    paddingTop: 12,
    paddingLeft: 10,
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
export default PostDetails;
