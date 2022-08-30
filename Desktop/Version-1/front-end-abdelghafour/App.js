import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, TextInput, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { globalStyles } from "./assets/style";
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { SendMail } from './screens/SendMail';
import { Book } from './screens/Book';
import { GoogleMap } from './screens/GoogleMap';
import BusPath from './screens/BusPath';
import { Alsa } from "./screens/Alsa";
import {Help} from "./screens/Help";
// import axios from 'react-native-axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const instance = axios.create();




const Stack = createStackNavigator();


export default function App() {

  //   async () => {
  //     const user = await AsyncStorage.getItem('User')

  //     if (user) {
  //         const res = JSON.parse(user)
  //         instance.defaults.headers.common['Authorization'] = res.userToken;
  //     }
  // }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

function MyStack() {


  const [log, setlogged] = useState();


  // logged().then(value => {
  //   console.log("hodddddddddddme")
  //   setlogged(value)
  // }).catch(err => {
  //   console.log(err);
  // });

  return (
    // initialRouteName={log ? "Home" : "Login"}
    <Stack.Navigator initialRouteName={log ? "Home" : "Login"}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#75a5cf" },
      }}
    >

      <Stack.Screen
        name="Login"
        component={Login}
        options={globalStyles.container}
      />
      <Stack.Screen
        name="Register"
        component={Register}
      />
      {/* <Stack.Screen
        name="Home"
        component={Home}
        options={

          globalStyles.navBarHome
        }
      /> */}

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={globalStyles.navBar}
      />

      <Stack.Screen
        name="SendMail"
        component={SendMail}
        options={globalStyles.navBar}
      />

      <Stack.Screen
        name="Book"
        component={Book}
        options={globalStyles.navBar}

      />
      <Stack.Screen
        name="GoogleMap"
        component={GoogleMap}
        options={({ navigation }) => ({
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("BusPath")}
              title="bus path"
              color="#ddd"
            />
          ),
        })}
      />

      <Stack.Screen
        name="BusPath"
        component={BusPath}
        options={globalStyles.navBar}
      />
      <Stack.Screen name="Alsa" component={Alsa} />
      <Stack.Screen name="Help" component={Help} />

    </Stack.Navigator>
  );
}