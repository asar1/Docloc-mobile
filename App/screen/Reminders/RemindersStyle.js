
import styled from 'styled-components/native';

import { BLACK, WHITE, ORANGE, GREEN, BLUE } from '../../helper/Color';
import { SCREEN } from '../../helper/Constant';

const RemindersStyle={
    WrapperViewVertical: styled.View`
    flex: 1;
    backgroundColor: ${WHITE.off};
  `,
  TopView: styled.View`
  backgroundColor: ${WHITE.dark};
  width: ${SCREEN.width};
  height: ${SCREEN.height / 5.2}px;
  borderBottomLeftRadius: 30;
  borderBottomRightRadius: 30;
  justifyContent: center;
  alignSelf: center;
`,
AbsoluteBackView: styled.TouchableOpacity`
height: 40;
width: 40;
position: absolute;
top: 20;
justifyContent: center;
alignItems: center;
`,
BottomView: styled.View`
width: ${SCREEN.width - 40}px;
height: ${SCREEN.height / 1.8}px;
justifyContent: center;
marginTop: 20;
marginHorizontal: 20px;
`,

};

export default RemindersStyle;