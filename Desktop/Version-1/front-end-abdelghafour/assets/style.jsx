import { StyleSheet } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

export const globalStyles = ScaledSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },

  iconStyle: {
    width: 30,
    height: 30,
  },
  row: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  navBar: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "tomato" },
    headerTitleAlign: "center",
  },
  navBarHome: {
    headerLeft: null,
    headerTintColor: "white",
    headerStyle: { backgroundColor: "tomato" },
    headerTitleAlign: "center",
  },
  container: {
    marginTop: "2%",
    height: "15%",
    width: "100%",
    alignItems: "center",
  },
  flex: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropDown: {
    borderRadius: 16,
    borderColor: "#709FC7",
    width: "90%",
    // fontFamily: "Montserrat_500Medium",
    borderWidth: 1,
    
  },
  dropDownText: {
    // fontFamily: "Montserrat_500Medium",
    // fontWeight: "bold",
    textTransform: "uppercase",
    color: "#709FC7",
  },
  input: {
    // fontFamily: "Montserrat_500Medium",
    height: "5%",
    width: "90%",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#709FC7",
    fontSize: 19,
  },
  btn: {
    backgroundColor: "#6dd6ff",
    borderRadius: 20,
    height: 40,
    width: 160,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1%",
    shadowColor: "#6dd6ff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    alignSelf: "center",
    height: "5%",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
   
  },
  modalContent: {
    flex: 1,
    
  },
});
