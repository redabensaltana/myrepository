import { View, Image, Pressable } from "react-native";
import logo from "../../assets/logo-alsa-blanco.png";
import burger from "../../assets/burger-btn.png";

const TopBar = (props) => {
  return (
    <>
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems:"center",
          paddingHorizontal: 40,
          height: 220,
          backgroundColor: "#75a5cf"
        }}
      >
        <Image source={logo} style={{ width: 125, height: 45 }}></Image>
        <Pressable onPress={() => {props.navigation.toggleDrawer()}}>
          <Image style={{ width: 30, height: 25 }} source={burger}></Image>
        </Pressable>
      </View>
    </>
  );
};

export default TopBar;