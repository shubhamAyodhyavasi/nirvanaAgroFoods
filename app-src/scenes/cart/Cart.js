import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import {colors, images} from '../../styles';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollWRapper: {
    height: 450,
    backgroundColor: colors.gray,
  },
  scrollView: {
    height: 450,
  },
  singleProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageSection: {
    alignItems: 'center',
    marginLeft: 20,
  },
  cartSingleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 15,
  },
  price: {
    fontSize: 15,
  },

  proImage: {
    height: 80,
    width: 80,
  },
  closeBtn: {
    fontSize: 25,
    color: colors.yellow,
    lineHeight: 25,
    textAlign: 'right',
    marginRight: 18,
  },
  cartTotalPriceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 1,
      product: [
        {
          title: 'Item 1',
          details: 'Text 1',
          image: images.frut,
          price: '10.0Rs',
          qty: 2,
          category: 'categoryOne',
          status: 'Stock Available',
          type: 'Veg',
        },
        {
          title: 'Item 2',
          details: 'Text 1',
          image: images.frut,
          price: '10.0Rs',
          qty: 2,
          category: 'categoryOne',
          status: 'Stock Available',
          type: 'Veg',
        },
        {
          title: 'Item 3',
          details: 'Text 1',
          image: images.frut,
          price: '10.0Rs',
          qty: 2,
          category: 'categoryOne',
          status: 'Stock Available',
          type: 'Veg',
        },
        {
          title: 'Item 3',
          details: 'Text 1',
          image: images.frut,
          price: '10.0Rs',
          qty: 2,
          category: 'categoryOne',
          status: 'Stock Available',
          type: 'Veg',
        },
        {
          title: 'Item 3',
          details: 'Text 1',
          image: images.frut,
          price: '10.0Rs',
          qty: 2,
          category: 'categoryOne',
          status: 'Stock Available',
          type: 'Veg',
        },
        {
          title: 'Item 3',
          details: 'Text 1',
          image: images.frut,
          price: '10.0Rs',
          qty: 2,
          category: 'categoryOne',
          status: 'Stock Available',
          type: 'Veg',
        },
      ],
    };
  }

  _singleProductView(item) {
    return (
      <View style={styles.cartSingleWrapper}>
        <View style={styles.cartLeftSection}>
          <Image source={images.frut} style={styles.proImage} />
        </View>
        <View style={styles.cartmiddleSection}>
          <Text style={styles.title}> hello Title Section</Text>
          <Text style={styles.qty}> 3 x 10 = ₹ 30.00 </Text>
        </View>
        <View style={styles.cartRightSection}>
          <FontIcon style={styles.closeBtn} name="times" />
        </View>
      </View>
    );
  }

  render() {
    const {navigation} = this.props;
    const {product} = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.scrollWRapper}>
          <ScrollView style={styles.scrollView}>
            {/* {
                            product.map((itm, index) =>
                                this._singleProductView(itm)

                            )
                        } */}
            {this.props.cart.items.map((itm, index) =>
              this._singleProductView(itm),
            )}
          </ScrollView>
        </SafeAreaView>
        <View style={styles.cartTotalWrapper}>
          <View style={styles.cartTotalPriceSection}>
            <Text>Cart Total :</Text>
            <Text>₹ 30.00 </Text>
          </View>
          <Button
            onPress={() => {
              console.log({
                props: this.props,
              });
              // navigation.navigate('Details', { from: 'Profile' })
            }}
            title="Checkout"
            style={styles.addToCart}
            color={colors.white}
            backgroundColor={colors.yellow}
          />
        </View>
      </View>
    );
  }
}

Cart.propTypes = {
  navigation: PropTypes.object,
};

Cart.defaultProps = {
  navigation: {},
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
