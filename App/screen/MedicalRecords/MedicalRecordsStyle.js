

import styled from 'styled-components/native';

import { BLACK, WHITE, ORANGE, GREEN, BLUE, BACKGROUND, TEXT } from '../../helper/Color';
import { SCREEN } from '../../helper/Constant';

const MedicalRecordsStyle = {
  WrapperViewVertical: styled.View`
    flex: 1;
    backgroundColor: #F5FAFE;
  `,
  AbsoluteBackView: styled.TouchableOpacity`
    height: 40;
    width: 40;
    position: absolute;
    top: 45;
    justifyContent: center;
    alignItems: center;
  `,


  TopView: styled.View`
  height: ${SCREEN.width / 1.8}px;
  width: ${SCREEN.width}px;
  borderBottomLeftRadius: 30px;
  borderBottomRightRadius: 30px;
  backgroundColor: ${BACKGROUND.primary};
    
  `,
  HeaderTitleView: styled.View`
    height: ${SCREEN.width / 8}px;
    width: ${SCREEN.width - 200}px;
    alignSelf: center;
    backgroundColor: ${WHITE.dark};
    marginTop: 5%;
    justifyContent: center;
   
  `,
  TitleText: styled.Text`
    textAlign: center;
    color: ${BLUE.blue};
    fontFamily: Menlo;
  `,
  FlatListView: styled.View`
    height: ${SCREEN.height - SCREEN.width / 3}px;
    width: ${SCREEN.width}px;
    alignSelf: center;
    paddingBottom: 25px;
    marginTop: -35%;
`,
  FlatListRenderItemEndView: styled.View`
    width: 89%;
    minHeight:158px;
    backgroundColor: ${TEXT.primary};
    alignSelf: center;
    justifyContent: center;
    marginBottom: 10px;
    paddingHorizontal: 5%;
    paddingLeft: 7%;
    paddingVertical: 0px;
    shadowOffset: 10px 10px;
      shadowColor: ${BLACK.dark};
      shadowOpacity: 0.1;
      elevation: 9;
      borderRadius: 10px
`,
  FlatListRenderItemFirstView: styled.View`
    minHeight: ${SCREEN.width / 2.3}px;
    
    backgroundColor: ${WHITE.dark};
    marginLeft: 5%;
    marginBottom: 10px;
    borderTopWidth: 2;
    padding: 5%;
    paddingTop:-10px;
    borderColor: blue;
    shadowOffset: 10px 10px;
      shadowColor: ${BLACK.dark};
      shadowOpacity: 1;
      elevation: 3;
`,
  TitleView: styled.View`
    flexDirection: row;
    padding:5px;
`,


}

export default MedicalRecordsStyle;