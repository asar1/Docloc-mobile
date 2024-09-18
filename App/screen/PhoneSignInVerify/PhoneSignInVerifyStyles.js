import styled from 'styled-components/native';
import { BLACK, BLUE, WHITE } from '../../helper/Color';
import { SCREEN } from '../../helper/Constant';

const PhoneSignInVerifyStyles = {
  WrapperViewVertical: styled.View`
    flex: 1;
    backgroundColor: ${WHITE.app};
  `,
  CrossButton: styled.TouchableOpacity`
    height: 44px;
    width: 44px;
    justifyContent: center;
    alignItems: center;
    marginTop: 20px;
    marginLeft: 10px;
  `,
  ContctImage: styled.Image`
    height: 74px;
    width: 102px;
    alignSelf: center;
    marginTop: 10px;
  `,
  InstructionText: styled.Text`
    marginTop: 20px;
    alignSelf: center;
    color: ${BLACK.textColor};
    fontSize: 14px;
    textAlign: center;
  `,
  PhoneInputWrapper: styled.View`
    minHeight: 168px;
    width: ${SCREEN.width - 20}px;
    backgroundColor: ${WHITE.dark};
    borderRadius: 10px;
    shadowColor: #000;
     shadowOffset: {
	     width: 0,
	     height: 1,
     };
    shadowOpacity: 0.29;
    shadowRadius: 4px;
    elevation: 0.7;
    marginTop: 15px;
    alignSelf: center; 
  `,
  PhoneInputInnerWrapper: styled.View`
    height: 46px;
    width: ${SCREEN.width - 40}px;
    alignSelf: center;
    justifyContent: center;
    flexDirection: row;
    marginTop: 15px;
  `,
  PhoneInputCountryCode: styled.TextInput`
    height: 46px;
    width: ${(SCREEN.width - 60) / 6}px;
    borderRadius: 5px;
    borderWidth: 0.25px;
    borderColor: ${BLACK.textColor};
    justifyContent: center;
    alignItems: center;
    marginLeft: 3px;
    textAlign: center;
    fontSize: 18px;
  `,
  PhoneInputNumberWrapper: styled.View`
    height: 46px;
    width: ${SCREEN.width - 110}px;
    marginLeft: 18px;
    justifyContent: center;
    borderRadius: 5px;
    borderWidth: 0.25px;
    borderColor: ${BLACK.textColor};
  `,
  PhoneInputInner: styled.TextInput`
    height: 46px;
    width: ${SCREEN.width - 110}px;
    paddingLeft: 5px;
  `,
  AbsoluteNumberVerify: styled.View`
    height: 40px;
    width: 40px;
    position: absolute;
    right: 10px;
    justifyContent: center;
    alignItems: center;
  `,
  CountryCodeText: styled.Text`
    fontSize: 16px;
    alignSelf: center;
  `,
  SubmitButton: styled.TouchableOpacity`
    height: 46px;
    width: ${SCREEN.width - 40}px;
    borderRadius: 20px;
    backgroundColor: ${BLUE.border};
    justifyContent: center;
    alignItems: center;
    alignSelf: center;
    marginTop: 15px;
  `,
};

export default PhoneSignInVerifyStyles;
