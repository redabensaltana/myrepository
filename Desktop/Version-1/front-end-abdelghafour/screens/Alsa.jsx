import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home";
import {Book} from "./Book";

const Drawer = createDrawerNavigator();

export const Alsa = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition:'right',
        drawerStyle: {
          backgroundColor: 'white',
          width: 350,
        },
        drawerActiveTintColor:"#75a5cf",
        drawerContentStyle:{marginTop:40},
        
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Book" component={Book} />
    </Drawer.Navigator>
  );
};