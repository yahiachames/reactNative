import React, { Component } from "react";
import { Card } from "react-native-elements";
import { View, Text } from "react-native";
import { DISHES } from "./../shared/dishes";

const RenderDish = (props) => {
  const dish = props.dish;
  if (dish != null)
    return (
      <Card
        featuredTitle={dish.name}
        image={require("./images/uthappizza.png")}
      >
        <Text style={{ margin: 10 }}> {dish.description} </Text>
      </Card>
    );
  else {
    return <View />;
  }
};

class DishDetail extends Component {
  state = { dishes: DISHES };
  render() {
    const { dishID } = this.props.route.params;
    return <RenderDish dish={this.state.dishes[+dishID]} />;
  }
}

export default DishDetail;
