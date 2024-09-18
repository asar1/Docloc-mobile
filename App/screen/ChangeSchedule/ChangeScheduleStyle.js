
import styled from 'styled-components/native';
import { BLACK, WHITE, ORANGE, GREEN, BLUE } from '../../helper/Color';
import { SCREEN } from '../../helper/Constant';

const ChangeScheduleStyle = {
    WrapperViewVertical: styled.View`
    flex: 1;
    backgroundColor: ${WHITE.off};
  `,
  HeaderView: styled.View`
  width: ${SCREEN.width - 40}px;
  height: ${SCREEN.height / 6.2};
  borderBottomWidth: 1;
  justifyContent: center;
  alignSelf: center;
  borderColor: gray;
`,
DimerolText: styled.Text`
color: ${BLACK.dark};
fontWeight: bold;
fontSize: 16;
paddingTop: 7%
`,
ScrollView: styled.ScrollView`
marginBottom: 20%;
`,
FirstBoxView: styled.View`
backgroundColor: ${WHITE.dark};
width: ${SCREEN.width - 40}px;
height: ${SCREEN.height / 2.4};
alignSelf: center;
justifyContent: center;
marginTop: 5%;
borderRadius: 20;
`,
secondBoxView: styled.View`
backgroundColor: ${WHITE.dark};
width: ${SCREEN.width - 40}px;
height: ${SCREEN.height / 1.7};
alignSelf: center;
justifyContent: center;
marginTop: 5%;
borderRadius: 20;
`,
FlatListView: styled.View`
height: 20%;
justifyContent: center;
marginTop: 5%;
backgroundColor: #EFF1F4;
marginLeft: 8%
`,
RenderFlatListItemView: styled.View`
borderWidth: 1;
justifyContent: center;
marginHorizontal: 5px;
borderRadius: 10px;
borderColor: gray
`,
RenderFlatListItemText: styled.Text`
color: ${BLACK.dark};
textAlign: center;
padding: 10px
`,
ReminderTimeRowView: styled.View`
flexDirection: row;
height: 25%;
marginLeft: 8%;
justifyContent: space-between;
`,
SecondBoxRowView: styled.View`
flexDirection: row;
height: 15%;
marginLeft: 8%;
justifyContent: space-between;
`,
SecondBoxRowSwitchView: styled.View`
flexDirection: row;
height: 15%;
marginLeft: 8%;
justifyContent: space-around;
`,
SecondBoxRowSwitchText: styled.Text`
color: ${BLACK.dark};
width: 30%;
textAlignVertical: center;
`,
ReminderTimeText: styled.Text`
color: ${BLACK.dark};
width: 40%;
textAlignVertical: center;
`,
ReminderTimeRowView2: styled.View`
flexDirection: row;
height: 25%;
marginLeft: 8%;
justifyContent: space-between;
`,
DosageValueSelectView: styled.View`
flexDirection: row;
justifyContent: space-between;
borderWidth: 1;
width: 40%;
borderRadius: 20;
height: 60%;
alignSelf: center;
marginRight: 7%
`,
DosageValueFirstElementView: styled.TouchableOpacity`
borderWidth: 1;
borderRadius: 20;
width: 20%;
justifyContent: center;
height: 60%;
alignSelf: center;
backgroundColor: #FFD037;
marginLeft: 5px
`,
DosageValueSecondElementView: styled.TouchableOpacity`
borderWidth: 1;
borderRadius: 20;
width: 20%;
justifyContent: center;
height: 60%;
alignSelf: center;
backgroundColor: #FFD037;
marginRight: 5px
`,
DosageValueFirstElementText: styled.Text`
color: ${BLACK.dark};
textAlign: center;
fontSize: 26px;
`,
DosageTimeView: styled.View`
width: 40%;
height: 15%;
flexDirection: row;
justifyContent: space-around;
marginLeft: 20
`,
ClockTimeText: styled.Text`
color: ${BLACK.dark};
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
`,
};

export default ChangeScheduleStyle;