import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from 'expo-secure-store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Asset } from "expo-asset";
import * as ImageManipulator from "expo-image-manipulator";
import { baseUrl } from '../shared/baseUrl';

class Login extends Component {

state = {
        username: '',
        password: '',
        remember: false
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }

   
    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
        else { 
             SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));
}
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="Register"
                        clear
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        titleStyle={{
                            color: "white"
                        }}
                        />
                </View>
            </View>
        );
    }

}


class RegisterTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
               this.processImage(capturedImage.uri)
            }
        }

    }
    
 

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
    }
    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri, 
            [
                {resize: {width: 400}}
            ],
            {format: 'png'}
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri });

    }

    render() {
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageUrl}} 
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                        />
                    <Button
                        title="Camera"
                        onPress={this.getImageFromCamera}
                        />
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title="Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
            </View>
            </ScrollView>
        );
    }
}



const SubRegister = (props) => {
    const data = props
    const Stack = createStackNavigator();
    return (<Stack.Navigator
        initialRouteName='Home'
        
      >
        <Stack.Screen
          name='Register'
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
          {(props) => <RegisterTab {...props} data={data} />}
        </Stack.Screen>
      </Stack.Navigator>  );
}





const SubLogin = (props) => {
    const data = props
    const Stack = createStackNavigator();
    return (<Stack.Navigator
        initialRouteName='Home'
        
      >
        <Stack.Screen
          name='Login'
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
          {(props) => <Login {...props} data={data} />}
        </Stack.Screen>
      </Stack.Navigator>  );
}
 




const TabLoginRegister = () => {
    const Tab = createBottomTabNavigator()
    return ( <Tab.Navigator  initialRouteName='Login' tabBarOptions={{activeBackgroundColor:'dodgerblue' , activeTintColor:'white',
    inactiveTintColor:'dodgerblue' , 
    tabStyle:{ borderRadius:20 , alignItems:'center' , justifyContent:'center' } , labelStyle:{fontSize:15}, labelPosition:'beside-icon'}} >
        <Tab.Screen name="Login" component={SubLogin}     options={({ navigation }) => ({
            tabBarIcon: ({focused , color , size}) => (
              <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                color={focused ? 'white' : 'dodgerblue'}
              
              />
            ),
          })}   />
        <Tab.Screen name="Register" component={SubRegister}      options={({ navigation }) => ({
            tabBarIcon: ({focused , color , size}) => (
              <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                color={focused ? 'white' : 'dodgerblue'}
              
              />
            ),
          })} />
      </Tab.Navigator> );
}
 
export default TabLoginRegister;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        margin:10
    },
    formCheckbox: {
     
        backgroundColor: null
    },
    formButton: {
     margin:10
    }
});

