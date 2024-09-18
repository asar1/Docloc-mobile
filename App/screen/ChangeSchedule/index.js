
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { FlatList, View, Text, Image, TouchableOpacity, Switch } from 'react-native';
import ChangeScheduleStyle from './ChangeScheduleStyle';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { BLACK, WHITE, ORANGE, GREEN, BLUE } from '../../helper/Color';


export default class ChangeSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: ['Tablets', 'Capsules', 'Drops', 'Injection'],
            country: 'Once',
            DosageText: 1,
            startTime: 'Today',
            dayTime: 'Every Day',
            durationTime: '1 Month',
            isEnabled: false,
            time: '2 mint'
        }
    }

    render() {
        return (
            <ChangeScheduleStyle.WrapperViewVertical>
                <ChangeScheduleStyle.HeaderView>
                    <Icon1 onPress={() => { this.props.navigation.goBack() }} name={'arrow-left'} size={20} color={'black'} />
                    <ChangeScheduleStyle.DimerolText>
                        Dimedrol
                </ChangeScheduleStyle.DimerolText>
                </ChangeScheduleStyle.HeaderView>
                <ChangeScheduleStyle.ScrollView>
                    <ChangeScheduleStyle.FirstBoxView>
                        <ChangeScheduleStyle.FlatListView>
                            <FlatList
                                data={this.state.listData}
                                horizontal={true}
                                renderItem={({ item }) => (
                                    <ChangeScheduleStyle.RenderFlatListItemView>
                                        <ChangeScheduleStyle.RenderFlatListItemText>
                                            {item}
                                        </ChangeScheduleStyle.RenderFlatListItemText>
                                    </ChangeScheduleStyle.RenderFlatListItemView>
                                )}
                            />
                        </ChangeScheduleStyle.FlatListView>
                        <ChangeScheduleStyle.ReminderTimeRowView>
                            <ChangeScheduleStyle.ReminderTimeText>
                                Reminder Times
                        </ChangeScheduleStyle.ReminderTimeText>
                            <DropDownPicker
                                items={[
                                    { label: 'Once', value: 'Once' },
                                    { label: 'EveryDAy', value: 'EveryDAy' },
                                ]}
                                defaultValue={this.state.country}
                                containerStyle={{ height: 40, width: '40%', alignSelf: 'center', marginRight: 20 }}
                                style={{ backgroundColor: '#fafafa' }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => this.setState({
                                    country: item.value
                                })
                                }
                            />
                        </ChangeScheduleStyle.ReminderTimeRowView>
                        <ChangeScheduleStyle.ReminderTimeRowView2>
                            <ChangeScheduleStyle.ReminderTimeText>
                                Dosage (per day)
                        </ChangeScheduleStyle.ReminderTimeText>
                            <ChangeScheduleStyle.DosageValueSelectView>
                                <ChangeScheduleStyle.DosageValueFirstElementView onPress={() => this.setState({ DosageText: this.state.DosageText - 1 })}>
                                    <ChangeScheduleStyle.DosageValueFirstElementText>
                                        -
                                </ChangeScheduleStyle.DosageValueFirstElementText>
                                </ChangeScheduleStyle.DosageValueFirstElementView>
                                <ChangeScheduleStyle.DosageValueFirstElementText>
                                    {this.state.DosageText}
                                </ChangeScheduleStyle.DosageValueFirstElementText>
                                <ChangeScheduleStyle.DosageValueSecondElementView onPress={() => this.setState({ DosageText: this.state.DosageText + 1 })}>
                                    <ChangeScheduleStyle.DosageValueFirstElementText>
                                        +
                                </ChangeScheduleStyle.DosageValueFirstElementText>
                                </ChangeScheduleStyle.DosageValueSecondElementView>
                            </ChangeScheduleStyle.DosageValueSelectView>
                        </ChangeScheduleStyle.ReminderTimeRowView2>
                        <ChangeScheduleStyle.DosageTimeView>
                            <Icon name={'clockcircleo'} size={20} />
                            <ChangeScheduleStyle.ClockTimeText>
                                8:00 AM
                        </ChangeScheduleStyle.ClockTimeText>
                        </ChangeScheduleStyle.DosageTimeView>
                    </ChangeScheduleStyle.FirstBoxView>
                    <ChangeScheduleStyle.secondBoxView>
                        <ChangeScheduleStyle.SecondBoxRowView>
                            <ChangeScheduleStyle.ReminderTimeText>
                                Start
                        </ChangeScheduleStyle.ReminderTimeText>
                            <DropDownPicker
                                items={[
                                    { label: 'Today', value: 'Today' },
                                    { label: 'Tomorrow', value: 'Tomorrow' },
                                    { label: 'Yesterday', value: 'Yesterday' },
                                ]}
                                defaultValue={this.state.startTime}
                                containerStyle={{ height: 40, width: '40%', alignSelf: 'center', marginRight: 20 }}
                                style={{ backgroundColor: '#fafafa' }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => this.setState({
                                    startTime: item.value
                                })
                                }
                            />
                        </ChangeScheduleStyle.SecondBoxRowView>
                        <ChangeScheduleStyle.SecondBoxRowView>
                            <ChangeScheduleStyle.ReminderTimeText>
                                Days
                        </ChangeScheduleStyle.ReminderTimeText>
                            <DropDownPicker
                                items={[
                                    { label: 'Every Day', value: 'Every Day' },
                                    { label: 'Every Month', value: 'Every Month' },
                                ]}
                                defaultValue={this.state.dayTime}
                                containerStyle={{ height: 40, width: '40%', alignSelf: 'center', marginRight: 20 }}
                                style={{ backgroundColor: '#fafafa' }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => this.setState({
                                    dayTime: item.value
                                })
                                }
                            />
                        </ChangeScheduleStyle.SecondBoxRowView>
                        <ChangeScheduleStyle.SecondBoxRowView>
                            <ChangeScheduleStyle.ReminderTimeText>
                                Duration
                        </ChangeScheduleStyle.ReminderTimeText>
                            <DropDownPicker
                                items={[
                                    { label: '1 Month', value: '1 Month' },
                                    { label: '2 Month', value: '2 Month' },
                                ]}
                                defaultValue={this.state.durationTime}
                                containerStyle={{ height: 40, width: '40%', alignSelf: 'center', marginRight: 20 }}
                                style={{ backgroundColor: '#fafafa' }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => this.setState({
                                    durationTime: item.value
                                })
                                }
                            />
                        </ChangeScheduleStyle.SecondBoxRowView>
                        <ChangeScheduleStyle.SecondBoxRowSwitchView>
                            <ChangeScheduleStyle.SecondBoxRowSwitchText>
                                Alarm
                        </ChangeScheduleStyle.SecondBoxRowSwitchText>
                        <View></View>
                        <View></View>
                        <View></View>
                        <View></View>
                       
                            <Switch
                           
                                trackColor={{ false: "#767577", true: "#ffD037" }}
                                thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#ffD037"
                                onValueChange={() => this.setState({isEnabled: !this.state.isEnabled})}
                                value={this.state.isEnabled}
                            />
                         
                        </ChangeScheduleStyle.SecondBoxRowSwitchView>
                        <ChangeScheduleStyle.SecondBoxRowView>
                            <ChangeScheduleStyle.ReminderTimeText>
                                Snooze
                        </ChangeScheduleStyle.ReminderTimeText>
                            <DropDownPicker
                                items={[
                                    { label: '2 mint', value: '2 mint' },
                                    { label: '1 mint', value: '1 mint' },
                                ]}
                                defaultValue={this.state.time}
                                containerStyle={{ height: 40, width: '40%', alignSelf: 'center', marginRight: 20 }}
                                style={{ backgroundColor: '#fafafa' }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => this.setState({
                                    time: item.value
                                })
                                }
                            />
                        </ChangeScheduleStyle.SecondBoxRowView>
                    </ChangeScheduleStyle.secondBoxView>
                    <ChangeScheduleStyle.SubmitButton onPress={() =>{this.props.navigation.goBack()}}>
                        <ChangeScheduleStyle.CountryCodeText
                            style={{ color: BLACK.dark }}>
                            Add Schedule
                        </ChangeScheduleStyle.CountryCodeText>
                    </ChangeScheduleStyle.SubmitButton>
                </ChangeScheduleStyle.ScrollView>
            </ChangeScheduleStyle.WrapperViewVertical>
        );
    }
}