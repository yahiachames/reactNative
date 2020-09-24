import React, { Component } from "react";
import { Card, Icon } from "react-native-elements";
import { View, Text, ScrollView, FlatList } from "react-native";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
  };
};

const RenderDish = (props) => {
  const dish = props.dish;
  if (dish != null)
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}> {dish.description} </Text>
        <Icon
          raised
          reverse
          name={props.favorite ? "heart" : "heart-o"}
          color='#f50'
          type='font-awesome'
          onPress={() =>
            props.favorite ? console.log("already favorite") : props.onPress()
          }
        />
      </Card>
    );
  else {
    return <View />;
  }
};

const RenderComments = (props) => {
  const comments = props.comments;
  const renderItemComments = ({ item, index }) => {
    return (
      <Card style={{ margin: 10 }} key={index}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating + " Stars"}</Text>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}
        </Text>
      </Card>
    );
  };
  if (!comments) return <View />;
  else
    return (
      <Card>
        <FlatList
          data={comments}
          renderItem={renderItemComments}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    );
};

class DishDetail extends Component {
  state = { favorites: [] };
  markfavorite = (dishID) => {
    this.setState({ favorites: this.state.favorites.concat(dishID) });
  };
  render() {
    const { dishID } = this.props.route.params;
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.state.favorites.some((el) => el === dishID)}
          onPress={() => this.markfavorite(dishID)}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => dishID === comment.dishId
          )}
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(DishDetail);
