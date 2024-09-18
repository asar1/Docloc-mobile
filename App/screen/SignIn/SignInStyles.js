import styled from 'styled-components/native';

import { BLACK, WHITE, GREEN } from '../../helper/Color';
import { SCREEN } from '../../helper/Constant';

const SignInStyles = {
  WrapperViewVertical: styled.View`
    flex: 1;
    backgroundColor: ${WHITE.dark};
  `,
  WrapperViewVertical2: styled.View`
    flex: 1;
    justifyContent: center;
  `,
  TopAbsoluteView: styled.View`
    height: 462px;
    width: 462px;
    borderRadius: ${462 / 2}px;
    backgroundColor: ${GREEN.app};
    position: absolute;
    top: -190px;
    left: -70px;
    justifyContent: flex-end;
    paddingBottom: 100px;
    alignItems: center;
  `,
  HeaderText: styled.Text`
    fontSize: 36px;
    color: ${WHITE.dark};
    fontFamily: Menlo-Bold;
  `,
  AbsoluteLoadingView: styled.View`
    height: ${SCREEN.height}px;
    width: ${SCREEN.width}px;
    position: absolute;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${BLACK.placeholder};
  `,
  ActivityIndicatorLoading: styled.ActivityIndicator`
    alignSelf: center;
  `,
  AbsoluteIconView: styled.View`
    position: absolute;
    left: 30px;
  `,
  PhoneNumberSignButton: styled.TouchableOpacity`
    height: 50px;
    width: ${SCREEN.width - 50}px;
    alignSelf: center;
    borderRadius: 22px;
    backgroundColor: ${WHITE.dark};
    alignItems: center;
    shadowColor: #000;
    shadowOffset: 0px 1px;
    shadowOpacity: 0.29;
    shadowRadius: 4px;
    elevation: 1.7;
    flexDirection: row;
    justifyContent: center;
    marginTop: 50px;
  `,
  ButtonInnerText: styled.Text`
    fontSize: 15px;
    marginLeft: 5px;
    fontFamily: Menlo-Bold;
  `,
};

export default SignInStyles;
