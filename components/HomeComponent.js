import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const RenderItem = (props) => {
  const item = props.item;
  console.log(JSON.stringify(item.name) + "from render item");

  if (item.isLoading) return <View />;
  if (props.errMss) return <View />;
  else
    return (
      <Card
        featuredTitle={JSON.stringify(item.name)}
        featuredSubtitle={JSON.stringify(item.designation)}
        image={{ uri: baseUrl + item.image }}
      >
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
};

class SubHome extends Component {
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          isLoading={this.props.dishes.isLoading}
          erreMess={this.props.dishes.erreMess}
        />
        <RenderItem
          item={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          isLoading={this.props.promotions.isLoading}
          erreMess={this.props.promotions.erreMess}
        />
        <RenderItem
          item={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          isLoading={this.props.leaders.isLoading}
          erreMess={this.props.leaders.erreMess}
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
        <Stack.Screen
          name='Home'
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
          {(props) => <SubHome {...props} data={this.props} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

export default connect(mapStateToProps)(SubHome);
