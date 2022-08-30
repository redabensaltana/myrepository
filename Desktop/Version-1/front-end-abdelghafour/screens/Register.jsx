import React from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  TextInput,
  Pressable,
  Image
} from "react-native";
import { globalStyles } from "../assets/style";
import { Formik } from "formik";
import * as yup from "yup";
import { register } from "../api/User";
import styles from "../assets/style/registerForm";
import TopBar from './components/TopBar';

const registerValidationSchema = yup.object({
  nom: yup.string().required("Nom is required"),

  prenom: yup.string().required("Prénom is required"),

  cin: yup.string().required("Cin is required"),

  adresse: yup.string().required("adresse is required"),

  id: yup.string().required("Id is required"),

  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email adresse is Required"),
  phone: yup.string().required("phone is Required"),

  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),

  confirmPass: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Confirm password is required"),
});

export const Register = ({ navigation }) => {
  return (<>
   <TopBar navigation={navigation}/>
    <View style={styles.formContainer}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.heading}>
          <Text style={styles.headingTxt}>Client</Text>
        </View>
        <Formik
          validationSchema={registerValidationSchema}
          initialValues={{
            nom: "",
            prenom: "",
            cin: "",
            adresse: "",
            id: "",
            email: "",
            phone: "",
            password: "",
            confirmPass: "",
          }}
          onSubmit={(values) => {
            register(values).then((res) => {
              if (typeof res.response == "undefined") {
                navigation.navigate("Login");
              } else {
                console.log(res.response.status);
                console.log(res.response.data);
              }
            });
          }}
        >
          {(props) => (
            <>
              <View style={styles.inputContainer}>
                <View style={{ width: "100%" }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    onChangeText={props.handleChange("nom")}
                    value={props.values.nom}
                    onBlur={props.handleBlur("nom")}
                  />
                  <View style={styles.line} />
                  <Text style={styles.inputError}>
                    {props.touched.nom && props.errors.nom}{" "}
                  </Text>
                </View>

                <View style={{ width: "100%" }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Prénom"
                    onChangeText={props.handleChange("prenom")}
                    value={props.values.prenom}
                    onBlur={props.handleBlur("prenom")}
                  />
                  <View style={styles.line} />
                  <Text style={styles.inputError}>
                    {props.touched.prenom && props.errors.prenom}{" "}
                  </Text>
                </View>
                <View style={{ width: "100%" }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Cin"
                    onChangeText={props.handleChange("cin")}
                    value={props.values.cin}
                    onBlur={props.handleBlur("cin")}
                  />
                  <View style={styles.line} />
                  <Text style={styles.inputError}>
                    {" "}
                    {props.touched.cin && props.errors.cin}{" "}
                  </Text>
                </View>

                <View style={{ width: "100%" }}>
                  <TextInput
                    style={styles.input}
                    placeholder="adresse"
                    onChangeText={props.handleChange("adresse")}
                    value={props.values.adresse}
                    onBlur={props.handleBlur("adresse")}
                  />
                  <View style={styles.line} />
                  <Text style={styles.inputError}>
                    {" "}
                    {props.touched.adresse && props.errors.adresse}{" "}
                  </Text>
                </View>

                <View style={{ width: "100%" }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Id"
                    onChangeText={props.handleChange("id")}
                    value={props.values.id}
                    onBlur={props.handleBlur("id")}
                  />
                  <View style={styles.line} />
                  <Text style={styles.inputError}>
                    {" "}
                    {props.touched.id && props.errors.id}{" "}
                  </Text>
                </View>

                <View style={{ width: "100%" }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Telephone"
                    onChangeText={props.handleChange("phone")}
                    value={props.values.phone}
                    keyboardType="phone-pad"
                    onBlur={props.handleBlur("phone")}
                  />
                  <View style={styles.line} />
                  <Text style={styles.inputError}>
                    {props.touched.email && props.errors.email}{" "}
                  </Text>
                </View>

                <View style={{ width: "100%" }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={props.handleChange("email")}
                    value={props.values.email}
                    keyboardType="email-address"
                    onBlur={props.handleBlur("email")}
                  />
                  <View style={styles.line} />
                  <Text style={styles.inputError}>
                    {" "}
                    {props.touched.email && props.errors.email}{" "}
                  </Text>
                </View>

                <View style={{ width: "100%" }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={props.handleChange("password")}
                    value={props.values.password}
                    onBlur={props.handleBlur("password")}
                    secureTextEntry
                  />
                  <View style={styles.line} />
                  <Text style={styles.inputError}>
                    {" "}
                    {props.touched.password && props.errors.password}{" "}
                  </Text>
                </View>

                <View style={{ width: "100%" }}>
                  <TextInput
                    style={styles.input}
                    placeholder="confirm Password"
                    onChangeText={props.handleChange("confirmPass")}
                    value={props.values.confirmPass}
                    onBlur={props.handleBlur("confirmPass")}
                    secureTextEntry
                  />
                  <View style={styles.line} />
                  <Text style={styles.inputError}>
                    {props.touched.confirmPass && props.errors.confirmPass}{" "}
                  </Text>
                </View>
                {/* <Button title="Regsiter" onPress={props.handleSubmit} /> */}
                <Pressable
                  android_ripple={{ color: "#fff" }}
                  style={styles.actionBtn}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.actionBtnTxt}>S'inscrire</Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
        <Pressable android_ripple={{ color: "#fff" }} style={styles.returnBtn} onPress={() => navigation.goBack()}>
          <Image
            style={{ width: 10, height: 18 }}
            source={require("../assets/left-arrow.png")}
          ></Image>
          <Text style={styles.actionBtnTxt}>Retour</Text>
        </Pressable>
      </ScrollView>
    </View>
    </> );
};
