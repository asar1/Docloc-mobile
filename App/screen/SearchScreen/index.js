import React, { Component } from "react";
import SearchScreenStyle from "./SearchScreenStyle";
import { Alert, View, Text, FlatList, StyleSheet } from "react-native";
import SearchItem from "../../component/SearchItem";
import { TEXT } from "../../helper/Color";
import Route from "../../Network/route";
import { BASE_URL, SCREEN_NAMES } from "../../helper/Constant";
import CustomHeader from "../../component/CustomHeader/index";
import { TouchableOpacity } from "react-native-gesture-handler";

const route = new Route(BASE_URL);
let unsubscribe;
// const Filter = (props) => {

// }
class Filter extends Component {
  constructor(props) {
    super(props);
    // const { params } = this.props.navigation.state;
    this.state = {
      // searchResponseData: params.doctors,
      shouldCallApi: true,
      // availableFilters: params.filtersToShow ? params.filtersToShow : []
      availableFilters: [],
      doctors: [
        {
          suspend: false,
          role: "doctor",
          doctors: [],
          allergies: [],
          specialities: [
            {
              _id: "5fba9abf865863940d961e76",
              speciality: "Ear specialist",
              color: "#FFB167",
              imageUrl:
                "https://storage.googleapis.com/e-health-assests/1611341714779-ear-icon.png",
              createdAt: "2020-11-22T17:07:11.525Z",
              updatedAt: "2020-11-22T17:07:11.525Z",
              __v: 0,
            },
          ],
          isProfileCompleted: true,
          fee: 2000,
          rating: 0,
          feedbacks: 0,
          isSponsored: false,
          profileImg:
            "https://storage.googleapis.com/e-health-assests/Unknown-2.jpg",
          openingHours: "12a.m - 8a.m",
          _id: "5f949312c9a3cb001ff6bd48",
          phoneNo: "03404026228",
          userName: "hassan",
          createdAt: "2020-10-24T20:48:18.093Z",
          updatedAt: "2020-10-24T20:51:19.007Z",
          __v: 0,
          dob: "1996-02-28T00:00:00.000Z",
          email: "hassannawaz@gmail.com",
          firstName: "hassan",
          gender: "Male",
          lastName: "nawaz",
          bio: "MBBS, MS",
          experience: "10 years of execellency",
        },
        {
          suspend: false,
          role: "doctor",
          doctors: [],
          allergies: [],
          specialities: [
            {
              _id: "5fba9abf865863940d961e76",
              speciality: "Ear specialist",
              color: "#FFB167",
              imageUrl:
                "https://storage.googleapis.com/e-health-assests/1611341714779-ear-icon.png",
              createdAt: "2020-11-22T17:07:11.525Z",
              updatedAt: "2020-11-22T17:07:11.525Z",
              __v: 0,
            },
          ],
          isProfileCompleted: true,
          fee: 2000,
          rating: 0,
          feedbacks: 0,
          isSponsored: false,
          profileImg:
            "https://storage.googleapis.com/e-health-assests/Unknown-2.jpg",
          openingHours: "12a.m - 8a.m",
          _id: "5f949312c9a3cb001ff6bd48",
          phoneNo: "03404026228",
          userName: "hassan",
          createdAt: "2020-10-24T20:48:18.093Z",
          updatedAt: "2020-10-24T20:51:19.007Z",
          __v: 0,
          dob: "1996-02-28T00:00:00.000Z",
          email: "hassannawaz@gmail.com",
          firstName: "hassan",
          gender: "Male",
          lastName: "nawaz",
          bio: "MBBS, MS",
          experience: "10 years of execellency",
        },
        {
          suspend: false,
          role: "doctor",
          doctors: [],
          allergies: [],
          specialities: [
            {
              _id: "5fba9abf865863940d961e76",
              speciality: "Ear specialist",
              color: "#FFB167",
              imageUrl:
                "https://storage.googleapis.com/e-health-assests/1611341714779-ear-icon.png",
              createdAt: "2020-11-22T17:07:11.525Z",
              updatedAt: "2020-11-22T17:07:11.525Z",
              __v: 0,
            },
          ],
          isProfileCompleted: true,
          fee: 2000,
          rating: 0,
          feedbacks: 0,
          isSponsored: false,
          profileImg:
            "https://storage.googleapis.com/e-health-assests/Unknown-2.jpg",
          openingHours: "12a.m - 8a.m",
          _id: "5f949312c9a3cb001ff6bd48",
          phoneNo: "03404026228",
          userName: "hassan",
          createdAt: "2020-10-24T20:48:18.093Z",
          updatedAt: "2020-10-24T20:51:19.007Z",
          __v: 0,
          dob: "1996-02-28T00:00:00.000Z",
          email: "hassannawaz@gmail.com",
          firstName: "hassan",
          gender: "Male",
          lastName: "nawaz",
          bio: "MBBS, MS",
          experience: "10 years of execellency",
        },
        {
          suspend: false,
          role: "doctor",
          doctors: [],
          allergies: [],
          specialities: [
            {
              _id: "5fba9abf865863940d961e76",
              speciality: "Ear specialist",
              color: "#FFB167",
              imageUrl:
                "https://storage.googleapis.com/e-health-assests/1611341714779-ear-icon.png",
              createdAt: "2020-11-22T17:07:11.525Z",
              updatedAt: "2020-11-22T17:07:11.525Z",
              __v: 0,
            },
          ],
          isProfileCompleted: true,
          fee: 2000,
          rating: 0,
          feedbacks: 0,
          isSponsored: false,
          profileImg:
            "https://storage.googleapis.com/e-health-assests/Unknown-2.jpg",
          openingHours: "12a.m - 8a.m",
          _id: "5f949312c9a3cb001ff6bd48",
          phoneNo: "03404026228",
          userName: "hassan",
          createdAt: "2020-10-24T20:48:18.093Z",
          updatedAt: "2020-10-24T20:51:19.007Z",
          __v: 0,
          dob: "1996-02-28T00:00:00.000Z",
          email: "hassannawaz@gmail.com",
          firstName: "hassan",
          gender: "Male",
          lastName: "nawaz",
          bio: "MBBS, MS",
          experience: "10 years of execellency",
        },
        {
          suspend: false,
          role: "doctor",
          doctors: [],
          allergies: [],
          specialities: [
            {
              _id: "5fba9abf865863940d961e76",
              speciality: "Ear specialist",
              color: "#FFB167",
              imageUrl:
                "https://storage.googleapis.com/e-health-assests/1611341714779-ear-icon.png",
              createdAt: "2020-11-22T17:07:11.525Z",
              updatedAt: "2020-11-22T17:07:11.525Z",
              __v: 0,
            },
          ],
          isProfileCompleted: true,
          fee: 2000,
          rating: 0,
          feedbacks: 0,
          isSponsored: false,
          profileImg:
            "https://storage.googleapis.com/e-health-assests/Unknown-2.jpg",
          openingHours: "12a.m - 8a.m",
          _id: "5f949312c9a3cb001ff6bd48",
          phoneNo: "03404026228",
          userName: "hassan",
          createdAt: "2020-10-24T20:48:18.093Z",
          updatedAt: "2020-10-24T20:51:19.007Z",
          __v: 0,
          dob: "1996-02-28T00:00:00.000Z",
          email: "hassannawaz@gmail.com",
          firstName: "hassan",
          gender: "Male",
          lastName: "nawaz",
          bio: "MBBS, MS",
          experience: "10 years of execellency",
        },
        {
          suspend: false,
          role: "doctor",
          doctors: [],
          allergies: [],
          specialities: [
            {
              _id: "5fba9abf865863940d961e76",
              speciality: "Ear specialist",
              color: "#FFB167",
              imageUrl:
                "https://storage.googleapis.com/e-health-assests/1611341714779-ear-icon.png",
              createdAt: "2020-11-22T17:07:11.525Z",
              updatedAt: "2020-11-22T17:07:11.525Z",
              __v: 0,
            },
          ],
          isProfileCompleted: true,
          fee: 2000,
          rating: 0,
          feedbacks: 0,
          isSponsored: false,
          profileImg:
            "https://storage.googleapis.com/e-health-assests/Unknown-2.jpg",
          openingHours: "12a.m - 8a.m",
          _id: "5f949312c9a3cb001ff6bd48",
          phoneNo: "03404026228",
          userName: "hassan",
          createdAt: "2020-10-24T20:48:18.093Z",
          updatedAt: "2020-10-24T20:51:19.007Z",
          __v: 0,
          dob: "1996-02-28T00:00:00.000Z",
          email: "hassannawaz@gmail.com",
          firstName: "hassan",
          gender: "Male",
          lastName: "nawaz",
          bio: "MBBS, MS",
          experience: "10 years of execellency",
        },
        {
          suspend: false,
          role: "doctor",
          doctors: [],
          allergies: [],
          specialities: [
            {
              _id: "5fba9abf865863940d961e76",
              speciality: "Ear specialist",
              color: "#FFB167",
              imageUrl:
                "https://storage.googleapis.com/e-health-assests/1611341714779-ear-icon.png",
              createdAt: "2020-11-22T17:07:11.525Z",
              updatedAt: "2020-11-22T17:07:11.525Z",
              __v: 0,
            },
          ],
          isProfileCompleted: true,
          fee: 2000,
          rating: 0,
          feedbacks: 0,
          isSponsored: false,
          profileImg:
            "https://storage.googleapis.com/e-health-assests/Unknown-2.jpg",
          openingHours: "12a.m - 8a.m",
          _id: "5f949312c9a3cb001ff6bd48",
          phoneNo: "03404026228",
          userName: "hassan",
          createdAt: "2020-10-24T20:48:18.093Z",
          updatedAt: "2020-10-24T20:51:19.007Z",
          __v: 0,
          dob: "1996-02-28T00:00:00.000Z",
          email: "hassannawaz@gmail.com",
          firstName: "hassan",
          gender: "Male",
          lastName: "nawaz",
          bio: "MBBS, MS",
          experience: "10 years of execellency",
        },
        {
          suspend: false,
          role: "doctor",
          doctors: [],
          allergies: [],
          specialities: [
            {
              _id: "5fba9abf865863940d961e76",
              speciality: "Ear specialist",
              color: "#FFB167",
              imageUrl:
                "https://storage.googleapis.com/e-health-assests/1611341714779-ear-icon.png",
              createdAt: "2020-11-22T17:07:11.525Z",
              updatedAt: "2020-11-22T17:07:11.525Z",
              __v: 0,
            },
          ],
          isProfileCompleted: true,
          fee: 2000,
          rating: 0,
          feedbacks: 0,
          isSponsored: false,
          profileImg:
            "https://storage.googleapis.com/e-health-assests/Unknown-2.jpg",
          openingHours: "12a.m - 8a.m",
          _id: "5f949312c9a3cb001ff6bd48",
          phoneNo: "03404026228",
          userName: "hassan",
          createdAt: "2020-10-24T20:48:18.093Z",
          updatedAt: "2020-10-24T20:51:19.007Z",
          __v: 0,
          dob: "1996-02-28T00:00:00.000Z",
          email: "hassannawaz@gmail.com",
          firstName: "hassan",
          gender: "Male",
          lastName: "nawaz",
          bio: "MBBS, MS",
          experience: "10 years of execellency",
        },
      ],
      requestBodyToSearch: {},
      oldData: [],
    };
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.isFocused !== this.props.isFocused) {
  //     // Use the `this.props.isFocused` boolean
  //     // Call any action
  //     if (this.props.isFocused) {
  //       console.log("going to focus it")
  //       const { params } = this.props.navigation.state;
  //       if (params.filtersToShow) {
  //         this.setState({ availableFilters: params.filtersToShow })
  //       }
  //     }

  //   }

  // }

  // componentWillUnmount() {
  //   this.focusListener();
  // }

  searchWithFilters = async (requestBody) => {
    const res = await route
      .postAuthenticated("open/search-with-filters", requestBody);
    if (res.status === 0) {
      Alert.alert("Error", JSON.stringify(res.message));
    } else {
      console.log(res, "response is");
      this.setState({ doctors: res.data, shouldCallApi: false });
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  };
  onRightPress = () => {
    this.props.navigation.navigate(SCREEN_NAMES.Filters, {
      availableFilters: this.state.availableFilters,
      requestBody: this.state.requestBodyToSearch,
    });
  };

  componentDidMount() {
    const newParams = this.props.route;
    if (this.state.doctors.length !== newParams.params.doctors.length) {
      this.setState({
        doctors: newParams.params.doctors,
        oldData: newParams.params.doctors,
      });
    }
    unsubscribe = this.props.navigation.addListener("focus", () => {
      const params = this.props.route.params;

      this.setState({
        requestBodyToSearch: params.filterRequestBodyToSearch,
        availableFilters: params.filtersToShow,
      });
      if (params.applyFilter && params.filtersToShow.length > 0) {
        this.searchWithFilters(params.filterRequestBodyToSearch);
      }

      if (params.filtersToShow && params.filtersToShow.length === 0) {
        this.setState({ doctors: this.state.oldData });
      }
    });
  }

  componentWillUnmount() {
    unsubscribe;
  }

  render() {
    return (
      <SearchScreenStyle.WrapperViewVertical>
        <SearchScreenStyle.HeaderView>
          <CustomHeader
            left="Skip"
            type="icon"
            leftPress={this.goBack}
            iconSize={30}
            color={TEXT.primary}
            iconName="close"
            inFrontOfLeft="Find & Book"
            inFrontOfLeftStyle={styles.findAndBook}
            right="Filters"
            rightType="text"
            rightTextStyle={styles.filterButton}
            onRightPress={this.onRightPress}
            paddingTop={25}
          />
          {/* <Header
            leftType={'text'}
            leftText={'back'}
            rightType={'text'}
            HeaderText={'Find & Book'}
            leftPress={() => this.props.navigation.pop()}
          /> */}
          {/* <SearchScreenStyle.SearchWrapperView>
            <SearchScreenStyle.SearchTextInput
              placeholder={params.name}
              placeholderTextColor={'#FFF'}
              value={this.state.search}
              onChangeText={(search) => this.setState({ search })}
            />
            <SearchScreenStyle.FilterButton
              onPress={() => this.props.navigation.push('Filter')}>
              <Icon name="filter" color={WHITE.dark} size={30} />
            </SearchScreenStyle.FilterButton>
          </SearchScreenStyle.SearchWrapperView> */}
        </SearchScreenStyle.HeaderView>
        <View style={{ marginTop: -19 }}>
          <FlatList
            data={this.state.availableFilters}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { }}>
                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 50,
                    justifyContent: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    marginLeft: 13,
                  }}
                >
                  <Text style={{ fontFamily: "Poppins", fontSize: 10, color: '#313450' }}>
                    {" "}
                    {item.title}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <SearchScreenStyle.DataList
          showsVerticalScrollIndicator={false}
          data={this.state.doctors}
          activeOpacity={1}
          ListFooterComponent={<View style={{ height: 15 }}></View>}
          renderItem={(item, index) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(SCREEN_NAMES.DoctorDetail, {
                  doctorId: item.item._id,
                });
              }}
            >
              <SearchItem
                item={item}
                index={index}
                onPressContact={() => {
                  this.props.navigation.navigate(SCREEN_NAMES.DoctorDetail, {
                    doctorId: item.item._id,
                  });
                }}
              />
            </TouchableOpacity>
          )}
        />
        {/* <View style={{ backgroundColor: TEXT.primary, shadowColor: 'black', height: 60, shadowOffset:{width: 0, height: 0}, width: 60,borderRadius: 30,shadowOpacity:0.20,shadowRadius:3, position: 'absolute', bottom: 50, right: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
          <Icon name={'filter'} size={40} color={BACKGROUND.primary} onPress={() => this.props.navigation.navigate('Filter')} />
        </View> */}

        {/* merging build 1 in navigation 5 */}
        {/* <View style={{ backgroundColor: TEXT.primary, shadowColor: 'black', height: 60, shadowOffset: { width: 0, height: 0 }, width: 60, borderRadius: 30, shadowOpacity: 0.20, shadowRadius: 3, position: 'absolute', bottom: 50, right: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
          <Icon name={'filter'} size={40} color={BACKGROUND.primary} onPress={() => this.props.navigation.navigate('filter')} />
        </View> */}
      </SearchScreenStyle.WrapperViewVertical>
    );
  }
}

const styles = StyleSheet.create({
  findAndBook: {
    fontFamily: "Poppins-Bold",
    color: TEXT.primary,
    fontSize: 17,
    fontWeight: "700",
  },
  filterButton: {
    fontFamily: "Poppins",
    color: TEXT.primary,
    fontSize: 10,
    fontWeight: "700",
  },
});

export default Filter;
