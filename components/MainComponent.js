import React, { Component, useLayoutEffect, useState } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./dishDetailComponent";
import Home from "./HomeComponent";
import ContactUs from "./ContactComponent";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AboutUs from "./AboutComponent";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  executeAllFetches,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    promotions: state.promotions,
    dishes: state.dishes,
    leaders: state.leaders,
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const Stack = createStackNavigator();
const CustomDrawerContentComponent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView {...props} style={styles.container} edge={["top"]}>
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.drawerImage}
              source={require("./images/logo.png")}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}> Ristorante Con Fusion </Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

const SubMenu = (props) => {
  return (
    <Stack.Navigator initialRouteName='Menu'>
      <Stack.Screen
        name='Menu'
        options={({ navigation }) => ({
          headerLeft: (props) => (
            <Icon
              name='menu'
              size={24}
              color='#145F74'
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      >
        {(props) => <Menu {...props} />}
      </Stack.Screen>
      <Stack.Screen name='DishDetail' component={DishDetail} />
    </Stack.Navigator>
  );
};

class MainNavigator extends Component {
  render() {
    console.log("start rendering");
    const Drawer = createDrawerNavigator();

    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName='Home'
          overlayColor='transparent'
          drawerStyle={{ backgroundColor: "#BAE2EE" }}
          drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
        >
          <Drawer.Screen
            name='Home'
            component={Home}
            options={{
              drawerIcon: () => (
                <Icon name='home' type='font-awesome' color='#145F74' />
              ),
            }}
          />

          <Drawer.Screen
            name='About Us'
            component={AboutUs}
            options={{
              drawerIcon: () => (
                <Icon name='info-circle' type='font-awesome' color='#145F74' />
              ),
            }}
          />

          <Drawer.Screen
            name='Menu'
            component={SubMenu}
            options={{
              drawerIcon: () => (
                <Icon name='list' type='font-awesome' color='#145F74' />
              ),
            }}
          />
          <Drawer.Screen
            name='Contact Us'
            component={ContactUs}
            options={{
              drawerIcon: () => (
                <Icon name='address-card' type='font-awesome' color='#145F74' />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

class Main extends Component {
  state = {};
  componentDidMount() {
    this.props.fetchComments();
    this.props.fetchDishes();
    this.props.fetchLeaders();
    this.props.fetchPromos();
  }
  render() {
    return (
      <SafeAreaProvider>
        <MainNavigator />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#3A7A8D",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
