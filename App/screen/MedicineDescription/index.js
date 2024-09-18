
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import MedicineDescriptionStyle from './MedicineDescriptionStyle';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { BLACK, WHITE, ORANGE, GREEN, BLUE } from '../../helper/Color';



export default class MedicineDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <MedicineDescriptionStyle.WrapperViewVertical>
                <MedicineDescriptionStyle.HeaderView>
                    <MedicineDescriptionStyle.BackButtonView>
                        <Icon1 onPress={() => { this.props.navigation.goBack() }} style={{ alignSelf: 'center' }} name={'arrow-left'} size={20} color={'white'} />
                        <Icon2 style={{ alignSelf: 'center' }} name={'infocirlce'} size={20} color={'white'} />
                    </MedicineDescriptionStyle.BackButtonView>
                    <MedicineDescriptionStyle.TabletImage>
                        <Icon1 style={{ alignSelf: 'center' }} name={'tablets'} size={40} color={'white'} />
                        <MedicineDescriptionStyle.medicineText>Aspirin</MedicineDescriptionStyle.medicineText>
                    </MedicineDescriptionStyle.TabletImage>
                </MedicineDescriptionStyle.HeaderView>
                <MedicineDescriptionStyle.BottomView>
                    <MedicineDescriptionStyle.BottomInnerView>
                        <MedicineDescriptionStyle.DosageText>
                            Dosage
                       </MedicineDescriptionStyle.DosageText>
                        <MedicineDescriptionStyle.RowView>
                            <MedicineDescriptionStyle.ThreeTimesText>3 Times: </MedicineDescriptionStyle.ThreeTimesText>
                            <MedicineDescriptionStyle.TimeView>
                                <MedicineDescriptionStyle.TimesText>9 AM</MedicineDescriptionStyle.TimesText>
                            </MedicineDescriptionStyle.TimeView>
                            <MedicineDescriptionStyle.TimeView>
                                <MedicineDescriptionStyle.TimesText>3 AM</MedicineDescriptionStyle.TimesText>
                            </MedicineDescriptionStyle.TimeView>
                            <MedicineDescriptionStyle.TimeView>
                                <MedicineDescriptionStyle.TimesText>9 AM</MedicineDescriptionStyle.TimesText>
                            </MedicineDescriptionStyle.TimeView>
                        </MedicineDescriptionStyle.RowView>
                        <MedicineDescriptionStyle.ProgrammeText>
                            Program
                       </MedicineDescriptionStyle.ProgrammeText>
                        <MedicineDescriptionStyle.WeekText>
                            Total 8 weeks: 6 Weeks left
                       </MedicineDescriptionStyle.WeekText>
                        <MedicineDescriptionStyle.ProgrammeText>
                            Quantity
                       </MedicineDescriptionStyle.ProgrammeText>
                        <MedicineDescriptionStyle.WeekText>
                            Total 168 Tablets: 128 tablets left
                       </MedicineDescriptionStyle.WeekText>
                    </MedicineDescriptionStyle.BottomInnerView>
                    <MedicineDescriptionStyle.SubmitButton onPress={() =>{this.props.navigation.navigate('ChangeSchedule')}}>
                        <MedicineDescriptionStyle.CountryCodeText
                            style={{ color: BLACK.dark }}>
                            Change Schedule
                        </MedicineDescriptionStyle.CountryCodeText>
                    </MedicineDescriptionStyle.SubmitButton>
                </MedicineDescriptionStyle.BottomView>
            </MedicineDescriptionStyle.WrapperViewVertical>
        )
    }

}