import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Container, Content} from 'native-base';
import AppHeader from '../../components/header/Header';
import {colors, images} from '../../styles';
import SingleProduct from './SingleProduct';
import Loader from '../../components/Loader';
import {getProduct} from '../../modules/service';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  scrollView: {},
  singleProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
    margin: 6,
    borderWidth: 3,
    borderRadius: 3,
    borderColor: colors.yellow,
    alignItems: 'center',
  },
  imageSection: {
    alignItems: 'center',
    marginLeft: 20,
  },
  proImage: {
    height: 100,
    width: 100,
  },
  detailsSection: {},
  title: {
    fontSize: 20,
    textAlign: 'right',
    marginRight: 10,
  },
  price: {
    fontSize: 15,
    textAlign: 'right',
    marginRight: 10,
  },
});

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 1,
      product: [],
      categoryId: null,
      isLoading: true,
    };
    this._getProduct();
  }

  async _getProduct() {
    const catId = this.props.route.params.categoryId;
    const resProduct = await getProduct(catId);
    if (resProduct) {
      this.setState({
        isLoading: false,
        product: resProduct.products,
      });
    }
  }

  render() {
    const {navigation, route, categoryId} = this.props;
    const {product, isLoading} = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      <Container>
        <AppHeader
          title={route?.params?.categoryTitle || ''}
					navigation={navigation}
					back={true}
        />
        <Content>
          {/* <View style={styles.container}> */}
          {/* <SafeAreaView style={styles.container}> */}
          {/* <ScrollView style={styles.scrollView}> */}
          {product.map((itm, index) => (
            <SingleProduct productData={itm} key={index} />
          ))}
          {/* </ScrollView> */}
          {/* </SafeAreaView> */}
          {/* </View> */}
        </Content>
      </Container>
    );
  }
}

ProductList.propTypes = {
  navigation: PropTypes.object,
};

ProductList.defaultProps = {
  navigation: {},
};

export default ProductList;
