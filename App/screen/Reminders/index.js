import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {FlatList, View, Text, Image, TouchableOpacity} from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import RemindersStyle from './RemindersStyle';
import {WHITE, BLUE, BLACK} from '../../helper/Color';
import Header from '../../component/Header';

export default class Reminders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemPress: false,
      listData: [
        {weekDay: '1', weekName: 'Sun'},
        {weekDay: '2', weekName: 'Mon'},
        {weekDay: '3', weekName: 'Tue'},
        {weekDay: '4', weekName: 'Wed'},
        {weekDay: '5', weekName: 'Thu'},
        {weekDay: '6', weekName: 'Fri'},
        {weekDay: '7', weekName: 'Sat'},
      ],
      medicinesDataList: [
        {name: 'Aspirin', amount: '3', iconName: 'tablets', time: '9:00 AM'},
        {name: 'Cymbalta', amount: '1', iconName: 'capsules', time: '10:00 AM'},
        {
          name: 'Paracetamol',
          amount: '2',
          iconName: 'capsules',
          time: '12:00 AM',
        },
      ],
    };
  }

  render() {
    return (
      <RemindersStyle.WrapperViewVertical>
        <Header
          leftText={'back'}
          leftType={'text'}
          leftPress={() => this.props.navigation.pop()}
          rightType={'text'}
          HeaderText={"Reminders"}
        />
        <RemindersStyle.TopView>
          <FlatList
            data={this.state.listData}
            horizontal={true}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => this.setState({itemPress: true})}
                style={{
                  marginHorizontal: 10,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    justifyContent: 'center',
                    borderRadius: 20,
                    padding: 10,
                    borderColor: 'gray',
                  }}>
                  <Text style={{textAlign: 'center'}}>{item.weekDay}</Text>
                </View>
                <Text style={{textAlign: 'center', marginTop: 2}}>
                  {item.weekName}
                </Text>
                <Text style={{textAlign: 'center'}}>.</Text>
              </TouchableOpacity>
            )}
          />
        </RemindersStyle.TopView>
        <RemindersStyle.BottomView>
          <FlatList
            data={this.state.medicinesDataList}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('MedicineDescription');
                }}
                style={{
                  backgroundColor: WHITE.dark,
                  marginVertical: 10,
                  justifyContent: 'center',
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    backgroundColor: 'blue',
                    borderRadius: 20,
                  }}>
                  <Text style={{color: '#fff', padding: 6}}>{item.amount}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                  }}>
                  <Icon1 name={item.iconName} size={20} />
                  <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: BLUE.blue,
                      borderTopLeftRadius: 10,
                    }}>
                    <Icon1 name={'arrow-right'} size={20} color={WHITE.dark} />
                  </View>
                </View>
                <Text style={{textAlign: 'center'}}>{item.time}</Text>
              </TouchableOpacity>
            )}
          />
        </RemindersStyle.BottomView>
      </RemindersStyle.WrapperViewVertical>
    );
  }
}
