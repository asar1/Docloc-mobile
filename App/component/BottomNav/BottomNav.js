/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import BottomNavStyle from './BottomNavStyle';
import { GREEN, BLUE, BLACK, BACKGROUND } from '../../helper/Color';
import Icon1 from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Feather'

const BottomNav = ({
  navigation,
  checkPreviewState,
  index,
  isIphoneXorAbove,
  opacityActually,
}) => (
  <BottomNavStyle.WrapperView
    style={{height: isIphoneXorAbove ? 70 : 50, opacity: opacityActually}}>
    <BottomNavStyle.LinkWrapper
      style={{marginBottom: isIphoneXorAbove ? 15 : 0}}>
      <TouchableOpacity
        style={{minWidth: 40, alignSelf: "center"}}
        onPress={() => {
          if (opacityActually == 1) {
            navigation('TabStackOne', 0);
          }
        }}>
        <BottomNavStyle.IconWrapperView>
          <Icon1 name="home" size={30} color={index === 0 ? BACKGROUND.primary : BLACK.textColor} />
          <BottomNavStyle.IconText style={{fontWeight: index === 0 ? '500' : '200' }}>
            Home
          </BottomNavStyle.IconText>
        </BottomNavStyle.IconWrapperView>
      </TouchableOpacity>
    </BottomNavStyle.LinkWrapper>
    <BottomNavStyle.LinkWrapper
      style={{marginBottom: isIphoneXorAbove ? 15 : 0}}>
      <TouchableOpacity
        style={{ minWidth: 40, alignSelf: "center"}}
        onPress={() => {
          if (opacityActually == 1) {
            navigation('TabStackTwo', 1);
          }
        }}>
        <BottomNavStyle.IconWrapperView>
          <Icon1 name="wechat" size={30} color={index === 1 ? BACKGROUND.primary : BLACK.textColor} />
          <BottomNavStyle.IconText style={{fontWeight: index === 1 ? '500' : '200' }}>
            Chat
          </BottomNavStyle.IconText>
        </BottomNavStyle.IconWrapperView>
      </TouchableOpacity>
    </BottomNavStyle.LinkWrapper>
    <BottomNavStyle.LinkWrapper
      style={{marginBottom: isIphoneXorAbove ? 15 : 0}}>
      <TouchableOpacity
        style={{minWidth: 40, alignSelf: "center"}}
        onPress={() => {
          if (opacityActually == 1) {
            navigation('TabStackThree', 2);
          }
        }}>
        <BottomNavStyle.IconWrapperView>
          <Icon2 name="user" size={30} color={index === 2 ? BACKGROUND.primary : BLACK.textColor} />
          <BottomNavStyle.IconText style={{fontWeight: index === 2 ? '500' : '200' }}>
            Account
          </BottomNavStyle.IconText>
        </BottomNavStyle.IconWrapperView>
      </TouchableOpacity>
    </BottomNavStyle.LinkWrapper>
  </BottomNavStyle.WrapperView>
);

export default BottomNav;
