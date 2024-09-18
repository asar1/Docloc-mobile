import styled from 'styled-components/native';

import {SCREEN, isIphoneXorAbove} from '../../helper/Constant';
import {WHITE, BLUE, APPCOLOR, BLACK, GREEN} from '../../helper/Color';

const HeaderStyles = {
  WrapperView: styled.View`
    width: 100%;
    height: ${isIphoneXorAbove ? 90 : 60}px;
    flex-direction: row;
    justify-content: space-between;
    marginTop: ${isIphoneXorAbove ? 15 : 0}px;
    align-items: center;
    border-bottom-width: 1px;
    border-color: ${WHITE.borderLight};
    backgroundColor: ${GREEN.deafult};
  `,
  Flex1View: styled.View`
    flex: 1;
    justifyContent: center;
  `,
  LeftText: styled.Text`
    fontSize: 16px;
    marginLeft: 15px;
    color: ${WHITE.dark};
    fontWeight: 600;
    fontFamily: Menlo-Bold;
  `,
  LeftImage: styled.TouchableOpacity`
    height: 35px;
    width: 35px;
    marginLeft: 15px;
  `,
  RightText: styled.Text`
    alignSelf: flex-end;
    fontSize: 16px;
    marginRight: 15px;
    color: ${WHITE.dark};
    fontWeight: 600;
    fontFamily: Menlo-Bold;
  `,
  RightImage: styled.TouchableOpacity`
    height: 35px;
    width: 35px;
  `,
  TitleText: styled.Text`
    alignSelf: center;
    fontSize: 18px;
    fontWeight: 700;
    color: ${WHITE.dark};
    fontFamily: Menlo;
  `,
};

export default HeaderStyles;
