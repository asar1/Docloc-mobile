import styled from 'styled-components';
import {WHITE} from '../../helper/Color';
const BottomNavStyle = {
  WrapperView: styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background-color: ${WHITE.dark};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top-width: 1px;
    border-color: ${WHITE.off};
  `,

  LinkWrapper: styled.View`
    flex: 1;
  `,

  IconWrapperView: styled.View`
    align-items: center;
    justify-content: center;
    align-content: center;
  `,

  CreateView: styled.View`
    position: relative;
    align-items: center;
    justify-content: center;
  `,

  DotView: styled.View`
    position: absolute;
    align-self: center;
  `,
  IconText: styled.Text`
    fontSize: 12px;
    alignSelf: center;
    textAlign: center;
    fontFamily: Menlo;
  `,
};

export default BottomNavStyle;
