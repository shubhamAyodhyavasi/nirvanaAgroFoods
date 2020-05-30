import * as React from 'react';
// import { TouchableNativeFeedback } from "react-native"
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  // AsyncStorage,
  Text,
  Button,
} from 'react-native';
// import {Login} from '../scenes';
import Login from '../scenes/login/Login';
import Home from '../scenes/home/Home';
import CategoryList from '../scenes/category'
import ProductList from '../scenes/product'
import Cart from '../scenes/cart'
import Checkout from '../scenes/checkout/Checkout'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Category" component={CategoryList} />
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="Checkout" component={Checkout} />
    </Drawer.Navigator>
  );
};

const Router = () => {
  const [loggedIN, setLoggedIN] = React.useState(false);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      {!loggedIN && (
        <Stack.Screen
          name="Login"
          component={(props) => <Login {...props} onLogin={setLoggedIN} />}
        />
      )}
      {true && <Stack.Screen name="App" component={AppDrawer} />}
      <Drawer.Screen name="productList" component={ProductList} />
      
    </Stack.Navigator>
  );
};
export default Router;
