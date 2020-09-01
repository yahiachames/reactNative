import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { DISHES } from "./../shared/dishes";
import { COMMENTS } from "./../shared/comments";
import { LEADERS } from "./../shared/leaders";
import { PROMOTIONS } from "./../shared/promotions";

const RenderItem = (props) => {
  const item = props.item;

  if (item !== null)
    return (
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={require("./images/uthappizza.png")}
      >
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  else return <View></View>;
};

class SubHome extends Component {
  state = {
    dishes: DISHES,
    comments: COMMENTS,
    leaders: LEADERS,
    promotions: PROMOTIONS,
  };
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.state.dishes.filter((dish) => dish.featured)[0]}
        />
        <RenderItem
          item={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
        <RenderItem
          item={this.state.promotions.filter((promo) => promo.featured)[0]}
        />
      </ScrollView>
    );
  }
}

class Home extends Component {
  state = {};
  render() {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={SubHome} />
      </Stack.Navigator>
    );
  }
}

export default Home;
