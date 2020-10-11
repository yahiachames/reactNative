import React, { Component } from "react";
import { Card, Icon } from "react-native-elements";
import { View, Text, ScrollView, FlatList } from "react-native";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

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
 
  markFavorite(dishId) {
    this.props.postFavorite(dishId);
}
  render() {
    const { dishId } = this.props.route.params;
    console.log(this.props)
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DishDetail);
