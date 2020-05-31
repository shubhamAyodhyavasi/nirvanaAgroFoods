import React, { Component } from "react";
import { Image, View, SafeAreaView, ScrollView } from "react-native";
import { Container, Item, Input, Button,Icon, CheckBox, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import styles from "./styles";
import { connect } from 'react-redux';
import { colors, images } from '../../styles'
import { updateOrder } from '../../modules/order'
import { fileBaseUrl } from '../../modules/constant';
export class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: ""
    };
  }

  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep()
    };
  };
  _getUrl(url) {
    return fileBaseUrl + url;
  }
  nextStep = () => {
    const { next, saveState } = this.props;
    next();
  };

  render() {
   const { cart ,order } = this.props
    return (

      <Container style={{ backgroundColor: colors.yellow }}>

        <Content>
        <SafeAreaView style={styles.scrollWRapper}>
            <ScrollView style={styles.scrollView}>
          <List>
            <ListItem >
              <Body>
                <Text style={styles.whiteColot}>Address</Text>
                <Text style={styles.whiteColot} note>{order.orderData.orderAddress}</Text>
              </Body>
            </ListItem>
          </List>
         
              <List>
                {
                  cart.items && cart.items.map((itm, index) =>
                    <ListItem avatar key={index}>
                      <Left>
                        <Thumbnail source={{ uri: this._getUrl(itm.image) }} />
                      </Left>
                      <Body>
                        <Text style={styles.whiteColot}>{itm.title}</Text>
                        <Text style={styles.whiteColot} note>{itm.qnt} x {itm.price} = ₹ {itm.price * itm.qnt}{' '}</Text>
                      </Body>
                      <Right>
                        <Text style={styles.whiteColot} note>₹ {itm.price * itm.qnt}</Text>
                      </Right>
                    </ListItem>
                  )
                }


              </List>
          </ScrollView>
          </SafeAreaView>
          <List>
            <ListItem >
              <Left>
                <Text note style={styles.whiteColot}>SubTotal</Text>
              </Left>
              <Right>
                <Text note style={styles.whiteColot}>₹ {parseInt(cart.subtotal).toFixed(2)}</Text>
              </Right>
            </ListItem>
            <ListItem >
              <Left>
                <Text note style={styles.whiteColot}>Discount</Text>
              </Left>
              <Right>
                <Text note style={styles.whiteColot}>₹ {parseInt(cart.discount).toFixed(2)}</Text>
              </Right>
            </ListItem>
            <ListItem >
              <Left>
                <Text note style={styles.whiteColot}>Delivery Tax</Text>
              </Left>
              <Right>
                <Text note style={styles.whiteColot}>₹ {parseInt(cart.delivaryTax).toFixed(2)}</Text>
              </Right>
            </ListItem>
            <ListItem >
              <Left>
                <Text note style={styles.whiteColot}>Total</Text>
              </Left>
              <Right>
                <Text note style={styles.whiteColot}>₹ {parseInt(cart.total).toFixed(2)}</Text>
              </Right>
            </ListItem>
          
            {/* <ListItem >
              <Left>
                <Text note style={styles.whiteColot}>Have coupon?</Text>
                <Item fixedLabel>
                  <Input />
                </Item>
              </Left>

              <Right>
                <Button dark><Text> Apply </Text></Button>
              </Right>
            </ListItem> */}
            <ListItem >
              <Left>
                <CheckBox checked={true} />
              </Left>
              <Body>
                <Text style={styles.whiteColot}>COD</Text>
              </Body>
            </ListItem>
            {/* <ListItem >
              <Left>
                <CheckBox checked={false} />
              </Left>
              <Body>
                <Text style={styles.whiteColot}>POD (All UPI payment accepted)</Text>
              </Body>
            </ListItem> */}
          </List>
          <View style={[styles.btnContainer]}>
          <Button iconLeft bordered dark
            onPress={this.props.back}
          >
            <Icon name='arrow-back' />
            <Text>Back </Text>
          </Button>
          <Button iconRight bordered dark style={{marginLeft:10}}
            onPress={this.nextStep} 
          >
            
            <Text>Next</Text>
            <Icon name='arrow-forward' />
          </Button>
            {/* <TouchableOpacity onPress={this.props.back} style={styles.btnStyle}>
              <Image
                source={images.arrow}
                style={[styles.btnImage, styles.backBtn]}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
              <Image
                source={images.arrow}
                style={styles.btnImage}
                resizeMode="cover"
              />
            </TouchableOpacity> */}
          </View>
        </Content>
      </Container>

    );
  }
}


const mapStateToProps = (state) => ({
  cart: state.cart,
  order: state.order,
});
const mapDispatchToProps = {
  updateOrder: updateOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

