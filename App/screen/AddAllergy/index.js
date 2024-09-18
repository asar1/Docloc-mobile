import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { BACKGROUND } from '../../helper/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { BASE_URL, SCREEN_NAMES } from "../../helper/Constant";
import Route from '../../Network/route';
import { Picker } from '@react-native-picker/picker';


const route = new Route(BASE_URL);

class AddAllergy extends Component {
    _unsubscribe = null;
    constructor(props) {
        super(props)
        this.state = {
            allergyType: "",
            reaction: "",
            notes: "",
            selected: { item: 'High' },
            category: [{ item: 'High' }, { item: 'Medium' }, { item: 'Low' }],
            error: "",
            _id: ""
        }
    }
    async onValueChange(value) {
        console.log(value)
        this.setState({ selected: { item: value } });
    }

    onChange = (value, item) => {
        this.setState({ [item]: value });
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            console.log("got in focus");
            // this.getAllergies();
            if (this.props.route.params) {
                const item = this.props.route.params.item;
                if (item) {
                    this.setState({
                        allergyType: item.allergyType,
                        reaction: item.reaction,
                        notes: item.Notes,
                        selected: { item: item.serverity },
                        _id: item._id
                    }, () => console.log(this.state, 'this is state after setting'));
                }
            }
        });


    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    onSubmit = () => {
        this.setState({ error: "" })
        if (this.state.allergyType && this.state.notes && this.state.reaction && this.state.selected.item) {
            let body = {
                "allergies": [
                    {
                        "allergyType": this.state.allergyType,
                        "reaction": this.state.reaction,
                        "serverity": this.state.selected.item,
                        "Notes": this.state.notes,
                        _id: this.state._id,
                    }
                ]
            };

            console.log(body, 'body');

            const userId = JSON.parse(this.props.user.userDetail.userDetails).user._id;
            route
                .postAuthenticated('user/addAllergies/' + userId, body, this.props.user.userToken)
                .then((res) => {
                    if (res.status === 0) {
                        Alert.alert("Error", JSON.stringify(res.message));
                    } else {
                        console.log(res, "response is")
                        this.props.navigation.navigate(SCREEN_NAMES.MyAllergies, {
                            id: userId
                        });
                    }
                });
        }
        else {
            this.setState({ error: "Please enter all the fields" })
        }
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: '#f5f5f5' }} showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: BACKGROUND.primary, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, paddingBottom: '37%', }}>
                    <View style={[styles.backArrow, { flexDirection: 'row', marginLeft: 20, marginTop: 30 }]} >
                        <Ionicons onPress={() => {
                            this.props.navigation.goBack();
                        }} name={'arrow-back'} size={25} color={"white"} ></Ionicons>
                        <Text style={{ marginLeft: 15, fontWeight: 'bold', color: 'white', fontSize: 20 }}>  Add Allergy </Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, marginBottom: 10, borderRadius: 20, elevation: 4, backgroundColor: 'white', padding: 20, marginTop: '-30%', height: '85%', justifyContent: 'space-between' }}>
                    <View>
                        <View>
                            <Text style={styles.inputText}>Allergy Type</Text>
                            <TextInput placeholder='Enter allergy type' value={this.state.allergyType} onChangeText={(e) => this.onChange(e, "allergyType")} style={styles.input} />
                        </View>
                        <View>
                            <Text style={styles.inputText}>Reaction</Text>
                            <TextInput placeholder='Enter reaction' value={this.state.reaction} onChangeText={(e) => this.onChange(e, "reaction")} style={styles.input} />
                        </View>
                        <View>

                            <Text style={styles.inputText}>Allergy Severity</Text>
                            <View style={{
                                borderRadius: 10, borderWidth: 1,
                                borderColor: '#ECECEC', paddingLeft: 10, height: 47,
                            }}>
                                <Picker

                                    itemStyle={styles.itemStyle}
                                    mode="dropdown"
                                    // style={styles.pickerStyle}
                                    selectedValue={this.state.selected.item}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    {this.state.category.map((item, index) => (
                                        <Picker.Item
                                            key={item}
                                            color="grey"
                                            label={item.item}
                                            value={item.item}
                                            index={index}

                                        />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.inputText}>Notes</Text>
                            <TextInput multiline={true} numberOfLines={4} value={this.state.notes} onChangeText={(e) => this.onChange(e, "notes")} placeholder='Add reaction details and additional notes here...' style={[styles.input, { textAlignVertical: 'top', paddingTop: 17 }]} />
                        </View>

                        <Text style={styles.error}>{this.state.error}</Text>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => this.onSubmit()}  >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    inputText: {
        color: BACKGROUND.primary,
        fontWeight: 'bold',
        marginLeft: 5,
        marginVertical: 10
    },

    error: {
        textAlign: 'center',
        marginVertical: 10
    },
    input: {
        marginBottom: 7,
        borderRadius: 10,
        paddingLeft: 20,
        // elevation: 0.5,
        borderWidth: 1,
        borderColor: '#ECECEC',
        color: 'gray'
    },
    button: {
        width: "60%",
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: BACKGROUND.primary,
        backgroundColor: BACKGROUND.primary,
        marginBottom: 10

    },
    buttonText: {
        // fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    }
});


function mapStateToProps(state, props) {
    return state;
}

const mapDispatchToProps = dispatch => ({});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(AddAllergy);

