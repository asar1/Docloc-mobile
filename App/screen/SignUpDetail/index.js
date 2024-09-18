/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Alert, StatusBar, Switch } from 'react-native';
import DatePicker from 'react-native-datepicker'
import AsyncStorage from "@react-native-community/async-storage";
import Route from '../../Network/route';
import SignUpDetailStyles from './SignUpDetailStyles';
import Header from '../../component/Header';
import { BASE_URL, SCREEN, TOKEN, USERDETAIL, USERID } from '../../helper/Constant';
import { WHITE } from '../../helper/Color';
import Loader from '../../component/Loader';

const route = new Route(BASE_URL);

class SignUpDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      f_name: '',
      l_name: '',
      selectedValue: 'Male',
      date: new Date('1995-02-04'),
      userToggle: true
    };
    console.log(props, "these are props")
  }

  async componentDidMount() {

    let userDetail = await AsyncStorage.getItem(USERDETAIL);
    let userDetails = JSON.parse(userDetail)
    this.setState({ f_name: userDetails.user.firstName, l_name: userDetails.user.lastName })

  }
  updateProfile = async () => {
    this.setState({ isLoading: true })
    // const data = new FormData();
    // data.append("dob", this.state.date);
    // data.append("gender", this.state.selectedValue);
    // data.append("firstName", this.state.f_name);
    // data.append("lastName", this.state.l_name);
    // data.append("role", this.state.userToggle ? 'user' : 'doctor');

    const dataToSend = {
      "dob": this.state.date, 'gender': this.state.selectedValue,
      'firstName': this.state.f_name, 'lastName': this.state.l_name, 'role': this.state.userToggle ? 'user' : 'doctor'
    }
    const userId = await AsyncStorage.getItem(USERID)
    const token = await AsyncStorage.getItem(TOKEN)
    console.log(await AsyncStorage.getItem(USERID), "this is user id")

    route.put("user/" + userId, dataToSend,).then(async res => {
      if (res.error) {
        Alert.alert("Error", JSON.stringify(res))
        this.setState({ isLoading: false })
      }
      else {
        this.setState({ isLoading: false })
        await AsyncStorage.removeItem(USERDETAIL)
        let newObj = {
          user: res.data
        }
        // await AsyncStorage.setItem(USERDETAIL, JSON.stringify(newObj));
        console.log(res.data, "this is response")
        this.props.navigation.navigate("MainScreen");
      }
    })



  }


  render() {
    return (
      <SignUpDetailStyles.WrapperViewVertical>
        <StatusBar hidden={false} />
        <Header HeaderText="Detail" leftType={'text'} rightType={'text'} />
        <SignUpDetailStyles.SimpleView style={{ flexDirection: 'row' }}>
          <SignUpDetailStyles.SimpleView style={{ flex: 1 }}>

            <DatePicker
              style={{ width: SCREEN.width - 30, alignSelf: 'center', marginTop: 15 }}
              mode="date"
              date={this.state.date}
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1940-01-01"
              onDateChange={(date) => console.log("dateConnect", JSON.stringify(date))}
            />
          </SignUpDetailStyles.SimpleView>
        </SignUpDetailStyles.SimpleView>
        <SignUpDetailStyles.TextInputField
          placeholder={'first name'}
          name="firstName"
          onChangeText={(f_name) => this.setState({ f_name })}
          value={this.state.f_name}
        />
        <SignUpDetailStyles.TextInputField
          placeholder={'last name'}
          name="lastName"
          onChangeText={(l_name) => this.setState({ l_name })}
          value={this.state.l_name}
        />
        <SignUpDetailStyles.SimpleView
          style={{ flexDirection: 'row', marginVertical: 5 }}>
          <SignUpDetailStyles.SimpleView
            style={{ flex: 1, alignItems: 'center' }}>
            <SignUpDetailStyles.SmallText
              style={{ fontSize: 14, alignSelf: 'center' }}>
              User
            </SignUpDetailStyles.SmallText>
            <Switch
              onValueChange={() =>
                this.setState({ userToggle: !this.state.userToggle })
              }
              value={this.state.userToggle}
            />
          </SignUpDetailStyles.SimpleView>
          <SignUpDetailStyles.SimpleView
            style={{ flex: 1, alignItems: 'center' }}>
            <SignUpDetailStyles.SmallText
              style={{ fontSize: 14, alignSelf: 'center' }}>
              Doctor
            </SignUpDetailStyles.SmallText>
            <Switch
              onValueChange={() =>
                this.setState({ userToggle: !this.state.userToggle })
              }
              value={!this.state.userToggle}
            />
          </SignUpDetailStyles.SimpleView>
        </SignUpDetailStyles.SimpleView>

        <SignUpDetailStyles.SubmitButton onPress={() => {
          if (this.state.f_name.trim().length < 1 || this.state.l_name.trim().length < 1) {
            Alert.alert("Please fill all data");
          } else {
            // this.props.navigation.navigate("MainScreen");
            this.updateProfile()
          }
        }}>
          <SignUpDetailStyles.CountryCodeText style={{ color: WHITE.dark }}>
            Submit
          </SignUpDetailStyles.CountryCodeText>
        </SignUpDetailStyles.SubmitButton>

        {this.state.isloading && <Loader loadingText={'Updating Please Wait'} />}
      </SignUpDetailStyles.WrapperViewVertical>
    );
  }
}

// function mapStateToProps(state, props) {
//   return {
//     userDetail: state.user.userDetail,
//     userToken: state.user.userToken,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(Actions, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SignUpDetail);
export default SignUpDetail;
