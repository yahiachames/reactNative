import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from 'expo-secure-store';

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
                        color="#512DA8"
                        />
                </View>
            </View>
        );
    }

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
 
export default SubLogin;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:'center',
        margin: 20,
    },
    formInput: {
        
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

