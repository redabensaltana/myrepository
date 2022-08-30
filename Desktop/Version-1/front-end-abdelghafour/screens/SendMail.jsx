import { globalStyles } from "../assets/style";
import { View, Text, Button, TextInput, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { mail } from "../api/User";
import TopBar from './components/TopBar';
import styles from "../assets/style/loginForm";

const emailSchema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
});

export const SendMail =({ navigation }) => {
  return (
    <>
     <TopBar navigation={navigation}/>
      <View
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Formik
          validationSchema={emailSchema}
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            mail(values)
              .then((res) => {
                if (typeof res.response == "undefined") {
                  console.log(res.data);
                } else {
                  console.log(res.response.status);
                  console.log(res.response.data);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          {(props) => (
            <View style={[styles.formContainer,{height:300}]}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                keyboardType="email-address"
                onBlur={props.handleBlur("email")}
              />
              <Text style={styles.inputError}>
                {" "}
                {props.touched.email && props.errors.email}{" "}
              </Text>

              <Pressable
                android_ripple={{ color: "#fff" }}
                style={styles.actionBtn}
                onPress={props.handleSubmit}
              >
                <Text style={styles.actionBtnTxt}>se connecter</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
};
