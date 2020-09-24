import React, { Component } from "react";
import { Text, FlatList, ScrollView, View } from "react-native";
import { Card, ListItem, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};

const renderLeaderItem = ({ item, index }) => {
  return (
    <ListItem
      key={index}
      title={item.name}
      subtitle={item.description}
      hideChevron={true}
      leftAvatar={{ source: { uri: baseUrl + item.image } }}
    />
  );
};

class SubAboutUs extends Component {
  render() {
    console.log(this.props);
    if (this.props.leaders.leaders !== 0)
      return (
        <ScrollView>
          <Card title={"Our History"}>
            <Text>
              {`  Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, enjoys patronage from the A-list clientele in Hong Kong. Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us. restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.`}
            </Text>
          </Card>

          <Card title={"Corporate Leadership"}>
            <FlatList
              data={this.props.leaders.leaders}
              renderItem={renderLeaderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </Card>
        </ScrollView>
      );
    else return <View />;
  }
}

const AboutUs = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: "#BAE2EE" },
      }}
    >
      <Stack.Screen
        name='About Us'
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
        {(props) => <SubAboutUs {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default connect(mapStateToProps)(AboutUs);
