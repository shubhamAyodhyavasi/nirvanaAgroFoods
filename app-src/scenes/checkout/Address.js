import React, { Component } from "react";
import { Image, Platform,View, TouchableOpacity, TextInput, Text } from "react-native";
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from "./styles";
import { colors, images } from '../../styles'
import * as Location from 'expo-location';
import {getStateList,getCityList} from "./lib/constant"
import { Colors } from "react-native/Libraries/NewAppScreen";
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      location:'',
      errorMsg:'',
      selectedItems: {},
      cityList:[],
      selectedCity:''
    };
  }
 

  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep()
    };
  };
  getCurrentLocation(){
     if (Platform.OS === 'android' ) {
        this.setState({errorMsg:'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'})
        alert('Oops, this will not work on Sketch in an Android emulator. Try it on your device!')
      } else {
       
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access location was denied')
              this.setState({errorMsg:'Permission to access location was denied'})
          }
    
          let location = await Location.getCurrentPositionAsync({});
          alert(location)
          this.setState({location:location})
        })();
      }
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
  
  render() {
    const { cityList ,selectedCity} = this.state;
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
              this.setState({ selectedItems: item ,cityList:getCityList(item.name)});
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
                style:  styles.selectStyle
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
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