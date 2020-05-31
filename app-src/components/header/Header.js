import React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import { colors } from '../../styles';

const AppHeader = ({ navigation, title, back, isLocation ,showLocationFun}) => {
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
        {
          isLocation && <Button
            onPress={() => {
              showLocationFun();
            }}
            transparent>
            <Icon name="navigate" />
          </Button>
        }
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
          <Icon name="cart" />
        </Button>
      </Right>
    </Header>
  );
};

export default AppHeader;
