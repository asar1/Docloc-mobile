import styled from 'styled-components/native';
import { BLACK, BLUE, WHITE, GREEN, BACKGROUND, TEXT } from '../../helper/Color';
import { SCREEN, isIphoneXorAbove } from '../../helper/Constant';

const HomeScreenStyles = {
  WrapperViewVertical: styled.View`
    flex: 1;
    backgroundColor: #F5F5F5;
  `,
  TopView: styled.View`
    height: 130px;
    width: ${SCREEN.width}px;
    borderBottomEndRadius: 28px;
    borderBottomLeftRadius: 28px;
    justifyContent: center;
    backgroundColor: ${BACKGROUND.primary};

  `,
  HeaderText: styled.Text`
    fontSize: 20px;
    color: ${BACKGROUND.primary};
    marginBottom: 10px;
    fontFamily: Menlo-Bold;
  `,
  BottomView: styled.View`
    flex: 1;
    paddingBottom: ${isIphoneXorAbove ? 0 : 0}px;
     `,
  ScrollView: styled.ScrollView`
  `,
  TextInputView: styled.View`
    height: 50px;
    width: ${SCREEN.width - 50}px;
    borderRadius: 15px;
    backgroundColor: ${TEXT.primary};
    flexDirection: row;
    alignItems: center;
    alignSelf: center;
    marginTop: 15px;
  `,
  IconView: styled.View`
    height: 54px;
    width: 50px;
    justifyContent: center;
    alignItems: center;
  `,
  TextInputInner: styled.TextInput`
    width: ${SCREEN.width - 150}px;
    height: 54px;
    backgroundColor: #F5F3F3;
    paddingVertical: 8px;
    editable=false;
    selectTextOnFocus=false
  `,
  searchButtonView: styled.TouchableOpacity`
  borderWidth: 1px;
  borderRadius: 10px;
`,
  HeaderText: styled.Text`
    fontSize: 18px;
    fontWeight: 700;
    fontFamily: Poppins-Bold;
    paddingHorizontal: 13px;
  `,
  CellText: styled.Text`
  fontSize: 14px;
  fontWeight: 700;
  fontFamily: Poppins-Bold;
  lineHeight: 20px;
`,
  CategoryWrapper: styled.TouchableOpacity`
    backgroundColor: #F5F5F5;
  `,
  CategoryItemWrapper: styled.TouchableOpacity`
    height: 100px;
    width: 120px;
    marginHorizontal: 5px;
    borderRadius: 18px;
    paddingHorizontal: 10px;
  `,
  CategoriesFlatList: styled.FlatList`
    width: ${SCREEN.width}px;
    height: 130px;
  `,
  DoctorsFlatList: styled.FlatList`
    marginHorizontal: 10px;
    backgroundColor: white;
  `,
  CategoryItemInner: styled.View`
    justifyContent:center;
    alignSelf:center;
  `,
  DoctorWrapper: styled.View`
    height: 80px;
    paddingLeft: 15px;
    width: ${SCREEN.width - 50}px;
    alignSelf: center;
    shadowColor: ${BLACK.dark};
     shadowOffset: 0px 1px;
    shadowOpacity: 0.20;
    shadowRadius: 3px;
    elevation: 4;
    backgroundColor: ${WHITE.dark};
    borderRadius: 20px;
    marginBottom:15px;
    marginTop: 1px;
  `,
  DoctorWrapperInner: styled.TouchableOpacity`
    flexDirection: row;
    height: 100px;
    width: ${SCREEN.width - 30}px;
  `,
  ImageView: styled.View`
    height: 80px;
    justifyContent: center;
  `,
  ImageInner: styled.Image`
    height: 50px;
    width: 50px;
    borderRadius: 25px;
    borderColor: ${TEXT.primary};
    borderWidth: 0px;
  `,
  ViewRatting: styled.View`
    minHeight: 20px;
    width: ${SCREEN.width - 140}px;
    flexDirection: row;
    alignItems: center;
    justifyContent: space-between;
    paddingVertical: 2px;
  `,
  SpecialityImage: styled.Image`
  height: 40px;
  width: 40px;
  `,
};

export default HomeScreenStyles;
