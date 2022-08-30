import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { globalStyles } from "../assets/style";
import { Formik } from "formik";
import * as yup from "yup";
import { profile } from "../api/User";
import React, { useState, useEffect } from "react";
import { logged } from "../api/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/style/registerForm";

const registerValidationSchema = yup.object({
  nom: yup.string().required("Nom is required"),

  prenom: yup.string().required("Prénom is required"),

  cin: yup.string().required("Cin is required"),

  adresse: yup.string().required("adresse is required"),

  id: yup.string().required("Id is required"),

  phone: yup.string().required("telephone is required"),

  email: yup
    .string()
    .email("Please enter valid email")
    .required(" Email address is Required"),
});

export const Profile = ({ navigation }) => {
  useEffect(() => {
    logged().then((res) => {
      if (typeof res.response == "undefined") {
        const { user } = res.data;
        setUser(user);
      } else {
        console.log(res.response.status);
        console.log(res.response.data);
        navigation.navigate("Login");
      }
    });
  }, []);

  const [user, setUser] = useState();

  return user ? (
    <View style={styles.formContainer}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Formik
          validationSchema={registerValidationSchema}
          initialValues={{
            nom: user.nom,
            prenom: user.prenom,
            cin: user.cin,
            adresse: user.adresse,
            id: user.id,
            email: user.email,
            phone: user.phone,
          }}
          onSubmit={(values) => {
            profile(values).then((res) => {
              if (typeof res.response == "undefined") {
                console.log(res.data);
                navigation.navigate("Home");
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
                    {" "}
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
                    {" "}
                    {props.touched.phone && props.errors.phone}{" "}
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
                    {props.touched.email && props.errors.email}{" "}
                  </Text>
                </View>

                <Pressable android_ripple={{ color: "#fff" }} style={styles.actionBtn}  onPress={props.handleSubmit} >
             <Text style={styles.actionBtnTxt}>Modifier</Text>
           </Pressable>
                {/* <Button title="Regsiter" onPress={props.handleSubmit} /> */}
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  ) : null;
};
