
import styled from 'styled-components/native';

import { BLACK, WHITE, ORANGE, GREEN, BLUE } from '../../helper/Color';
import { SCREEN } from '../../helper/Constant';

const HealthInterustStyle ={
    WrapperViewVertical: styled.View`
    flex: 1;
    backgroundColor: ${WHITE.off};
  `,
  TopView: styled.View`
    height: ${SCREEN.width / 2.9}px;
    width: ${SCREEN.width}px;
    alignSelf: center;
    marginTop: 5px;
   
  `,
  HeaderView: styled.View`
  height: 30%;
  flexDirection: row;
  `,
  HeaderText: styled.Text`
  height: 100%;
  textAlign: center;
  textAlignVertical: center;
  color: ${BLACK.dark};
  fontWeight: bold;
  fontSize: 14;
  marginLeft: 5%;
  `,
}
export default HealthInterustStyle;