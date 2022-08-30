// import { View, Button, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { logged } from "../api/User";
import TopBar from './components/TopBarHome';
import {
  View,
  Text,
  ScrollView,
  Button,
  TextInput,
  Pressable,
  Image
} from "react-native";
import styles from "../assets/style/registerForm";


export const GoogleMap = ({ route, navigation }) => {
  const { busStopCordinates, UserCordinates} = route.params;

  // let path = chosenPath;

  // const storeData = async (path) => {
  //   try {
  //     const jsonPath = JSON.stringify(path);
  //     await AsyncStorage.setItem("Path", jsonPath);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const [userLat, setUserLat] = useState(UserCordinates[0]);
  const [userLon, setUserLon] = useState(UserCordinates[1]);
  const [busStopLat, setBusStopLat] = useState(busStopCordinates[0]);
  const [busStopLon, setBusStopLon] = useState(busStopCordinates[1]);
  // console.log(busStopCordinates,UserCordinates)
  // setUserLat(UserCordinates[0])
  // setUserLon(UserCordinates[1])
  // setBusStopLat(busStopCordinates[0])
  // setBusStopLon(busStopCordinates[1])

  useEffect(() => {
    // storeData(path);
    logged()
      .then((res) => {
        if (typeof res.response == "undefined") {
          //  console.log(res.data)
        } else {
          console.log(res.response.status);
          console.log(res.response.data);
          navigation.navigate("Login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      
      <TopBar navigation={navigation} />
    
<View style={{width:"100%",alignItems:"center",marginBottom:10}}>
<Pressable
      android_ripple={{ color: "#fff" }}
      style={{
        backgroundColor: "#6dd6ff",
        borderRadius : 20,
        height:40,
        width:160,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    }}  
      onPress={() => navigation.navigate("BusPath")}>
          <Text style={styles.actionBtnTxt}>Voir le chemin</Text>
        </Pressable>
</View>
     
      <WebView
        // startInLoadingState={true}
        source={{
          uri: `https://www.google.com/maps/dir/${userLat},${userLon}/${busStopLat},${busStopLon}`,
        }}
      />
    </>
  );
};
