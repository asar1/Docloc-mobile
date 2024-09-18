
import styled from 'styled-components/native';
import { BACKGROUND, BLACK, BLUE, GREEN, WHITE } from '../../helper/Color';
import { SCREEN, isIphoneXorAbove } from '../../helper/Constant';

const FilterStyle = {
  WrapperViewVertical: styled.View`
    flex: 1;
    backgroundColor: #989696;
  `,
  HeaderView: styled.View`
    backgroundColor: ${GREEN.app};
    width: ${SCREEN.width}px;
    height: ${SCREEN.height / 5.5}px;
    borderBottomEndRadius: 15px;
    borderBottomLeftRadius: 15px;
`,
  innerView: styled.View`
    backgroundColor: ${GREEN.app};
    width: ${SCREEN.width - 40}px;
    height: 100%;
    alignSelf: center;
    flexDirection: row;
    justifyContent: space-between;
`,
  filterText: styled.Text`
    alignSelf: flex-end;
    fontWeight: bold;
    color: ${WHITE.dark};
    marginBottom: 5%;
    fontSize: 16;
    fontFamily: Poppins;
`,
  cancelFilterText: styled.Text`
    color: ${WHITE.dark};
    fontSize: 16;
    fontFamily: Poppins;
`,
  TouchableView: styled.TouchableOpacity`
    alignSelf: flex-end;
    marginBottom: 5%;
`,
  ScrollView: styled.ScrollView`
    width: ${SCREEN.width - 40}px;
    alignSelf: center;
`,
  SortByBoxView: styled.View`
    backgroundColor: ${WHITE.dark};
    width: 100%;
    marginTop: 15px;
    borderRadius: 20px;
    padding: 20px;
    paddingTop: 16px;
`,
  AvailabilityBoxView: styled.View`
    backgroundColor: ${WHITE.dark};
    width: 100%;
    marginTop: 15px;
    borderRadius: 20px;
    padding: 20px;
    paddingTop: 16px;
`,
  sortByText: styled.Text`
    color: #898A8F;
    fontSize: 12px;
    fontFamily: Poppins;
`,
  rowViewButton: styled.TouchableOpacity`
    flexDirection: row;
    marginTop: 15px;
`,
  circleView: styled.View`
    borderWidth: 1px;
    borderRadius: 50px;
    borderColor: blue;
    height: 12px;
    width: 12px;
    marginTop: 4px;
`,
  circleFilledView: styled.View`
    borderWidth: 1px;
    borderRadius: 50px;
    borderColor: blue;
    backgroundColor: blue;
    height: 12px;
    width: 12px;
    marginTop: 4px;
`,
  CircleText: styled.Text`
    color: ${BLACK.dark};
    fontFamily: Poppins;
    fontSize: 14px;
    fontWeight: 600;
    marginLeft: 5%;
`,
  SubmitButton: styled.TouchableOpacity`
    height: 50px;
    width: ${SCREEN.width - 110}px;
    borderRadius: 25px;
    backgroundColor: ${BACKGROUND.primary};
    justifyContent: center;
    alignItems: center;
    alignSelf: center;
`,
  CountryCodeText: styled.Text`
    fontSize: 14px;
    alignSelf: center;
    fontFamily: Poppins;
    shadowColor: ${BLACK.dark};
    shadowOffset: 0px 1px;
    shadowOpacity: 0.20;
    shadowRadius: 3px;
`,
  ButtonView: styled.View`
    flexDirection: row;
    justifyContent: space-between;
    bottom: 20px;
    paddingHorizontal: 16px;
    alignItems: center;
    position: absolute;

`,
  crossButtonView: styled.TouchableOpacity`
    backgroundColor: ${WHITE.dark};
    justifyContent: center;
    padding: 8px;
    borderRadius: 25px;
    alignSelf: center;
    height: 51px;
    width: 51px;
    shadowColor: ${BLACK.dark};
    shadowOffset: 0px 1px;
    shadowOpacity: 0.20;
    shadowRadius: 3px;
    marginLeft: 22px;
    elevation: 4;
`,

};

export default FilterStyle;