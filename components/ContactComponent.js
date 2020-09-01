import React from "react";
import { Text } from "react-native";
import { Card } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";

const SubContactUs = () => {
  return (
    <Card title={"Our Address"}>
      <Text> 121, Clear Water Bay Road </Text>
      <Text> Clear Water Bay, Kowloon</Text>
      <Text> HONG KONG</Text>
      <Text> Tel: +852 1234 5678</Text>
      <Text> Fax: +852 8765 4321</Text>
      <Text> Email:confusion@food.net</Text>
    </Card>
  );
};

const ContactUs = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Contact Us' component={SubContactUs} />
    </Stack.Navigator>
  );
};

export default ContactUs;
