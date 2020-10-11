import React, { Component } from "react";
import { Text, FlatList, ScrollView, View } from "react-native";
import { Card, ListItem, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from './LoadingComponent';

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
    console.log(this.props.data);
    if (this.props.data.leaders.isLoading )
      return (
        <ScrollView>
        <Card title={"Our History"}>
          <Text>
            {`  Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, enjoys patronage from the A-list clientele in Hong Kong. Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us. restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.`}
          </Text>
        </Card>
  
        <Card title={"Corporate Leadership"}>
         <Loading/>
        </Card>
      </ScrollView>
      );
    else if (this.props.data.leaders.errMess) return (<ScrollView>
      <Card title={"Our History"}>
        <Text>
          {`  Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, enjoys patronage from the A-list clientele in Hong Kong. Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us. restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.`}
        </Text>
      </Card>

      <Card title={"Corporate Leadership"}>
        <Text> {this.props.data.leaders.errMess} </Text>
      </Card>
    </ScrollView>);
    else return ( <ScrollView>
      <Card title={"Our History"}>
        <Text>
          {`  Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, enjoys patronage from the A-list clientele in Hong Kong. Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us. restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.`}
        </Text>
      </Card>

      <Card title={"Corporate Leadership"}>
        <FlatList
          data={this.props.data.leaders.leaders}
          renderItem={renderLeaderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </ScrollView>)
  }
}

const AboutUs = (props) => {
  const data = props;
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName='Home'
      
    >
      <Stack.Screen
        name='About Us'
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
        {(props) => <SubAboutUs {...props} data={data} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default connect(mapStateToProps)(AboutUs);
