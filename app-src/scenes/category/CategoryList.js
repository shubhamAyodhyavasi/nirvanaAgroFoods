import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import {Container, Content} from 'native-base';
import AppHeader from '../../components/header/Header';
import {getCategory} from '../../modules/service';
import {fileBaseUrl} from '../../modules/constant';
import Loader from '../../components/Loader';
import {colors} from '../../styles';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
  },
  scrollView: {
    height: screenHeight - 120,
  },
  categoryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
  },
  singleCategory: {
    textAlign: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 3,
    borderColor: '#ed7d31',
    backgroundColor: colors.white,
    margin: 7,
  },
  categoryImage: {
    width: screenWidth / 2 - 20,
    height: 100,
  },
  title: {
    height: 25,
  },
});

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 1,
      categories: [],
      isLoading: true,
    };
  }
  async componentDidMount() {
    let getCategoryRes = await getCategory();
    if (getCategoryRes) {
      const {order} = this.props;
      
      if(order?.orderData?.orderLocation){
        console.log("order",order?.orderData?.orderLocation.id)
         getCategoryRes = getCategoryRes.all_category && getCategoryRes.all_category.filter((itm) => {
          return itm.locationId == order?.orderData?.orderLocation.id
        })
      }
      this.setState({
        categories: getCategoryRes,
        isLoading: false,
      });
    }
  }
  render() {
    const {navigation} = this.props;
    const {isLoading} = this.props;
    return isLoading ? (
      <Loader />
    ) : (
      <Container>
        {/* <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}> */}
        <AppHeader title="Categories" navigation={this.props.navigation} />
        <Content>
          <View style={styles.categoryWrapper}>
            {this.state.categories.map((itm, index) => (
              <View
                key={index}
                style={styles.singleCategory}
                onStartShouldSetResponder={() => {
                  navigation.navigate('productList', {
                    categoryId: itm.id,
                    categoryTitle: itm.title,
                  });
                }}>
                <Image
                  source={{uri: fileBaseUrl + itm.image}}
                  style={styles.categoryImage}
                />
                <Text style={styles.title}>{itm.title}</Text>
              </View>
            ))}
          </View>
        </Content>
        {/* </ScrollView>
        </SafeAreaView> */}
      </Container>
    );
  }
}

CategoryList.propTypes = {
  navigation: PropTypes.object,
  
};

CategoryList.defaultProps = {
  navigation: {},
};

//export default CategoryList;
const mapStateToProps = (state) => ({
  order:state.order
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
