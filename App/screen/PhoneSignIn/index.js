/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Alert, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-number-input';
import Route from '../../Network/route';
import PhoneSignInStyles from './PhoneSignInStyles';
import { BASE_URL, SCREEN } from '../../helper/Constant';
import { BLACK, WHITE } from '../../helper/Color';
import Loader from '../../component/Loader';

const route = new Route(BASE_URL);

class PhoneSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: true,
      loading: false,
      phoneNumberValid: false,
      phoneNumber: '',
      fcmToken: '',
      valid: false,
      type: '',
      value: '',
    };
  }

  // requestPermission = async () => {
  //   try {
  //     await firebase.messaging().requestPermission();
  //     // User has authorize
  //   } catch (error) {
  //     // User has rejected permissions
  //   }
  // };

  signInWithPhoneNumber = async () => {
    if (this.phone) {
      const confirmation = await auth().signInWithPhoneNumber(this.phone.getValue());
      console.log(confirmation, 'confirmation');
      this.props.navigation.navigate("phone-verify", { confirmation: confirmation, phone: this.phone.getValue() })
    } else {
      Alert.alert("Please check your phone number")
    }
    // this.props.navigation.navigate('HomeScreen');
  };

  componentDidMount() { }

  render() {
    return (
      <PhoneSignInStyles.WrapperViewVertical>
        <StatusBar hidden={false} />
        <PhoneSignInStyles.CrossButton
          onPress={() => this.props.navigation.pop()}>
          <Icon name="cross" color={BLACK.dark} size={40} />
        </PhoneSignInStyles.CrossButton>
        <PhoneSignInStyles.ContctImage
          source={require('../../assets/phone_input.png')}
        />
        <PhoneSignInStyles.InstructionText>
          Enter your mobile number we will send {'\n'} you the OTP to verify
          later
        </PhoneSignInStyles.InstructionText>
        <PhoneSignInStyles.PhoneInputWrapper>
          <PhoneInput
            ref={(ref) => {
              this.phone = ref;
            }}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              height: 44,
              width: SCREEN.width - 50,
              alignSelf: 'center',
              marginTop: 10,
              paddingHorizontal: 5,
              color: 'black'
            }}
            placeholder='Enter Your Phone No.'
            layout='first'
          />
          <PhoneSignInStyles.SubmitButton
            onPress={() => {
              this.signInWithPhoneNumber();
              // this.props.navigation.navigate('SignUpDetail')
            }}>
            <PhoneSignInStyles.CountryCodeText
              style={{ color: WHITE.dark }}>
              Submit
            </PhoneSignInStyles.CountryCodeText>
          </PhoneSignInStyles.SubmitButton>
        </PhoneSignInStyles.PhoneInputWrapper>
        {this.state.loading && <Loader loadingText={'Sending code'} />}
      </PhoneSignInStyles.WrapperViewVertical>
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

// export default connect(mapStateToProps, mapDispatchToProps)(PhoneSignIn);
export default PhoneSignIn;
