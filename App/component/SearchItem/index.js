import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { BACKGROUND } from '../../helper/Color';
import { Text, View } from 'react-native'

import SearchItemStyles from './SearchItemStyles';

const SearchItem = ({ item, onPressContact, index }) => (
  <SearchItemStyles.WrapperView style={item.index === 0 ? { marginTop: 30 } : { marginTop: 15 }} >
    {console.log(item, "...this is item")}
    <SearchItemStyles.ItemTopViewWrapper>
      <SearchItemStyles.ItemTopLeftWrapper>
        <SearchItemStyles.ImageWrapper>
          <SearchItemStyles.DoctorImage source={item?.item?.profileImg != '' ? { uri: item?.item?.profileImg } : require('../../assets/default.jpg')} />
          <SearchItemStyles.AbsolutePerformanceView>
            <SearchItemStyles.PerformanceText>
              {item.item.rating}
            </SearchItemStyles.PerformanceText>
          </SearchItemStyles.AbsolutePerformanceView>
        </SearchItemStyles.ImageWrapper>
        <SearchItemStyles.FeedbackText>
          {item.item.feedbacks} Feedback
        </SearchItemStyles.FeedbackText>
      </SearchItemStyles.ItemTopLeftWrapper>
      <SearchItemStyles.ItemTopRightWrapper>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }} >
          <SearchItemStyles.doctorName>
            {item.item.firstName} {item.item.lastName}
          </SearchItemStyles.doctorName>
          <View style={{ paddingTop: 10 }} >
            {console.log(item?.isSponsored, 'spooinsored')}
            {item?.item.isSponsored && <View style={{ width: 100, height: 30, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, backgroundColor: '#F8F1E0', justifyContent: 'center', alignItems: 'center', opacity: 1, marginRight: -10 }}>
              <Text style={{ color: '#E6B12E', fontFamily: 'Poppins', fontSize: 10 }} >SPONSORED</Text>
            </View>}
          </View>
        </View>
        <SearchItemStyles.BioViewWrapper>
          <SearchItemStyles.BioText>
            {item.item.bio}
            {'\n'}Ophthalmologist{'\n'}{item.item.experience}
          </SearchItemStyles.BioText>
        </SearchItemStyles.BioViewWrapper>
        <SearchItemStyles.LocationWrapper>
          <Icon name={'location-pin'} color={BACKGROUND.primary} size={20} />
          <SearchItemStyles.BioText>
            Location is missing
          </SearchItemStyles.BioText>
        </SearchItemStyles.LocationWrapper>
        <SearchItemStyles.FeesText>
          PKR {item.item.fee} onwards
        </SearchItemStyles.FeesText>
      </SearchItemStyles.ItemTopRightWrapper>
    </SearchItemStyles.ItemTopViewWrapper>
    <SearchItemStyles.ItemBottomWrapper>

      {/* <SearchItemStyles.LocationWrapper>
        {item.item.specialities.map(item =>

          <SearchItemStyles.SpecialtiesView>
            {console.log(item, "this is item")}
            <SearchItemStyles.BioTextSimple>
              {item.speciality}
            </SearchItemStyles.BioTextSimple>
          </SearchItemStyles.SpecialtiesView>

        )}
        <SearchItemStyles.SpecialtiesView>
          <SearchItemStyles.BioTextSimple>
            Anterior Seg…
          </SearchItemStyles.BioTextSimple>
        </SearchItemStyles.SpecialtiesView>
        <SearchItemStyles.SpecialtiesView>
          <SearchItemStyles.BioTextSimple>
            LASIK Eye Sur…
          </SearchItemStyles.BioTextSimple>
        </SearchItemStyles.SpecialtiesView> 
      </SearchItemStyles.LocationWrapper>
       */}
      {/* <Text>
        Sponsered  {item.item.isSponsored.toString()}
      </Text> */}
      {item.item.role === "hospital" && <SearchItemStyles.ContactButton onPress={() => onPressContact()} >
        <SearchItemStyles.ContactButtonText >
          Contact Clinic
        </SearchItemStyles.ContactButtonText>
      </SearchItemStyles.ContactButton>
      }
    </SearchItemStyles.ItemBottomWrapper>
  </SearchItemStyles.WrapperView>
);

export default SearchItem;
