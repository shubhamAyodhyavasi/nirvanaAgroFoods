import React, {Component} from 'react';
import {Image, View, TouchableOpacity, Modal} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from './styles';
import {updateOrder} from '../../modules/order';
import {connect} from 'react-redux';
import {colors, images} from '../../styles';
import {getUserAddress, saveAddress} from '../../modules/service';
import {getStateList, getCityList} from './lib/constant';
import {
  Input,
  Item,
  Textarea,
  ListItem,
  Text,
  Left,
  Body,
  Radio,
  Footer,
  FooterTab,
  Container,
  Content,
  Button as NativeBaseButton,
} from 'native-base';
import Button from '../../components/Button';
import GetLocation from 'react-native-get-location';
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: '',
      currentStep: '',
      location: '',
      errorMsg: '',
      selectedCountry: {},
      cityList: [],
      selectedCity: '',
      selectedAddress: null,
      savedAddressList: [],
      activeIndexNo: null,
      addAddrssModal: false,
      zipCode: '',
      fullAddress: '',
      formError: false,
      isLoading: true,
      addressRequiredMessage: false,
    };
    this.getLocation = this.getLocation.bind(this);
    this.saveAddress = this.saveAddress.bind(this);
  }
  async componentDidMount() {
    this._getSavedLocation();
  }

  nextStep = () => {
    const {next, updateOrder, order} = this.props;
    if (this.state.selectedAddress) {
      updateOrder({
        ...order.orderData,
        orderAddress: this.state.selectedAddress.address,
      });
      next();
    } else {
      this.setState({
        addressRequiredMessage: true,
      });
    }
  };

  goBack() {
    const {back} = this.props;
    // Go to previous step
    back();
  }
  getLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log(location);
      })
      .catch((error) => {
        const {code, message} = error;
      });
  }

  async _getSavedLocation() {
    const getaddressRes = await getUserAddress(86);
    if (getaddressRes) {
      this.setState({
        savedAddressList: getaddressRes.addresses,
      });
    }
  }

  async saveAddress() {
    const {selectedCountry, selectedCity, fullAddress, zipCode} = this.state;
    if (selectedCity && fullAddress && zipCode) {
      this.setState({
        formError: false,
      });
      const formData = {
        address:
          fullAddress +
          ' , ' +
          selectedCity.name +
          ' , ' +
          selectedCountry.name +
          ' , ' +
          zipCode,
        userId: 86,
      };

      const res = await saveAddress(formData);
      if (res) {
        this.setState({
          savedAddressList: res.addresses,
          addAddrssModal: false,
        });
      }
    } else {
      this.setState({
        formError: true,
      });
    }
  }
  render() {
    const {
      cityList,
      formError,
      addressRequiredMessage,
      addAddrssModal,
      selectedCountry,
      savedAddressList,
      activeIndexNo,
    } = this.state;
    return (
      <Container>
        <Content
          contentContainerStyle={{
            minHeight: '100%',
          }}
          style={{
            backgroundColor: colors.yellow,
          }}>
          <View style={[styles.container, styles.step1]}>
            <View>
              <Text style={styles.currentStepText}>
                {' '}
                Add Your Delivery Address
              </Text>
              {addressRequiredMessage && (
                <Text style={{color: 'red', textAlign: 'center'}}>
                  {' '}
                  Please select address.{' '}
                </Text>
              )}
            </View>
            <View style={styles.formView}>
              {savedAddressList.map((ads, index) => (
                <ListItem
                  key={index}
                  icon
                  style={styles.list}
                  onStartShouldSetResponder={() => {
                    this.setState({
                      activeIndexNo: index,
                      selectedAddress: ads,
                      addressRequiredMessage: false,
                    });
                  }}>
                  <Left>
                    <Radio
                      color={'#f0ad4e'}
                      selectedColor={'#5cb85c'}
                      selected={activeIndexNo == index ? true : false}
                    />
                  </Left>
                  <Body>
                    <Text style={styles.listText}>{ads.address}</Text>
                  </Body>
                </ListItem>
              ))}
            </View>
            <View style={styles.addAddressButton}>
              <Button
                title="Add New Address"
                color={colors.yellow}
                onPress={() => {
                  this.setState({
                    addAddrssModal: true,
                  });
                }}
                backgroundColor={colors.white}
              />
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={addAddrssModal}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalHeading}>
                    Please Add Your Location
                  </Text>
                  {formError && (
                    <Text style={styles.errorMessage}>
                      All address field are required
                    </Text>
                  )}
                  <Textarea
                    rowSpan={3}
                    style={styles.selectStyle}
                    onChangeText={(e) => {
                      this.setState({fullAddress: e});
                    }}
                    placeholder="Address"
                  />
                  <SearchableDropdown
                    multi={false}
                    selectedItems={selectedCountry}
                    onItemSelect={(item) => {
                      this.setState({
                        selectedCountry: item,
                        cityList: getCityList(item.name),
                      });
                    }}
                    itemStyle={{
                      padding: 5,
                      marginTop: 1,
                      backgroundColor: '#fff',
                      borderColor: '#bbb',
                    }}
                    itemTextStyle={{color: colors.gray}}
                    itemsContainerStyle={{maxHeight: 140}}
                    items={getStateList()}
                    defaultIndex={2}
                    chip={true}
                    resetValue={false}
                    textInputProps={{
                      placeholder: 'State',
                      underlineColorAndroid: 'transparent',
                      style: styles.selectStyle,
                    }}
                    listProps={{
                      nestedScrollEnabled: true,
                    }}
                  />
                  <SearchableDropdown
                    multi={false}
                    selectedItems={this.state.selectedItems}
                    onItemSelect={(item) => {
                      this.setState({selectedCity: item});
                    }}
                    itemStyle={{
                      padding: 5,
                      marginTop: 1,
                      backgroundColor: '#fff',
                      borderColor: '#bbb',
                    }}
                    itemTextStyle={{color: colors.gray}}
                    itemsContainerStyle={{maxHeight: 140}}
                    items={cityList}
                    defaultIndex={2}
                    chip={true}
                    resetValue={false}
                    textInputProps={{
                      placeholder: 'City',
                      underlineColorAndroid: 'transparent',
                      style: styles.selectStyle,
                    }}
                    listProps={{
                      nestedScrollEnabled: true,
                    }}
                  />
                  <Item inlineLabel>
                    <Input
                      style={styles.selectStyle}
                      onChangeText={(e) => {
                        this.setState({zipCode: e});
                      }}
                      placeholder="zip code"
                    />
                  </Item>
                  <View style={styles.buttonGroup}>
                    <Button
                      onPress={() => {
                        this.saveAddress();
                      }}
                      title="Save Address"
                      style={styles.currentLocationButton}
                      color={colors.white}
                      backgroundColor={colors.yellow}
                    />
                    <Button
                      onPress={() => {
                        this.setState({addAddrssModal: false});
                      }}
                      title="Back"
                      style={styles.currentBackButton}
                      color={colors.yellow}
                      backgroundColor={colors.white}
                    />
                  </View>

                  {/* <Button
                onPress={() => {
                  this.getLocation()
                }}
                title="Get Current Location"
                style={styles.currentLocationButton}
                color={colors.white}
                backgroundColor={colors.yellow}
              /> */}
                </View>
              </View>
            </Modal>
            {/* <View style={styles.btnContainer}>
              <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
                <Image
                  source={images.arrow}
                  style={styles.btnImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View> */}
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <NativeBaseButton
              style={[
                styles.footerButton,
                {
                  opacity: this.state.selectedAddress ? 1 : 0.6,
                },
              ]}
              onPress={this.nextStep}
              disabled={!this.state.selectedAddress}
              full>
              <Text
                style={{
                  color: colors.white,
                  fontSize: 14,
                }}>
                Continue
              </Text>
            </NativeBaseButton>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  order: state.order,
});
const mapDispatchToProps = {
  updateOrder: updateOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);
