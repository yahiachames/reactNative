import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";

import { DISHES } from "./../shared/dishes";

class Menu extends Component {
  state = { dishes: DISHES };
  static navigationOptions = {
    title: "Menu",
  };

  render() {
    const { navigation } = this.props;
    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          leftAvatar={{ source: require("./images/uthappizza.png") }}
          onPress={() => navigation.navigate("DishDetail", { dishID: item.id })}
        />
      );
    };

    return (
      <FlatList
        data={this.state.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default Menu;
