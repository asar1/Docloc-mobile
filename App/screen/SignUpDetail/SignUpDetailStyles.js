import styled from 'styled-components/native';
import { BLACK, BLUE, WHITE } from '../../helper/Color';
import { SCREEN } from '../../helper/Constant';

const SignUpDetailStyles = {
  WrapperViewVertical: styled.View`
    flex: 1;
    backgroundColor: ${WHITE.app};
  `,
  TextInputField: styled.TextInput`
    height: 40px;
    width: ${SCREEN.width - 30}px;
    alignSelf: center;
    borderWidth: 1px;
    borderColor: ${BLACK.placeholder};
    alignItems: center;
    marginVertical: 10px;
    paddingHorizontal: 5px;
  `,
  CountryCodeText: styled.Text`
    fontSize: 18px;
    fontWeight: bold;
    alignSelf: center;
    marginVertical: 5px;
    fontFamily: Menlo-Bold;
  `,
  SmallText: styled.Text`
    fontSize: 15px;
    alignSelf: center;
    marginVertical: 5px;
    fontFamily: Menlo;
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
  SimpleView: styled.View`
  `,
};

export default SignUpDetailStyles;
