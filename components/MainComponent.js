import React, { Component } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./dishDetailComponent";
import { DISHES } from "../shared/dishes";
import { View } from "react-native";

class Main extends Component {
  state = { dishes: DISHES, selectedDish: null };
  onSelect = (dishID) => {
    this.setState({ selectedDish: dishID });
  };
  render() {
    return (
      <View>
        <Menu
          dishes={this.state.dishes}
          onPress={(dishId) => this.onSelect(dishId)}
        />
        <DishDetail
          dish={
            this.state.dishes.filter(
              (item) => item.id === this.state.selectedDish
            )[0]
          }
        />
      </View>
    );
  }
}

export default Main;
