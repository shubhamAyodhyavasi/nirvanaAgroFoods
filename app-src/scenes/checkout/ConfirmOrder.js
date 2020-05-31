import React, { Component } from "react";
import {  View,ScrollView ,SafeAreaView} from "react-native";
import { Container, H1, Content, List, Icon, ListItem, Left, Body, Right, Thumbnail, Text ,Button} from 'native-base';
import styles from "./styles";
import { connect } from 'react-redux';
import { colors } from '../../styles'
import { updateOrder } from '../../modules/order'
import {clearCart} from '../../modules/cart'
import { fileBaseUrl } from '../../modules/constant';
import {placeOrder} from '../../modules/service/'
export class ConfirmOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      orderDone:false,
      orderInvoice:null
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

  async _placeOrderFun(){
    const { clearCart,cart ,order } = this.props
    const OderObject={
        userId: 86,
        items: JSON.stringify(cart.items),
        subtotal: cart.subtotal,
        total: cart.total,
        address: order.orderData.orderAddress,
        payment_type: "cod",
        delivery: cart.delivaryTax,
        coupen_type: "flat",
    }
   const OrderStatus = await placeOrder(OderObject)
    if(OrderStatus.action){
       clearCart()
       this.setState({
        orderDone:true,
        orderInvoice:OrderStatus.order
      })
   }
  }
   nextStep = () => {
     this._placeOrderFun()
   
  };

  render() {
    const { cart ,order } = this.props
    const {orderDone , orderInvoice} = this.state
    return (

      <Container style={{ backgroundColor: colors.yellow }}>
          {
              orderDone ? <Content>
              <H1 style={styles.confirmHeading}>Thankyou for your order.</H1>
              <SafeAreaView style={styles.scrollWRapperBig}>
            <ScrollView style={styles.scrollViewBig}>
          <List>
            <ListItem >
              <Body>
                <Text style={styles.whiteColot}>Address</Text>
                <Text style={styles.whiteColot} note>{orderInvoice?.address}</Text>
              </Body>
            </ListItem>
          </List>
          <List>
            {
              orderInvoice.items&& JSON.parse(orderInvoice.items).map((itm, index) =>
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
                <Text note style={styles.whiteColot}>₹ {orderInvoice?.subtotal}</Text>
              </Right>
            </ListItem>
            <ListItem >
              <Left>
                <Text note style={styles.whiteColot}>Discount</Text>
              </Left>
              <Right>
                <Text note style={styles.whiteColot}>₹ 0.00</Text>
              </Right>
            </ListItem>
            <ListItem >
              <Left>
                <Text note style={styles.whiteColot}>Delivery Tax</Text>
              </Left>
              <Right>
                <Text note style={styles.whiteColot}>₹ {orderInvoice?.delivery}</Text>
              </Right>
            </ListItem>
            <ListItem >
              <Left>
                <Text note style={styles.whiteColot}>Total</Text>
              </Left>
              <Right>
                <Text note style={styles.whiteColot}>₹ {orderInvoice?.total}</Text>
              </Right>
            </ListItem>
          </List>
          <View style={[styles.btnContainer]}>
          <Button iconLeft bordered dark
            onPress={this.props.back}
          >
            <Icon name='arrow-back' />
            <Text>Go To Home Page </Text>
          </Button>
         
          
          </View>
        </Content>:
          
        <Content>
        <H1 style={styles.confirmHeading}>Confirm Order</H1>
        <SafeAreaView style={styles.scrollWRapperBig}>
            <ScrollView style={styles.scrollViewBig}>
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
            
            <Text>Place Order</Text>
            <Icon name='arrow-forward' />
          </Button>
          
          </View>
        </Content>
      }
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
  clearCart:clearCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder);

