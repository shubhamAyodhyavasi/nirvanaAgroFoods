import * as React from 'react';
// import { TouchableNativeFeedback } from "react-native"
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// import {Login} from '../scenes';
import Login from '../scenes/login/Login';
import Home from '../scenes/home/Home';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
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
    </Stack.Navigator>
  );
};
export default Router;
