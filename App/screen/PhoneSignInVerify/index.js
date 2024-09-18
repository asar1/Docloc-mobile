/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Alert, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';

import * as Actions from '../../redux/actions';
import Route from '../../Network/route';
import PhoneSignInVerifyStyles from './PhoneSignInVerifyStyles';
import { BASE_URL } from '../../helper/Constant';
import { BLACK, WHITE } from '../../helper/Color';
import Loader from '../../component/Loader';

const route = new Route(BASE_URL);

class PhoneSignInVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: true,
      loading: false,
      phoneNumberValid: false,
      phoneNumber: '',
      fcmToken: '',
      firstText: '',
      secondText: '',
      thirdText: '',
      fourthText: '',
      fifthText: '',
      sixthText: '',
      confirm: null
    };
  }

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorized
    } catch (error) {
      // User has rejected permissions
    }
  };

  componentDidMount() {
    let abc = this.props.route.params
    console.warn('1234567', typeof abc)
    this.firstTextInput.focus();
    this.setState({ confirm: abc })
  }

  confirmCode = async () => {
    const {
      firstText,
      secondText,
      thirdText,
      fourthText,
      fifthText,
      sixthText,
    } = this.state;
    const completeString =
      firstText + secondText + thirdText + fourthText + fifthText + sixthText;

    console.log(this.state.confirm);
    if (this.state.confirm) {
      let confirmation = this.state.confirm;

      try {
        let confirmationResult = await confirmation.confirm(completeString);
        console.log(confirmationResult, 'confirmation result');
      } catch (error) {
        console.warn('Invalid code.');
        console.log(error, 'error');
      }
    }
    // const { route } = this.props;
    // console.log(route, 'route')
    // try {
    //   this.SignInPhoneNumber(route.params.phone)

    // } catch (error) {
    //   this.setState({ loading: false, firstText: '', secondText: '', thirdText: '', fourthText: '', fifthText: '', sixthText: '' })
    //   this.firstTextInput.focus();
    //   Alert.alert("Failed");
    //   console.log('error - ', error)
    // }
  };

  SignInPhoneNumber = (phoneNumber) => {
    this.setState({ isLoading: true });
    const data = new FormData();
    data.append('phoneNo', phoneNumber);

    route
      .post(
        'auth/phonenosignin',
        JSON.stringify({ phoneNo: phoneNumber }),
      )
      .then((res) => {
        if (res.error) {
          Alert.alert('Error', JSON.stringify(res));
          this.setState({ isLoading: false });
        } else {
          if (res.status === 1) {
            this.setState({ isLoading: false });
            // this.props.setToken(res.data.token)
            // if (res.data.user === null || res.data.user === undefined || res.data.user === '') {
            //   this.props.navigation.navigate("update-user")
            // } else {
            //   this.props.alterJustUser(res.data.user);
            //   this.props.navigation.navigate("update-user")
            // }
            console.log(res, 'res');
          } else {
            Alert.alert(JSON.stringify(res.message));
          }
        }
      });
  };

  render() {
    return (
      <PhoneSignInVerifyStyles.WrapperViewVertical>
        <StatusBar hidden={false} />
        <PhoneSignInVerifyStyles.CrossButton
          onPress={() => this.props.navigation.pop()}>
          <Icon name="cross" color={BLACK.dark} size={40} />
        </PhoneSignInVerifyStyles.CrossButton>
        <PhoneSignInVerifyStyles.ContctImage
          source={require('../../assets/phone_input.png')}
        />
        <PhoneSignInVerifyStyles.InstructionText>
          Enter your mobile number we will send {'\n'} you the OTP to verify
          later
        </PhoneSignInVerifyStyles.InstructionText>
        <PhoneSignInVerifyStyles.PhoneInputWrapper>
          <PhoneSignInVerifyStyles.PhoneInputInnerWrapper>
            <PhoneSignInVerifyStyles.PhoneInputCountryCode
              ref={(input) => {
                this.firstTextInput = input;
              }}
              keyboardType={'number-pad'}
              maxLength={1}
              value={this.state.firstText}
              onChangeText={(firstText) => {
                if (
                  firstText.trim().length > 0 &&
                  firstText.trim().length < 2
                ) {
                  this.setState({ firstText });
                  this.secondTextInput.focus();
                }
              }}
            />
            <PhoneSignInVerifyStyles.PhoneInputCountryCode
              ref={(input) => {
                this.secondTextInput = input;
              }}
              keyboardType={'number-pad'}
              value={this.state.secondText}
              maxLength={1}
              onChangeText={(secondText) => {
                if (
                  secondText.trim().length > 0 &&
                  secondText.trim().length < 2
                ) {
                  this.setState({ secondText });
                  this.thirdTextInput.focus();
                }
              }}
            />
            <PhoneSignInVerifyStyles.PhoneInputCountryCode
              ref={(input) => {
                this.thirdTextInput = input;
              }}
              keyboardType={'number-pad'}
              value={this.state.thirdText}
              maxLength={1}
              onChangeText={(thirdText) => {
                if (
                  thirdText.trim().length > 0 &&
                  thirdText.trim().length < 2
                ) {
                  this.setState({ thirdText });
                  this.fourthTextInput.focus();
                }
              }}
            />
            <PhoneSignInVerifyStyles.PhoneInputCountryCode
              ref={(input) => {
                this.fourthTextInput = input;
              }}
              keyboardType={'number-pad'}
              value={this.state.fourthText}
              maxLength={1}
              onChangeText={(fourthText) => {
                if (
                  fourthText.trim().length > 0 &&
                  fourthText.trim().length < 2
                ) {
                  this.setState({ fourthText });
                  this.fifthTextInput.focus();
                }
              }}
            />
            <PhoneSignInVerifyStyles.PhoneInputCountryCode
              ref={(input) => {
                this.fifthTextInput = input;
              }}
              keyboardType={'number-pad'}
              value={this.state.fifthText}
              maxLength={1}
              onChangeText={(fifthText) => {
                if (
                  fifthText.trim().length > 0 &&
                  fifthText.trim().length < 2
                ) {
                  this.setState({ fifthText });
                  this.sixthTextInput.focus();
                }
              }}
            />
            <PhoneSignInVerifyStyles.PhoneInputCountryCode
              ref={(input) => {
                this.sixthTextInput = input;
              }}
              keyboardType={'number-pad'}
              value={this.state.sixthText}
              maxLength={1}
              onChangeText={(sixthText) => {
                if (
                  sixthText.trim().length > 0 &&
                  sixthText.trim().length < 2
                ) {
                  this.setState({ sixthText, loading: true });
                  setTimeout(() => {
                    this.confirmCode();
                  }, 3000);
                }
              }}
            />
          </PhoneSignInVerifyStyles.PhoneInputInnerWrapper>
          <PhoneSignInVerifyStyles.SubmitButton>
            <PhoneSignInVerifyStyles.CountryCodeText
              style={{ color: WHITE.dark }}>
              Submit
            </PhoneSignInVerifyStyles.CountryCodeText>
          </PhoneSignInVerifyStyles.SubmitButton>
        </PhoneSignInVerifyStyles.PhoneInputWrapper>
        {this.state.loading && <Loader loadingText={'verifying'} />}
      </PhoneSignInVerifyStyles.WrapperViewVertical>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     userDetail: state.user.userDetail,
//     userToken: state.user.userToken,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(Actions, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(PhoneSignInVerify);
export default PhoneSignInVerify;
