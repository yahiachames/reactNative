import React, { Component } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, ScrollView  ,StyleSheet , Picker , Switch,Button , Modal,Alert } from "react-native";

import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { Card, Icon } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as Animatable from 'react-native-animatable';

class SubReservation extends Component {
    state = {  guests: 1,
        smoking: false,
        date: "",
        showModal: false,
    isDatePickerVisible : false }
   

    showDataPickerModal= () =>{
        this.setState({isDatePickerVisible:true})
    }
    hideDataPickerModal = () =>{
        this.setState({isDatePickerVisible:false})
    }
    handleConfirm= (date) =>{
        console.log('date has been picked' , date)
       let stringDate = date + ''
     
        this.setState({date : stringDate  }) 
       
       
    }

        handleReservation() {
            console.log(JSON.stringify(this.state));
            Alert.alert(
                'Your Reservation OK ?',
                ` Number of guests : ${this.state.guests}
 smoking : ${this.state.smoking}
 date and time : ${this.state.date}`,
                [
                {text: 'Cancel', onPress: () => {this. resetForm() ;  console.log('Cancel Pressed')}, style: 'cancel'},
                {text: 'OK', onPress: () => { this.presentLocalNotification(this.state.date); this.resetForm();  console.log('its working')}},
                ],
                { cancelable: false }
            )
        }

        toggleModal() {
            this.setState({showModal: !this.state.showModal});
        }

        resetForm() {
            this.setState({
                guests: 1,
                smoking: false,
                date: '',
                showModal: false
            });
        }


        async obtainNotificationPermission() {
            let permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            if (permission.status !== 'granted') {
                permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                if (permission.status !== 'granted') {
                    Alert.alert('Permission not granted to show notifications');
                }
            }
            return permission;
        }


        async presentLocalNotification(date) {
            await this.obtainNotificationPermission();
            Notifications.presentLocalNotificationAsync ({
                title: 'Your Reservation',
                body: 'Reservation for '+ date + ' requested',
                ios: {
                    sound: true
                },
                android: {
                    sound: true,
                    vibrate: true,
                    color: '#512DA8'
                }
            }).catch(e => console.log(e));
        }

    render() { 
        return ( <ScrollView>
            <Animatable.View animation="zoomIn" duration={2000} delay={1000} 
      >

<View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text> 
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}
                >
                      <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text> 
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    trackColor='dodgerblue'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <Icon
          raised
          reverse
          name={"calendar"}
          color='orange'
          type='font-awesome'
          onPress={() => this.showDataPickerModal()
           
          }
          
        />
              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="datetime"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDataPickerModal}
              />
                
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="dodgerblue"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </Modal>
      </Animatable.View>
            
        </ScrollView> );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
})
 
const Reservation = () => {
    const Stack = createStackNavigator();

    return (    <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen
      name='Reservation'
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
      {(props) => <SubReservation {...props} data={props} />}
    </Stack.Screen>
  </Stack.Navigator>);
}
 

 



export default Reservation;