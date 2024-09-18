import styled from 'styled-components/native';
import { SCREEN } from '../../helper/Constant';
import { WHITE, BLACK, GREEN, BACKGROUND, TEXT } from '../../helper/Color';

const SearchItemStyles = {
  WrapperView: styled.TouchableOpacity`
  width: ${SCREEN.width - 30}px;
  backgroundColor: ${WHITE.dark};
  borderRadius: 15px;
  alignSelf: center;
  margin: 2px;
  marginTop: 15px;
`,
  ItemTopViewWrapper: styled.View`
  flexDirection: row;
`,
  ItemBottomWrapper: styled.View`
`,
  ItemTopLeftWrapper: styled.View`
  flex: 0.3;
  marginTop: 18px;
`,
  ItemTopRightWrapper: styled.View`
  flex: 0.7;
  paddingLeft: 10px;
  paddingBottom: 20px;
`,
  ImageWrapper: styled.View`
  height: ${(SCREEN.width - 30) / 5}px;
  width : ${(SCREEN.width - 30) / 5}px;
  alignSelf: center;
  justifyContent: space-between;
`,
  DoctorImage: styled.Image`
  height: 61px;
  width : 61px;
  alignSelf: center;
  borderRadius: 50px;
`,
  AbsolutePerformanceView: styled.View`
  height: 30px;
  width: 30px;
  position: absolute;
  right: 5px;
  bottom: 3px;
  borderRadius: 15px;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${BACKGROUND.info};
  borderWidth: 2px;
  borderColor: ${WHITE.dark};
`,
  PerformanceText: styled.Text`
  fontSize: 12px;
  color: ${TEXT.primary};
  fontFamily: Poppins-Bold;
`,
  FeedbackText: styled.Text`
  fontSize: 10px;
  fontFamily: Poppins;
  textAlign: center;
  paddingTop: 5px;
  fontWeight: 700;
`,
  doctorName: styled.Text`
  fontSize: 14px;
  marginTop: 10px;
  fontFamily: Poppins;
  justifyContent: space-between;
  flexDirection: row;
  fontWeight: 700;
`,
  FeesText: styled.Text`
  fontSize: 12px;
  fontFamily: Poppins;
  fontWeight: 700;
`,
  BioViewWrapper: styled.View`
 
`,
  BioText: styled.Text`
  fontSize: 10px;
  color: #898A8F;
  fontFamily: Poppins;
`,
  LocationWrapper: styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: flex-end;
  height: 30px;
  paddingRight: 50px;
`,
  BioTextSimple: styled.Text`
  fontSize: 12px;
  color: ${BLACK.textColor};
  fontFamily: Poppins;
`,
  SpecialtiesView: styled.View`
  height: 30px;
  minWidth: 80px;
  paddingHorizontal: 20px;
  alignItems: center;
  borderWidth: 0.3px;
  borderColor: ${BLACK.placeholder};
  justifyContent: center;
  borderRadius: 15px;
  marginHorizontal: 5px;
`,
  ContactButton: styled.TouchableOpacity`
  height: 40px;
  width: 160px;
  justifyContent: center;
  alignItems: center;
  alignSelf: flex-end;
  marginRight: 5px;
  marginTop: 10px;
  borderWidth: 0.3;
  borderColor: ${BACKGROUND.primary};
  borderRadius: 20px;
  marginBottom: 20px;
`,
  ContactButtonText: styled.Text`
  fontSize: 15px;
  fontFamily: Poppins;
  color: ${BACKGROUND.primary};
`,
};

export default SearchItemStyles;
