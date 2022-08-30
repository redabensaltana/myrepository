import { View, Image, Pressable, Text } from "react-native";
import logo from "../../assets/logo-alsa-blanco.png";
import info from "../../assets/info-circle.png";
import { useState } from "react";
import { useFonts, Montserrat_500Medium } from "@expo-google-fonts/montserrat";

const TopBar = (props) => {
  const [showHideDropdown, setShowHideDropdown] = useState(false);

  // let [fontsLoaded] = useFonts({
  //   Montserrat_500Medium,
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <>
      <View
        style={{
          marginBottom: 20,
          marginTop: 40,
          flex: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 40,
          height: 180,
        }}
      >
        <Image source={logo} style={{ width: 125, height: 45 }}></Image>
        <View 
          style={{ position: "relative" }}
          >
        <Pressable
          onPress={() => {
            setShowHideDropdown(!showHideDropdown);
          }}
        >
          <Image style={{ width: 30, height: 30 }} source={info}></Image>
        </Pressable>
        {showHideDropdown && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                padding: 10,
                width: 150,
                backgroundColor: "white",
                position: "absolute",
                top: 40,
                right: 0,
                borderRadius: 10,
                zIndex: 999,
                shadowColor: "black",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                
                elevation: 30,
              }}
              >
              <View style={{ justifyContent: "space-between" }}>
                <Text
                 onPress={() => {props.navigation.navigate("Help")}}
                  style={{
                    // fontFamily: "Montserrat_500Medium",
                    marginVertical: 10,
                    fontSize: 16,
                    color:"#3d4147"
                  }}
                >
                  help
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#cccccc",
                  width: "100%",
                }}
                />
              <View>
                <Text
                  style={{
                    // fontFamily: "Montserrat_500Medium",
                    marginVertical: 10,
                    fontSize: 16,
                    color:"#3d4147"
                  }}
                >
                  about
                </Text>
              </View>
            </View>
          )}
          </View>
      </View>
    </>
  );
};

export default TopBar;