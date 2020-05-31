import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Picker,
  Dimensions,
} from 'react-native';
//import { WebView } from 'react-native-webview';
import Button from '../../components/Button';
import {connect} from 'react-redux';
import {fileBaseUrl} from '../../modules/constant';
import {colors, images} from '../../styles';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {addToCart} from '../../modules/cart';
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 2,
    backgroundColor: colors.white,
  },
  singleProduct: {
    flexDirection: 'row',
  },
  imageSection: {},
  proImage: {
    height: 100,
    width: screenWidth / 2,
  },
  detailsSection: {
    flexWrap: 'wrap',
    width: screenWidth / 2,
  },
  title: {
    fontSize: 20,
    width: screenWidth / 2 - 10,
    textAlign: 'right',
    marginRight: 10,
  },
  price: {
    fontSize: 25,
    textAlign: 'right',
    marginRight: 10,
    color: colors.yellow,
  },
  addToCartSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
  selectWrapper: {
    width: screenWidth / 3 - 5,
    borderColor: colors.yellow,
    borderWidth: 3,
    borderRightWidth: 0,
  },
  select: {
    height: 33,
  },
  addToCart: {
    width: screenWidth / 3,
    justifyContent: 'center',
  },
  addTocartIcon: {
    fontSize: 20,
  },
  subDetails: {
    paddingLeft: 5,
    // textAlign: "center"
  },
  type: {
    color: colors.green,
    textAlign: 'right',
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#ed7d3185',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: colors.yellow,
    borderRadius: 2,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: '1',
      selectVariation: '',
      modalVisible: false,
    };
  }
  _addToCart = () => {
    const{order}=this.props
   const tax= order.orderData?.orderLocation?.deliveryRAte;
    this.props.addToCart({
      ...this.props.productData,
      qnt: this.state.selectValue,
      tax:tax
    });
    this.setModalVisible(true);
  };
  _changeState(type) {
    const {openModal} = this.state;
    this.setState({openModal: !openModal});
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
    setTimeout(
      function () {
        this.setState({modalVisible: false});
      }.bind(this),
      2000,
    );
  };
  _getUrl(url) {
    return fileBaseUrl + url;
  }
  render() {
    const {selectValue, selectVariation, modalVisible} = this.state;
    const {productData} = this.props;
    let variantList = productData.variations;
    variantList =
      variantList && variantList.length > 0 ? JSON.parse(variantList) : [];
   
    return (
      <View style={styles.wrapper}>
        <View
          style={styles.singleProduct}
          onStartShouldSetResponder={() => this._changeState()}>
          <View style={styles.imageSection}>
            <Image
              source={{uri: this._getUrl(productData.image)}}
              style={styles.proImage}
            />
          </View>
          <View style={styles.detailsSection}>
            <Text style={styles.title}> {productData.title}</Text>
            <Text style={styles.price}>
              {' '}
              ₹ {parseInt(productData.price).toFixed(2)}
            </Text>
            <Text style={styles.type}> {productData.type}</Text>
          </View>
        </View>
        <View>
          {/* <WebView source={{html: productData.detail}} /> */}
          {/* <Text style={styles.subDetails}> {productData.detail}</Text> */}
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.addToCartSection}>
            {variantList && variantList.length >= 1 && (
              <View style={styles.selectWrapper}>
                <Picker
                  selectedValue={selectVariation}
                  style={styles.select}
                  onValueChange={(itemValue) =>
                    this.setState({selectVariation: itemValue})
                  }>
                  {variantList &&
                    variantList.length > 0 &&
                    variantList.map((itm, key) => (
                      <Picker.Item
                        key={key}
                        label={itm.title}
                        value={itm.title}
                      />
                    ))}
                </Picker>
              </View>
            )}
            <View style={styles.selectWrapper}>
              <Picker
                style={styles.select}
                selectedValue={selectValue}
                onValueChange={(itemValue) =>
                  this.setState({selectValue: itemValue})
                }>
                <Picker.Item label="1 " value="1" />
                <Picker.Item label="2 " value="2" />
                <Picker.Item label="3 " value="3" />
                <Picker.Item label="4 " value="4" />
                <Picker.Item label="5 " value="5" />
                <Picker.Item label="6 " value="6" />
              </Picker>
            </View>
            <Button
              onPress={this._addToCart}
              title={
                <>

                  <FontIcon name="cart-plus" style={styles.addTocartIcon} />
                </>
              }
              style={styles.addToCart}
              color={colors.white}
              backgroundColor={colors.yellow}
            />
          </View>
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Successfully added to cart.</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

SingleProduct.propTypes = {
  navigation: PropTypes.object,
};

SingleProduct.defaultProps = {
  navigation: {},
};
const mapStateToProps = (state) => ({
  cart: state.cart,
  order:state.order
});

export default connect(mapStateToProps, {
  addToCart,
})(SingleProduct);

