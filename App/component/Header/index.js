import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/Ionicons';

import HeaderStyles from './HeaderStyles';
import { WHITE } from '../../helper/Color';

const Header = ({
  backColor,
  leftType,
  leftImage,
  leftText,
  rightType,
  rightImage,
  rightText,
  HeaderText,
  leftPress,
  rightPress,
}) => (
    <HeaderStyles.WrapperView>
      <HeaderStyles.Flex1View>
        {leftType === 'text' ?
          <HeaderStyles.LeftText onPress={leftPress}>
            {leftText}
          </HeaderStyles.LeftText> :
          <HeaderStyles.LeftImage onPress={leftPress}>
            <Icon size={30} color={WHITE.dark} name={'menu'} />
          </HeaderStyles.LeftImage>}
      </HeaderStyles.Flex1View>
      <HeaderStyles.Flex1View>
        <HeaderStyles.TitleText>
          {HeaderText}
        </HeaderStyles.TitleText>
      </HeaderStyles.Flex1View>
      <HeaderStyles.Flex1View style={{ alignItems: 'flex-end', marginRight: 15 }}>
        {rightType === 'text' ?
          <HeaderStyles.RightText onPress={rightPress}>
            {rightText}
          </HeaderStyles.RightText> :
          <HeaderStyles.RightImage onPress={rightPress}>
            {rightImage ? <Icon size={30} color={WHITE.dark} name={rightImage} /> :
            <Icon1 size={30} color={WHITE.dark} name={'ios-notifications'} />}
          </HeaderStyles.RightImage>}
      </HeaderStyles.Flex1View>
    </HeaderStyles.WrapperView>)

export default Header;
