import * as React from 'react';
// import { TouchableNativeFeedback } from "react-native"
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {connect} from 'react-redux';

import {
  // AsyncStorage,
  Text,
  Button,
} from 'react-native';
// import {Login} from '../scenes';
import Login from '../scenes/login/Login';
import Home from '../scenes/home/Home';
import CategoryList from '../scenes/category';
import ProductList from '../scenes/product';
import Cart from '../scenes/cart';
import Checkout from '../scenes/checkout/Checkout';

import DrawerElement from '../components/drawer/Drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerElement {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Category" component={CategoryList} />
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="Checkout" component={Checkout} />
    </Drawer.Navigator>
  );
};

const Router = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      {props.user.id && <Stack.Screen name="App" component={AppDrawer} />}
      {!props.user.id && (
        <Stack.Screen
          name="Login"
          component={(componentProps) => <Login {...componentProps} />}
        />
      )}
      <Drawer.Screen name="productList" component={ProductList} />
    </Stack.Navigator>
  );
};

const _mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(_mapStateToProps)(Router);
