import styled from 'styled-components/native';

import { BLACK, WHITE, ORANGE, GREEN, BLUE, TEXT, BACKGROUND } from '../../helper/Color';
import { SCREEN } from '../../helper/Constant';

const AccountStyles = {
  WrapperViewVertical: styled.View`
    flex: 1;
    backgroundColor: ${WHITE.off}
  `,
  TopView: styled.View`
    height: ${SCREEN.width / 2}px;
    width: ${SCREEN.width - 40}px;
    borderRadius: 20px;
    backgroundColor: ${BACKGROUND.primary};
    alignSelf: center;
    marginTop: 25px;
    alignItems: center;
  `,
  ImageView: styled.Image`
    height: 90px;
    width: 90px;
    marginTop:-25px;
    borderRadius: 45px;
    borderWidth:3px;
    borderColor:white;
  `,
  NameText: styled.Text`
    marginTop: 10px;
    fontSize: 16px;
    fontWeight: 600;
    color: ${TEXT.primary};
    fontFamily: Menlo-Bold;
  `,
  ProgressWrapper: styled.View`
    height: 15px;
    width: ${SCREEN.width - 100}px;
    alignSelf: center;
    backgroundColor: ${TEXT.progressBar};
    borderRadius: 7px;
    marginTop: 5px;
  `,
  ProgressInner: styled.View`
    height: 4px;
    marginTop:6px;
    marginLeft:10px;
    borderRadius:2px;
    width: ${SCREEN.width - 400}px;
    backgroundColor: ${TEXT.primary};
  `,
  SubmitButton: styled.TouchableOpacity`
  height: 40px;
  width: ${SCREEN.width - 180}px;
  borderRadius: 20px;
  backgroundColor: transparent;
  justifyContent: center;
  alignItems: center;
  alignSelf: center;
  marginTop: 20px;
  borderWidth: 1px;
  borderColor: #F4F4F4 ;
`,
  CountryCodeText: styled.Text`
fontSize: 12px;
alignSelf: center;
fontFamily: Menlo;

`,
  BottomViewWrapper: styled.View`
    flex: 1;
  `,
  BottomViewInner: styled.View`
    marginTop: 15px;
    width: ${SCREEN.width - 40}px;
    alignSelf: center;
    backgroundColor: ${WHITE.dark};
    borderRadius: 20px;
    elevation:4;
    marginBottom:15px;
    flex:1;

  `,
  Scroll: styled.ScrollView`
    flex: 1;
  `,
};

export default AccountStyles;
