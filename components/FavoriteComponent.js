import React, { Component } from "react";
import { View, FlatList , Text , Alert } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import Swipeout from 'react-native-swipeout'
import { Tile  } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import {deleteFavorite} from '../redux/ActionCreators'

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites:state.favorites
  };
};
const mapDispatchToProps = (dispatch) => ({
    deleteFavorite : (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {
  static navigationOptions = {
    title: "my Favorites",
  };
  render() {
    console.log(JSON.stringify(this.props) + "from favorits");
    const { navigate } = this.props.navigation;
    const renderMenuItem = ({ item, index }) => {
        const rightButton=[{
            text:'Delete',
            type:'delete',
            onPress : () => {
                return Alert.alert('delete your favorite Dish ?','do you wish to delete the dish ' + item.name + '?',[{
                    text:'Cancel',
                    style:'cancel',
                    onPress : () => console.log(item.name + ' not deleted')
                },
                {
                    text:'OK',
                    
                    onPress:() => this.props.deleteFavorite(item.id)

                }
            ])
            }
        }]
      return (
        <Swipeout right={rightButton} >
            <Tile
          key={index}
          title={item.name}
          caption={item.description}
          featured
          onPress={() => navigate("DishDetail", { dishId: item.id })}
          imageSrc={{ uri: baseUrl + item.image }}
        />
        </Swipeout>
      );
    };

if(this.props.dishes.isLoading) return <Loading/>
else if(this.props.dishes.errMess) return <View>  <Text>  {this.props.dishes.errMess} </Text> </View>

  else   return (
      <FlatList
        data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el == dish.id))}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Favorites);
