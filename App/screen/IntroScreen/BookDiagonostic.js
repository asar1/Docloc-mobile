import React, { Component } from 'react';
import {View, SafeAreaView, Image, Text, TouchableOpacity} from 'react-native';
import { SCREEN } from '../../helper/Constant';
import { WHITE, BLACK, BLUE } from '../../helper/Color';

class BookDiagonostic extends Component{
    constructor() {
        super();
    }

    render(){
        return(
            <SafeAreaView style={{flex: 1, paddingVertical: 40, backgroundColor: WHITE.dark}}>
                <Image
                  style={{height: SCREEN.height / 2, width: SCREEN.width, resizeMode: 'contain', alignSelf: 'center'}}
                  source={require('../../assets/search_doc.png')}
                />
                <Text style={{fontSize: 18, alignSelf: 'center'}}>
                  Book Diagonostic
                </Text>
                <Text style={{fontSize: 12, alignSelf: 'center', color: BLACK.light, textAlign: 'center', marginTop: 5}}>
                    Search and book diagnostic{'\n'} text
                </Text>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <TouchableOpacity
                      style={{alignSelf: 'center', height: 40, width: 120, borderRadius: 20, borderColor: BLUE.border, borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}
                      onPress={() => this.props.navigation.navigate('SignIn')}
                   >
                      <Text style={{ color: BLUE.border, fontSize: 16}}>
                            Next
                      </Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        )
    }
}
export default BookDiagonostic;