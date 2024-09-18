
import styled from 'styled-components/native';
import { BACKGROUND, BLACK, BLUE, WHITE } from '../../helper/Color';
import { SCREEN, isIphoneXorAbove } from '../../helper/Constant';

const SearchScreenStyle = {
  WrapperViewVertical: styled.View`
    flex: 1;
    backgroundColor: #F5F5F5;
`,
  HeaderView: styled.View`
    backgroundColor: ${BACKGROUND.primary};
    width: ${SCREEN.width}px;
    height: 90px;
    borderBottomEndRadius: 30px;
    borderBottomLeftRadius: 30px;
`,
  SearchWrapperView: styled.View`
  height: 44px;
  width: ${SCREEN.width - 15}px;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
  alignSelf: center;
`,
  FilterButton: styled.TouchableOpacity`
  height: 35px;
  width: 35px;
  marginLeft: 10px;
  justifyContent: center;
  alignItems: center;
`,
  SearchTextInput: styled.TextInput`
   height: 44px;
   width: ${SCREEN.width - 60}px;
   borderWidth: 2px;
   borderColor: ${WHITE.dark};
   borderRadius: 10px;
   paddingHorizontal: 5px;
`,
  DataList: styled.FlatList`
   alignSelf: center;
   paddingTop: 5px;
`,

};

export default SearchScreenStyle;