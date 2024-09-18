
import styled from 'styled-components/native';

import { BLACK, WHITE, ORANGE, GREEN, BLUE, BACKGROUND, TEXT } from '../../helper/Color';
import { SCREEN } from '../../helper/Constant';

const MyDoctorsStyle = {
  WrapperViewVertical: styled.View`
    flex: 1;
    backgroundColor: ${WHITE.off};
    
  `,
  TopView: styled.View`
    height: ${SCREEN.width / 1.8}px;
    width: ${SCREEN.width}px;
    borderBottomLeftRadius: 30px;
    borderBottomRightRadius: 30px;
    backgroundColor: ${BACKGROUND.primary};
   
  `,
  HeaderView: styled.View`
  height: 80%;
  flexDirection: row;
  `,
  HeaderText: styled.Text`
  height: 30%;
  textAlign: center;
  textAlignVertical: center;
  color: ${TEXT.primary};
  fontWeight: bold;
  fontSize: 20px;
  marginTop: 10px;
  paddingHorizontal: 20px;
  borderRadius:20px;
  fontFamily: Menlo-Bold;
  `,
  FlatListView: styled.View`
  flex: 1;
  marginHorizontal: 20px;
  marginTop: -135px;
  paddingBottom: 5px;
  `,
  TouchableOpacityView: styled.TouchableOpacity`
  backgroundColor: ${TEXT.primary};
  height:  ${SCREEN.width / 2.6}px;
  padding: 10px;
  borderRadius: 20px;
  marginVertical: 8px;
  paddingBottom:20px;
  `,
  innerTopView: styled.View`
  height: 60%;
  flexDirection: row;
  padding: 10px;
  `,
  profileTextView: styled.View`
  marginLeft: 5%;
  width: 72%;
  `,
  profileDescriptionView: styled.View`
  paddingTop: 10px;
  `,
  ImageView: styled.Image`
  width: 61px;
  height: 61px;
  borderRadius: 40px;
  marginTop:10px;
  backgroundColor: ${BACKGROUND.primary};
  `,
  profileName: styled.Text`
  color: ${TEXT.secondary};
  fontFamily: Menlo-Bold;
  fontSize: 14px;
  fontWeight: bold;
  marginRight:10px;
  `,
  profileEducation: styled.Text`
  color: ${TEXT.description};
  fontFamily: Menlo;
  fontSize: 10px;
  fontFamily: Poppins;
  lineHeight:15px;
  `,
  profileStatus: styled.Text`
  color: ${BLACK.light};
  fontSize: 10px;
  paddingTop: 4%;
  fontFamily: Poppins;
  `,
  profileTime: styled.Text`
  color: ${TEXT.secondary};
  fontSize: 10px;
  paddingTop: 4%;
  fontWeight: bold;
  fontFamily: Menlo;
  `,
  innerBottomView: styled.View`
  flexDirection: row;
  justifyContent: space-between;
  padding: 10px;
  `,
  MessageImage: styled.Image`
  resizeMode: contain;
  width: 40px;
  height: 40px;
  `,
}
export default MyDoctorsStyle;