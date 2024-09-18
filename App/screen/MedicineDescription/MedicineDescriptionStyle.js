
import styled from 'styled-components/native';

import { BLACK, WHITE, ORANGE, GREEN, BLUE } from '../../helper/Color';
import { SCREEN } from '../../helper/Constant';

const MedicineDescriptionStyle = {
    WrapperViewVertical: styled.View`
    flex: 1;
    backgroundColor: ${WHITE.off};
  `,
  HeaderView: styled.View`
  width: ${SCREEN.width};
  height: ${SCREEN.height / 3.2}px;
  backgroundColor: #1D2366;
`,
BackButtonView: styled.View`
flexDirection: row;
justifyContent: space-between;
height: ${SCREEN.height / 9.2}px;
marginHorizontal: 20px;
`,
TabletImage: styled.View`
height: ${SCREEN.height / 5.2}px;
justifyContent: center;
`,
medicineText: styled.Text`
textAlign: center;
color: ${WHITE.dark};
 fontWeight: bold;
 marginTop: 10px;
 fontFamily: Menlo;
`,
BottomView: styled.View`
height: ${SCREEN.height / 2.1}px;
marginHorizontal: 20px;
`,
BottomInnerView: styled.ScrollView`
backgroundColor: ${WHITE.dark};
padding: 30px;
marginTop: 20px;
borderRadius: 20;
`,
DosageText: styled.Text`
color: ${BLACK.dark};
 fontWeight: bold;
 fontFamily: Menlo-Bold;
`,
RowView: styled.View`
flexDirection: row;
justifyContent: space-between;
paddingTop: 5px;
`,
ThreeTimesText: styled.Text`
color: ${BLACK.dark};
fontFamily: Menlo;
`,
TimeView: styled.View`
backgroundColor: green;
paddingHorizontal: 7;
`,
TimesText: styled.Text`
color: ${WHITE.dark};
`,
ProgrammeText: styled.Text`
color: ${BLACK.dark};
 fontWeight: bold;
 marginTop: 20px;
 fontFamily: Menlo-Bold;
`,
WeekText: styled.Text`
color: ${BLACK.dark};
paddingTop: 10px;
fontFamily: Menlo;
`,
SubmitButton: styled.TouchableOpacity`
height: 40px;
width: ${SCREEN.width - 120}px;
borderRadius: 20px;
backgroundColor: #FFD037;
justifyContent: center;
alignItems: center;
alignSelf: center;
marginTop: 15px;
`,
CountryCodeText: styled.Text`
fontSize: 16px;
alignSelf: center;
fontWeight: bold;
fontFamily: Menlo-Bold;
`,
};
export default MedicineDescriptionStyle;