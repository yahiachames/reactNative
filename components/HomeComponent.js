import React, { Component } from "react";
import { View, Text, ScrollView , Animated,Easing } from "react-native";
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
  constructor(props,context){
    super(props)
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount () {
    // this.animate()
}
animate () {
  this.animatedValue.setValue(0)
  Animated.timing(
    this.animatedValue,
    {
      toValue: 8,
      duration: 10000,
      easing: Easing.linear
    }
  ).start(() => this.animate())
}

  render() {
    const xpos1 = this.animatedValue.interpolate({
      inputRange: [0, 1, 3, 5, 8],
      outputRange: [1200, 600, 0, -600, -1200]
  })
  const xpos2 = this.animatedValue.interpolate({
      inputRange: [0, 1.5, 3.5, 5.5, 8],
      outputRange: [1200, 600, 0, -600, -1200]
  })
  const xpos3 = this.animatedValue.interpolate({
      inputRange: [0, 2.5, 4.5, 6.5, 8],
      outputRange: [1200, 600, 0, -600, -1200 ]
  })
  
      return (
        <ScrollView>
          {/* <Animated.View style={{ width: '100%', transform: [{translateY: xpos1}]}}  > */}
            <RenderItem
            item={
              this.props.data.dishes.dishes.filter((dish) => dish.featured)[0]
            }
            isLoading = { this.props.data.dishes.isLoading}
            errMess={this.props.data.dishes.errMess}
          />
          {/* </Animated.View> */}
          {/* <Animated.View style={{ width: '100%',  transform: [{translateY: xpos2}]}}> */}
          <RenderItem
            item={
              this.props.data.promotions.promotions.filter(
                (promo) => promo.featured
              )[0]
            }
            isLoading = { this.props.data.promotions.isLoading}
            errMess={this.props.data.promotions.errMess}
          />
          {/* </Animated.View> */}
          {/* <Animated.View style={{ width: '100%',  transform: [{translateY: xpos3}]}}> */}
          <RenderItem
            item={
              this.props.data.leaders.leaders.filter(
                (leader) => leader.featured
              )[0]
            }
            isLoading = { this.props.data.leaders.isLoading}
            errMess={this.props.data.leaders.errMess}
          />
          {/* </Animated.View> */}
         
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
