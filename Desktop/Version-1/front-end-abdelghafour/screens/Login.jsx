import { globalStyles } from "../assets/style/loginForm";
import { View, Text, Button, TextInput,Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { login } from "../api/User";
import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { logged } from "../api/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/style/loginForm";
import TopBar from './components/TopBar';

const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const Login = ({ navigation }) => {
  //******Location*************/
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [signErr, setSignErr] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();



    logged()
      .then((res) => {
        if (typeof res.response == "undefined" ) {
         console.log("1",res)
         navigation.navigate("Alsa");
        } 
        else {
          console.log(res.response.status);
          console.log(res.response.data);
        
        }

       
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const storeData = async (user) => {
    try {
      const jsonUser = JSON.stringify(user);
      await AsyncStorage.setItem("User", jsonUser);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogIn = (values) => {
    let userInfo;
    login(values)
      .then((res) => {
      
        if(typeof(res.response)=='undefined'){
          // console.log("not undefined")
             userInfo = {
            userId: res.data.user._id,
            userToken: res.data.user.token,
          },
           
          storeData(userInfo),
          navigation.navigate("Alsa");

        }
        else{
          console.log(res.response.status)
          setSignErr(res.response.data.error)
        }
       
      })
     

  };
  const [showHide, setShowHide] = useState(true);

  return (
    <>
    <TopBar navigation={navigation}/>
    <View  style={{
      width: "100%",
      height: "100%",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
    }}>

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          handleLogIn(values);
        }}
      >
        {(props) => (
          <View style={styles.formContainer} >
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
              keyboardType="email-address"
              onBlur={props.handleBlur("email")}
            />
            <Text style={styles.inputError}> {props.touched.email && props.errors.email} </Text>
            <View style={[styles.input,{ flexDirection:"row" , justifyContent:'space-between'}]}>
            <TextInput
               style={{
                width:"90%",
               }}
              placeholder="Password"
              onChangeText={props.handleChange("password")}
              value={props.values.password}
              onBlur={props.handleBlur("password")}
              secureTextEntry={showHide}
            />
            <Feather
              name={showHide ? "eye" : "eye-off"}
              size={24}
              color="gray"
              onPress={() => setShowHide(!showHide)}
            />

            </View>
            

            <Text style={styles.inputError} > {props.touched.password && props.errors.password} </Text>
            {
              signErr &&
            <Text style={styles.inputError} > {signErr} </Text>
            }
            
            <Pressable
                android_ripple={{ color: "#fff" }}
                style={styles.actionBtn}
                onPress={props.handleSubmit}
              >
                <Text style={styles.actionBtnTxt}>se connecter</Text>
              </Pressable>

            {/* <Button title="submit" onPress={props.handleSubmit} /> */}

              <View style={styles.line} />
              <Text style={styles.link} onPress={() => navigation.navigate("Register")}>créer un compte</Text>
              <Text style={styles.link} onPress={() => navigation.navigate("SendMail")}  >-mot de passe oublié-</Text>
              {/* <Text style={styles.link} onPress={() => navigation.navigate("Alsa")}>go to home</Text> */}
          </View>
        )}
      </Formik>
      {/* <Button
        title="go to register "
        onPress={() => navigation.navigate("Register")}
      /> */}
    </View>
    </>
  );
};
