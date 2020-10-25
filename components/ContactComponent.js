import React from "react";
import { Text,Share } from "react-native";
import { Card, Icon,Button } from "react-native-elements";

import { createStackNavigator } from "@react-navigation/stack";
import * as MailComposer from 'expo-mail-composer';
import * as Animatable from 'react-native-animatable';
const SubContactUs = () => {
 const  sendMail = () => {
    MailComposer.composeAsync({
        recipients: ['yahia.chames14@gmail.com'],
        subject: 'Enquiry',
        body: 'To whom it may concern:'
    })}
  return (
    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
    <Card title={"Our Address"}>
      <Text> 121, Clear Water Bay Road </Text>
      <Text> Clear Water Bay, Kowloon</Text>
      <Text> HONG KONG</Text>
      <Text> Tel: +852 1234 5678</Text>
      <Text> Fax: +852 8765 4321</Text>
      <Text> Email:confusion@food.net</Text>
      <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "dodgerblue" , marginTop:20}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={sendMail}
                        />
    </Card>
    </Animatable.View>
  );
};

const ContactUs = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Contact Us'
        component={SubContactUs}
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
      />
    </Stack.Navigator>
  );
};

export default ContactUs;
