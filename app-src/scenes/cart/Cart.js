import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Container, Content} from 'native-base';
import AppHeader from '../../components/header/Header';
import {fileBaseUrl} from '../../modules/constant';
import {removeFromCart,clearCart} from "../../modules/cart"
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
  _getUrl(url) {
    return fileBaseUrl + url;
  }
  _singleProductView(item) {
    return (
      <View style={styles.cartSingleWrapper}>
        <View style={styles.cartLeftSection}>
          <Image
            source={{uri: this._getUrl(item.image)}}
            style={styles.proImage}
          />
        </View>
        <View style={styles.cartmiddleSection}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.qty}>
            {' '}
            {item.qnt} x {item.price} = ₹ {item.price * item.qnt}{' '}
          </Text>
        </View>
        <View style={styles.cartRightSection}
         onStartShouldSetResponder={() => {
         this.props.removeFromCart(item)
         // this.props.clearCart(item)
          
        }}
        >
          <FontIcon style={styles.closeBtn}  name="times" />
        </View>
      </View>
    );
  }

  render() {
    const {navigation,cart} = this.props;
    return (
      <Container>
        {/* <View style={styles.container}> */}
        <AppHeader navigation={navigation} title="Cart" />
        <Content>
          <SafeAreaView style={styles.scrollWRapper}>
            <ScrollView style={styles.scrollView}>
              {cart.items && cart.items.map((itm, index) =>
                this._singleProductView(itm),
              )}
            </ScrollView>
          </SafeAreaView>
          <View style={styles.cartTotalWrapper}>
            <View style={styles.cartTotalPriceSection}>
              <Text>Cart Total :</Text>
              <Text>₹ {parseInt(this.props.cart.subtotal).toFixed(2)}</Text>
            </View>
            <Button
              onPress={() => {
                navigation.navigate('Checkout')
              }}
              title="Checkout"
              style={styles.addToCart}
              color={colors.white}
              backgroundColor={colors.yellow}
            />
          </View>
        </Content>
        {/* </View> */}
      </Container>
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
const mapDispatchToProps = {
  removeFromCart:removeFromCart,
  clearCart:clearCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
