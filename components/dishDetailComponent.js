import React from "react";
import { Card } from "react-native-elements";
import { View, Text } from "react-native";

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

const DishDetail = (props) => {
  console.log(props);
  return <RenderDish dish={props.dish} />;
};

export default DishDetail;
