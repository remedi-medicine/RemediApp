import React from "react";

import 'react-native-gesture-handler';

import AppBottomTab from './AppBottomTab';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import Product from './screens/Product';
import ViewDrugs from './screens/ViewDrugs';
import ViewAddress from './screens/ViewAddress';
import AddAddress from './screens/AddAddress';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"SplashScreen"}>
          <Stack.Screen name="AppBottomTab" component={AppBottomTab}/>
          <Stack.Screen name="SplashScreen" component={SplashScreen}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="Product" component={Product}/>
          <Stack.Screen name="ViewDrugs" component={ViewDrugs}/>
          <Stack.Screen name="ViewAddress" component={ViewAddress}/>
          <Stack.Screen name="AddAddress" component={AddAddress}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}