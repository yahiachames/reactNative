import React, { Component } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./dishDetailComponent";
import Home from "./HomeComponent";
import ContactUs from "./ContactComponent";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutUs from "./AboutComponent";

const Stack = createStackNavigator();

const SubMain = () => {
  return (
    <Stack.Navigator initialRouteName='Menu'>
      <Stack.Screen name='Menu' component={Menu} />
      <Stack.Screen name='DishDetail' component={DishDetail} />
    </Stack.Navigator>
  );
};

class Main extends Component {
  render() {
    const Drawer = createDrawerNavigator();
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen name='Home' component={Home} />
          <Drawer.Screen name='About Us' component={AboutUs} />
          <Drawer.Screen name='Menu' component={SubMain} />
          <Drawer.Screen name='Contact Us' component={ContactUs} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default Main;
