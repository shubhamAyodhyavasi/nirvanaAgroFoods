import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {getDaynamicPostData} from '../../modules/service';
import {
  Container,
  Content,
  Button,
  ListItem,
  List,
  H3,
  Icon,
  Card,
  CardItem,
  Text,
  Body,
} from 'native-base';
import AppHeader from '../../components/header/Header';
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  listItmems: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
export default class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
    };
    this.getStatusIcon = this.getStatusIcon.bind(this);
  }
  async componentDidMount() {
    const getCategoryRes = await getDaynamicPostData('getOrders', {userId: 86});
    if (getCategoryRes.orders) {
      this.setState({
        orderList: getCategoryRes.orders,
      });
    }
  }
  getStatusIcon(status) {
    if (status == 'Pending') {
      return 'alarm';
    }
    if (status == 'ON THE WAY') {
      return 'bicycle';
    }
    if (status == 'PREPARING') {
      return 'archive';
    }
    if (status == 'CONFIRMED') {
      return 'md-checkmark';
    }
    if (status == 'DELIVERED') {
      return 'ios-cart';
    }
    if (status == 'PICK') {
      return 'alarm';
    }
    if (status == 'DROP') {
      return 'alarm';
    }

    return 'ios-close';
  }
  render() {
    const {orderList} = this.state;
    return (
      <Container>
        <AppHeader title="Order List" />
        <Content padder>
          {orderList &&
            orderList.map((order, index) => (
              <Card key={index}>
                <CardItem>
                  <List style={{width: screenWidth - 70}}>
                    <ListItem style={styles.listItmems}>
                      <Text style={{fontSize: 16}}>Order #{order.id}</Text>
                      <Button transparent>
                        <Icon name={this.getStatusIcon(order.status)} />
                        <Text>{order.status}</Text>
                      </Button>
                    </ListItem>
                  </List>
                </CardItem>
                <CardItem>
                  <Body>
                    <List style={{width: screenWidth - 70}}>
                      {order.items &&
                        JSON.parse(order.items).map((itm, index) => (
                          <ListItem style={styles.listItmems}>
                            <Text style={{fontSize: 12}}>
                              {itm.title} ({itm.qnt} x {itm.price})
                            </Text>
                            <Text style={{fontSize: 12}}>
                              ₹{parseInt(itm.price * itm.qnt).toFixed(2)}
                            </Text>
                          </ListItem>
                        ))}
                    </List>
                    <List style={{width: screenWidth - 70}}>
                      <ListItem style={styles.listItmems}>
                        <Text>Order Summary</Text>
                      </ListItem>
                      <ListItem style={styles.listItmems}>
                        <Text style={{fontSize: 12}}>Items Total</Text>
                        <Text style={{fontSize: 12}}>
                          ₹ {parseInt(order.subtotal).toFixed(2)}
                        </Text>
                      </ListItem>
                      <ListItem style={styles.listItmems}>
                        <Text style={{fontSize: 12}}>Delivery</Text>
                        <Text style={{fontSize: 12}}>
                          ₹ {parseInt(order.delivery).toFixed(2)}
                        </Text>
                      </ListItem>
                      <ListItem style={styles.listItmems}>
                        <Text style={{fontSize: 12}}>To Pay</Text>
                        <Text style={{fontSize: 12}}>
                          ₹ {parseInt(order.total).toFixed(2)}
                        </Text>
                      </ListItem>
                    </List>
                    <List style={{width: screenWidth - 70}}>
                      <ListItem style={styles.listItmems}>
                        <Text>Address </Text>
                      </ListItem>
                      <ListItem style={styles.listItmems}>
                        <Text style={{fontSize: 12}}>{order.address}</Text>
                      </ListItem>
                    </List>
                    <List style={{width: screenWidth - 70}}>
                      <ListItem style={styles.listItmems}>
                        <Text>Booking at </Text>
                        <Text style={{fontSize: 12}}>{order.created_at}</Text>
                      </ListItem>
                    </List>
                  </Body>
                </CardItem>
              </Card>
            ))}
        </Content>
      </Container>
    );
  }
}
