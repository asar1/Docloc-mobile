
import React, { Component } from 'react';
import FilterStyle from './FilterStyle';
import Icon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text } from 'react-native';
import { SCREEN, isIphoneXorAbove, SCREEN_NAMES } from '../../helper/Constant';
import CustomHeader from "../../component/CustomHeader/index";
import { StyleSheet } from 'react-native'
import { TEXT } from '../../helper/Color';

const initailState = {
    availableToday: false,
    availableNextThreeDays: false,
    availableAnyDay: false,
    availability: false,
    inHospital: false,
    onlineBooking: false,
    fee: "",
    feeUpto: "",
    consultationFee: false,
    gender: ""
}

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestBody: {
                availableToday: false,
                availableNextThreeDays: false,
                availableAnyDay: false,
                availability: false,
                inHospital: false,
                onlineBooking: false,
                fee: "",
                feeUpto: "",
                consultationFee: false,
                gender: ""
            },
            filtersToShow: []
        }
    }

    resetAvailability = () => {
        let prviousState = this.state.requestBody;

        prviousState.availableToday = false;
        prviousState.availableNextThreeDays = false;
        prviousState.availableAnyDay = false;
        prviousState.availability = false;
        prviousState.inHospital = false;
        prviousState.onlineBooking = false;
        prviousState.fee = "";
        prviousState.feeUpto = "",
            prviousState.consultationFee = false,
            prviousState.gender = ""

        this.setState({ requestBody: prviousState, filtersToShow: [] })
    }

    gatherFilters = (requestBodyParams, value = "", valueUpto = "", title = "", section = "") => {
        let previousState = this.state.requestBody;
        let previousSelectedFilters = this.state.filtersToShow;

        console.log(previousSelectedFilters, "previous Selected Filters");
        console.log(section, "section");
        console.log(title, "title");

        let previousIndex = previousSelectedFilters.findIndex(x => x.section === section);

        console.log(previousIndex, "previous index");



        if (previousIndex !== -1) {
            if (title !== previousSelectedFilters[previousIndex].title) {
                previousSelectedFilters.push({
                    title: title,
                    section: section
                })
            }
            console.log("in if");
            previousSelectedFilters.splice(previousIndex, 1);
            console.log(previousSelectedFilters, "setting and removing");

        }
        else {
            previousSelectedFilters.push({
                title: title,
                section: section
            })
        }




        if (requestBodyParams === "availableToday" || requestBodyParams === "availableNextThreeDays" || requestBodyParams === "availableAnyDay") {

            if (previousState[requestBodyParams] === true) {

                previousState[requestBodyParams] = false

            }
            else {
                if (previousState.availableToday === true || previousState.availableNextThreeDays === true || previousState.availableAnyDay === true) {
                    previousState.availableToday = false;
                    previousState.availableNextThreeDays = false;
                    previousState.availableAnyDay = false;
                    previousState.availability = false
                }
                previousState[requestBodyParams] = true
                previousState.availability = true;
            }

        }
        else if (requestBodyParams === "inHospital") {
            previousState.inHospital = !previousState.inHospital
        }
        else if (requestBodyParams === "onlineBooking") {
            previousState.onlineBooking = !previousState.onlineBooking
        }
        else if (requestBodyParams === "gender") {

            if ('gender' in previousState === false) {
                previousState.gender = value;
            }
            else if (value === "") {
                delete previousState.gender;
            }
        }
        else if (requestBodyParams === "fee") {


            if (previousState.fee === value) {
                previousState.fee = ""
            }
            else if (previousState.fee === value || previousState.feeUpto === valueUpto) {
                previousState.fee = ""
                previousState.feeUpto = ""
            }
            else {
                previousState.fee = value
                valueUpto ? previousState.feeUpto = valueUpto : previousState.feeUpto = ""
            }
        }
        else if (requestBodyParams === "consultationFee") {
            previousState.consultationFee = !previousState.consultationFee
        }
        else if (requestBodyParams === "Male" || requestBodyParams === "Female") {
            if (previousState.gender === value) {
                previousState.gender = ""
            }
            else {
                previousState.gender = value
            }
        }

        console.log(previousSelectedFilters, "going to set");

        this.setState({ requestBody: previousState, filtersToShow: previousSelectedFilters })
    }

    componentDidMount() {
        const params = this.props.route.params;

        if (params.availableFilters && params.availableFilters.length > 0) { this.setState({ requestBody: params.requestBody }); }
    }


    render() {
        return (
            <FilterStyle.WrapperViewVertical>
                <View style={{ height: 100, position: 'absolute', top: 25, zIndex: 100 }} >
                    <CustomHeader
                        left="Filter"
                        type="text"
                        leftStyle={styles.leftStyle}
                        right="Clear Filter"
                        rightType="text"
                        onRightPress={this.resetAvailability}
                        rightTextStyle={styles.clearFilter}
                        bgColor={'transparent'}
                    />
                </View>

                {/* <FilterStyle.HeaderView> */}
                <View style={{ height: SCREEN.height / 13.5, width: SCREEN.width }} >
                    <LinearGradient start={{ x: 0, y: 0.56 }} end={{ x: 0, y: 0.2 }} colors={['#989696', '#1C26A3']}>
                        <Text style={{ textAlign: "center", height: 600 }}> </Text>
                    </LinearGradient>
                </View>
                <View>

                </View>
                {/* <FilterStyle.innerView>
                        <FilterStyle.TouchableView>
                            <FilterStyle.filterText>Filter</FilterStyle.filterText>
                        </FilterStyle.TouchableView>
                        <FilterStyle.TouchableView onPress={() => this.props.navigation.goBack()}>
                            <FilterStyle.cancelFilterText> Cancel</FilterStyle.cancelFilterText>
                        </FilterStyle.TouchableView>
                    </FilterStyle.innerView> */}
                {/* </FilterStyle.HeaderView> */}
                <View style={{ marginBottom: 148 }} >
                    <FilterStyle.ScrollView showsVerticalScrollIndicator={false} >
                        <FilterStyle.SortByBoxView>
                            <FilterStyle.sortByText>Sort By</FilterStyle.sortByText>
                            <FilterStyle.rowViewButton onPress={() => {
                                this.gatherFilters("consultationFee", "", "", "Consultation fee", "consultationFee");
                            }} >
                                {this.state.requestBody.consultationFee ? <FilterStyle.circleFilledView></FilterStyle.circleFilledView> : <FilterStyle.circleView></FilterStyle.circleView>}
                                <FilterStyle.CircleText>Consultation Fee</FilterStyle.CircleText>
                            </FilterStyle.rowViewButton>
                        </FilterStyle.SortByBoxView>
                        <FilterStyle.AvailabilityBoxView>
                            <FilterStyle.sortByText>Availability</FilterStyle.sortByText>
                            <FilterStyle.rowViewButton onPress={() => {
                                this.gatherFilters("availableAnyDay", "", "", "Available any day", "availability");
                            }}  >
                                {this.state.requestBody.availableAnyDay ? <FilterStyle.circleFilledView></FilterStyle.circleFilledView> : <FilterStyle.circleView></FilterStyle.circleView>}
                                <FilterStyle.CircleText >Availability Any Day</FilterStyle.CircleText>
                            </FilterStyle.rowViewButton>
                            <FilterStyle.rowViewButton onPress={() => {
                                this.gatherFilters("availableToday", "", "", "Available today", "availability");
                            }} >
                                {this.state.requestBody.availableToday ? <FilterStyle.circleFilledView></FilterStyle.circleFilledView> : <FilterStyle.circleView></FilterStyle.circleView>}
                                <FilterStyle.CircleText>Availability toDay</FilterStyle.CircleText>
                            </FilterStyle.rowViewButton>
                            <FilterStyle.rowViewButton onPress={() => {
                                this.gatherFilters("availableNextThreeDays", "", "", "Availably in next three days", "availability");
                            }}  >
                                {this.state.requestBody.availableNextThreeDays ? <FilterStyle.circleFilledView></FilterStyle.circleFilledView> : <FilterStyle.circleView></FilterStyle.circleView>}
                                <FilterStyle.CircleText>Availability in next three Days</FilterStyle.CircleText>
                            </FilterStyle.rowViewButton>
                        </FilterStyle.AvailabilityBoxView>

                        <FilterStyle.SortByBoxView>
                            <FilterStyle.sortByText>In Hospital</FilterStyle.sortByText>
                            <FilterStyle.rowViewButton onPress={() => {
                                this.gatherFilters("inHospital", "", "", "In hospital", "inHospital");
                            }}  >
                                {this.state.requestBody.inHospital ? <FilterStyle.circleFilledView></FilterStyle.circleFilledView> : <FilterStyle.circleView></FilterStyle.circleView>}
                                <FilterStyle.CircleText>In Hospital</FilterStyle.CircleText>
                            </FilterStyle.rowViewButton>
                        </FilterStyle.SortByBoxView>

                        <FilterStyle.SortByBoxView>
                            <FilterStyle.sortByText>Online Booking</FilterStyle.sortByText>
                            <FilterStyle.rowViewButton onPress={() => {
                                this.gatherFilters("onlineBooking", "", "", "Online booking", "onlineBooking");
                            }}  >
                                {this.state.requestBody.onlineBooking ? <FilterStyle.circleFilledView></FilterStyle.circleFilledView> : <FilterStyle.circleView></FilterStyle.circleView>}
                                <FilterStyle.CircleText>Online Booking</FilterStyle.CircleText>
                            </FilterStyle.rowViewButton>
                        </FilterStyle.SortByBoxView>
                        <FilterStyle.AvailabilityBoxView>
                            <FilterStyle.sortByText>Consultation Fee</FilterStyle.sortByText>
                            <FilterStyle.rowViewButton onPress={() => {
                                this.gatherFilters("fee", 0, 0, "Free", "fee");
                            }}  >
                                {this.state.requestBody.fee === 0 ? <FilterStyle.circleFilledView></FilterStyle.circleFilledView> : <FilterStyle.circleView></FilterStyle.circleView>}
                                <FilterStyle.CircleText>Free</FilterStyle.CircleText>
                            </FilterStyle.rowViewButton>
                            <FilterStyle.rowViewButton onPress={() => {
                                this.gatherFilters("fee", 200, 0, "1-200", "fee");
                            }}  >
                                {this.state.requestBody.fee === 200 && this.state.requestBody.feeUpto === "" ? <FilterStyle.circleFilledView></FilterStyle.circleFilledView> : <FilterStyle.circleView></FilterStyle.circleView>}
                                <FilterStyle.CircleText>1 - 200</FilterStyle.CircleText>
                            </FilterStyle.rowViewButton>
                            <FilterStyle.rowViewButton onPress={() => {
                                this.gatherFilters("fee", 200, 400, "200-400", "fee");
                            }}  >
                                {this.state.requestBody.fee === 200 && this.state.requestBody.feeUpto === 400 ? <FilterStyle.circleFilledView></FilterStyle.circleFilledView> : <FilterStyle.circleView></FilterStyle.circleView>}
                                <FilterStyle.CircleText>200 - 400</FilterStyle.CircleText>
                            </FilterStyle.rowViewButton>
                            <FilterStyle.rowViewButton onPress={() => {
                                this.gatherFilters("fee", 500, 1000, "500-1000", "fee");
                            }}  >
                                {this.state.requestBody.fee === 500 ? <FilterStyle.circleFilledView></FilterStyle.circleFilledView> : <FilterStyle.circleView></FilterStyle.circleView>}
                                <FilterStyle.CircleText>500 - 1000</FilterStyle.CircleText>
                            </FilterStyle.rowViewButton>
                        </FilterStyle.AvailabilityBoxView>

                        <FilterStyle.SortByBoxView>
                            <FilterStyle.sortByText>Gender</FilterStyle.sortByText>
                            <FilterStyle.rowViewButton onPress={() => {
                                this.gatherFilters("Male", "Male", "", "Male", "gender");
                            }}  >
                                {this.state.requestBody.gender === "Male" ? <FilterStyle.circleFilledView></FilterStyle.circleFilledView> : <FilterStyle.circleView></FilterStyle.circleView>}
                                <FilterStyle.CircleText>Male</FilterStyle.CircleText>
                            </FilterStyle.rowViewButton>

                            <FilterStyle.rowViewButton onPress={() => {
                                this.gatherFilters("Female", "Female", "", "Female", "gender");
                            }}  >
                                {this.state.requestBody.gender === "Female" ? <FilterStyle.circleFilledView></FilterStyle.circleFilledView> : <FilterStyle.circleView></FilterStyle.circleView>}
                                <FilterStyle.CircleText>Female</FilterStyle.CircleText>
                            </FilterStyle.rowViewButton>
                        </FilterStyle.SortByBoxView>


                    </FilterStyle.ScrollView>
                </View>
                <FilterStyle.ButtonView>
                    <FilterStyle.SubmitButton onPress={() => {
                        const newParams = this.props.route.params.availableFilters;
                        console.log(this.state.filtersToShow, "new params")
                        this.props.navigation.navigate(SCREEN_NAMES.FilterResult, {
                            filterRequestBodyToSearch: this.state.requestBody,
                            applyFilter: !(JSON.stringify(newParams) === JSON.stringify(this.state.filtersToShow)),
                            filtersToShow: this.state.filtersToShow
                        })
                        // this.props.navigation.goBack()
                    }}>
                        <FilterStyle.CountryCodeText
                            style={{ color: TEXT.primary, elevation: 2 }}>
                            Apply
                        </FilterStyle.CountryCodeText>
                    </FilterStyle.SubmitButton>
                    <FilterStyle.crossButtonView onPress={() => this.props.navigation.goBack()}>
                        <Icon style={{ alignSelf: 'center', color: 'blue' }} name={"cross"} size={35} />
                    </FilterStyle.crossButtonView>
                </FilterStyle.ButtonView>

            </FilterStyle.WrapperViewVertical>
        )
    }
}

const styles = StyleSheet.create({
    clearFilter: {
        fontFamily: 'Poppins',
        color: TEXT.primary,
        fontSize: 12,
        fontWeight: '700'
    },
    leftStyle: {
        fontFamily: 'Poppins-Bold',
        color: TEXT.primary,
        fontSize: 17,
        fontWeight: '700'
    }
})