import styled from 'styled-components/native';
import {  WHITE, GREEN, BACKGROUND } from '../../helper/Color';

const SplashStyles = {
  WrapperViewVertical: styled.View`
    flex: 1;
    justifyContent: center;
    backgroundColor: ${BACKGROUND.primary};
  `,
  SplashText: styled.Text`
    fontSize: 22px;
    color: ${WHITE.dark};
    fontFamily: Poppins-Bold;
    alignSelf: center;
  `,
};

export default SplashStyles;
