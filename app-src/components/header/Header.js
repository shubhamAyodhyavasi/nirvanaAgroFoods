import React from 'react';
import {DrawerActions} from '@react-navigation/native';
import {
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Badge,
  Text,
} from 'native-base';
import {colors} from '../../styles';
import {connect} from 'react-redux';

const AppHeader = ({
  navigation,
  title,
  back,
  isLocation,
  showLocationFun,
  cart,
}) => {
  return (
    <Header
      androidStatusBarColor={colors.yellowDark}
      style={{
        backgroundColor: colors.yellow,
      }}>
      <Left>
        <Button
          onPress={() => {
            if (back) {
              navigation.goBack();
            } else {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }
          }}
          transparent>
          <Icon name={back ? 'ios-arrow-back' : 'menu'} />
        </Button>
      </Left>
      <Body>
        <Title>{title ? title : ''}</Title>
      </Body>
      <Right>
        {isLocation && (
          <Button
            onPress={() => {
              showLocationFun();
            }}
            transparent>
            <Icon name="navigate" />
          </Button>
        )}
        <Button
          onPress={() => {
            navigation.navigate('Search');
          }}
          transparent>
          <Icon name="ios-search" />
        </Button>

        <Button
          onPress={() => {
            navigation.navigate('Cart');
          }}
          transparent>
          {cart.items?.length > 0 && (
            <Badge style={{position: 'absolute'}}>
              <Text
                style={{
                  fontSize: 10,
                }}>
                {cart.items?.length}
              </Text>
            </Badge>
          )}
          <Icon name="cart" />
        </Button>
      </Right>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(AppHeader);
