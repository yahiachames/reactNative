import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from './LoadingComponent';

const mapStateToProps = (state) => {
  return {
    promotions: state.promotions,
    dishes: state.dishes,
    leaders: state.leaders,
  };
};

const RenderItem = (props) => {
  const item = props.item;
  
if (props.isLoading === true) return <Loading/>
else if (props.errMess) {
  return(
      <View> 
          <Text>{props.errMess}</Text>
      </View>
  ); }
  else return (
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
  componentDidMount() {
    console.log("from component did mount ");
  }
  render() {
    console.log(JSON.stringify(this.props.data) + "from sub home");
  
      return (
        <ScrollView>
          <RenderItem
            item={
              this.props.data.dishes.dishes.filter((dish) => dish.featured)[0]
            }
            isLoading = { this.props.data.dishes.isLoading}
            errMess={this.props.data.dishes.errMess}
          />
          <RenderItem
            item={
              this.props.data.promotions.promotions.filter(
                (promo) => promo.featured
              )[0]
            }
            isLoading = { this.props.data.promotions.isLoading}
            errMess={this.props.data.promotions.errMess}
          />
          <RenderItem
            item={
              this.props.data.leaders.leaders.filter(
                (leader) => leader.featured
              )[0]
            }
            isLoading = { this.props.data.leaders.isLoading}
            errMess={this.props.data.leaders.errMess}
          />
        </ScrollView>
      );
  }
}

class Home extends Component {
  state = {};
  render() {
    console.log("from home component", this.props);
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
                color='#4f6cd2'
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

export default connect(mapStateToProps)(Home);
