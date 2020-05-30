import React, { Component } from "react";
import { Image, Platform, View, TouchableOpacity, TextInput, Text } from "react-native";
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from "./styles";
import { colors, images } from '../../styles'
import {getUserAddress} from '../../modules/service';
import { getStateList, getCityList } from "./lib/constant"
import Button from '../../components/Button';
import { Colors } from "react-native/Libraries/NewAppScreen";
import GetLocation from 'react-native-get-location'
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      location: '',
      errorMsg: '',
      selectedItems: {},
      cityList: [],
      selectedCity: '',
      selectedAddress:null,
      savedAddressList:[]
    };
    this.getLocation = this.getLocation.bind(this)
  }
  async componentDidMount() {
    alert("xxxxxx")
    this._getSavedLocation();
   }



  nextStep = () => {
    const { next, saveState } = this.props;
   // Save state for use in other steps
    saveState({ name: "samad" });
   // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }
  getLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }

   async _getSavedLocation() {
    const getaddressRes = await getUserAddress(86);
   // console.log("getaddressRes",{getaddressRes})
    if (getaddressRes) {
      this.setState({
        savedAddressList: getaddressRes.addresses,
      });
    }
  }
  render() {
    
    const { cityList, savedAddressList } = this.state;
    console.log("xxxxxxxx",{savedAddressList})
    return (
      <View style={[styles.container, styles.step1]}>
        <View >
          <Text
            style={styles.currentStepText}
          > Add Your Delivery Address</Text>
        </View>
        <View style={styles.formView}>
          <SearchableDropdown
            multi={false}
            selectedItems={this.state.selectedItems}
            onItemSelect={(item) => {
              this.setState({ selectedItems: item, cityList: getCityList(item.name) });
            }}
            itemStyle={{
              padding: 5,
              marginTop: 1,
              backgroundColor: '#fff',
              borderColor: '#bbb',
            }}
            itemTextStyle={{ color: colors.gray }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={getStateList()}
            defaultIndex={2}
            chip={true}
            resetValue={false}
            textInputProps={
              {
                placeholder: "State",
                underlineColorAndroid: "transparent",
                style: styles.selectStyle
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
          <SearchableDropdown
            multi={false}
            selectedItems={this.state.selectedItems}
            onItemSelect={(item) => {
              this.setState({ selectedCity: item });

            }}
            itemStyle={{
              padding: 5,
              marginTop: 1,
              backgroundColor: '#fff',
              borderColor: '#bbb',
            }}
            itemTextStyle={{ color: colors.gray }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={cityList}
            defaultIndex={2}
            chip={true}
            resetValue={false}
            textInputProps={
              {
                placeholder: "City",
                underlineColorAndroid: "transparent",
                style: styles.selectStyle
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
          
          <Button
            onPress={() => {
              this.getLocation()
            }}
            title="getCurrentLocation"
            style={styles.addToCart}
            color={colors.white}
            backgroundColor={colors.yellow}
          />
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
            <Image
              source={images.arrow}
              style={styles.btnImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Address;