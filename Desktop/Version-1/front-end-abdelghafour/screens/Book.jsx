import { globalStyles } from "../assets/style";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { RadioButton } from "react-native-paper";
import { logged } from "../api/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { MaterialIcons } from "@expo/vector-icons";
import { getBusStops, nearBusStop } from "../api/BusStop";
import { getBusRoutes } from "../api/BusLine";
import { secondBus } from "../api/BusLine";
import { Wrap } from "@react-native-material/core";
import TopBar from './components/TopBarHome';


export const Book = ({ navigation }) => {
  let departureZoneValue = [];
  let departureZoneItem = [];
  let arrivalZoneValue = [];
  let arrivalZoneItem = [];
  let oneWayArray = [];
  let multipleArray = [];
  let secondBusArray = [];

  const departureItem = [{ label: "hay el houda", value: "hay el houda" }];

  const arrivalItem = [{ label: "hay el houda", value: "hay el houda" }];

  const [openDeparture, setOpenDeparture] = useState(false);
  const [departure, setDeparture] = useState(null);
  // const [loadingDeparture, setLoadingDeparture] = useState(false);
  const [departureItems, setDepartureItems] = useState(departureItem);
  const [choices, setChoices] = useState(null);
  const [openArrival, setOpenArrival] = useState(false);
  const [arrival, setArrival] = useState(null);
  // const [loadingArrival, setLLoadingArrival] = useState(false);
  const [arrivalItems, setArrivalItems] = useState(arrivalItem);

  const [checkedOneBus, setCheckedOneBus] = useState(null);
  const [checkedFirstBus, setCheckedFirstBus] = useState(null);
  const [checkedSecondBus, setCheckedSecondBus] = useState(null);

  // const [chosenPath, setChosenPath] = useState();
  const [multipleWay, setMultipleWay] = useState();
  const [initArrival, setInitArrival] = useState();
  const [initDeparture, setInitDeparture] = useState();
  const [secondBusInfo, setSecondBusInfo] = useState(null);

  // let fontsLoaded = null;
  // fontsLoaded = useFonts({
  //   Montserrat_500Medium,
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  useEffect(() => {
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

    getBusStops().then((res) => {
      if (typeof res.response == "undefined") {
        departureZoneValue.push(res.data.UserLocation);
        departureZoneItem.push({
          key: 0,
          label: `current location - ` + res.data.UserLocation,
          value: res.data.UserLocation,
          icon: () => (
            <Image
              source={require("./../assets/LocationIcon.png")}
              style={{
                width: 30,
                height: 30,
              }}
            />
          ),
        });

        res.data.busStops.forEach((el, index) => {
          if (res.data.UserLocation != el.zone) {
            departureZoneValue.push(el.zone);
            departureZoneItem.push({
              key: index + 1,
              label: el.zone,
              value: el.zone,
            });
            arrivalZoneValue.push(el.zone);
            arrivalZoneItem.push({
              key: index + 1,
              label: el.zone,
              value: el.zone,
            });
          }
        });

        setDeparture(departureZoneValue);
        setDepartureItems(departureZoneItem);
        setArrival(arrivalZoneValue);
        setArrivalItems(arrivalZoneItem);
        setInitDeparture(departureZoneItem);
        setInitArrival(arrivalZoneItem);

        // console.log("arrivalZoneItem",arrivalZoneItem)
      } else {
        console.log(res.response.status);
        console.log(res.response.data);
        // navigation.navigate("Login");
      }
    });
  }, []);

  function SelectedDepartureItem(value) {
    if (initArrival) {
      setArrivalItems(
        initArrival.filter((item) => {
          return item.key != value.key;
        })
      );
    }
  }

  function SelectedArrivalItem(value) {
    if (initDeparture) {
      setDepartureItems(
        initDeparture.filter((item) => {
          return item.key != value.key;
        })
      );
    }
  }

  function data() {
    setSecondBusInfo(null);
    setChoices(null);
    setCheckedOneBus(null);
    setCheckedFirstBus(null);
    setCheckedSecondBus(null);

    getBusRoutes(departure, arrival)
      .then((getBus) => {
        // console.log(getBus.data)
        if (typeof getBus.response == "undefined") {
          getBus.data.pathInfo.map((el, index) => {
            oneWayArray.push({
              time: el.time,
              distance: el.distance,
              path: el.path,
              busNumber: el.busNumber,
            });
          });

          if (
            getBus.data.multipleWay.arrival.length &&
            getBus.data.multipleWay.departure.length
          ) {
            setMultipleWay(getBus.data.multipleWay.arrival);
            getBus.data.multipleWay.departure.map((el) => {
              multipleArray.push({
                busNumber: el.busNumber,
                pathId: el.pathId,
                idOfPathId: el.idOfPathId,
              });
            });
          }
          let choice = {
            oneWayArray,
            multipleArray,
          };
          setChoices(choice);
        } else {
          console.log(getBus.response.status);
          console.log(getBus.response.data);
          // navigation.navigate("Login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function navigateToGoogle(checked) {
    nearBusStop(checked).then((res) => {
      if (typeof res.response == "undefined") {
        navigation.navigate("GoogleMap", {
          UserCordinates: res.data.UserCordinates,
          busStopCordinates: res.data.busStopCordinates,
          // chosenPath: chosenPath,
        });
      } else {
        console.log(res.response.status);
        console.log(res.response.data);
        // navigation.navigate("Login");
      }
    });
  }

  function getsecondBus(choice, multipleArray) {
    secondBus(choice, multipleArray).then((res) => {
      if (typeof res.response == "undefined") {
        setSecondBusInfo(res.data);
      } else {
        console.log(res.response.status);
        console.log(res.response.data);
      }
    });
  }

  async function saveSecondBusinfo(filtredData) {
    try {
      const jsonFilterdData = JSON.stringify(filtredData);
      await AsyncStorage.setItem("filterdData", jsonFilterdData);
      await AsyncStorage.setItem("Path", "undefined");
    } catch (err) {
      console.log(err);
    }
  }

  async function saveOneWayPath(path) {
    try {
      const jsonPath = JSON.stringify(path);
      await AsyncStorage.setItem("Path", jsonPath);
      await AsyncStorage.setItem("filterdData", "undefined");
    } catch (err) {
      console.log(err);
    }
  }

  function navigateToGoogleTowBuses(checked) {
    nearBusStop(checked).then((res) => {
      if (typeof res.response == "undefined") {
        navigation.navigate("GoogleMap", {
          UserCordinates: res.data.UserCordinates,
          busStopCordinates: res.data.busStopCordinates,
        });
      } else {
        console.log(res.response.status);
        console.log(res.response.data);
      }
    });
  }

  return (
    <>
     <TopBar navigation={navigation} />
    <View
      style={{
        height: "100%",
        width:'100%',
        alignItems:"center",
        // marginTop: "10%",
      }}
    >
      <View style={globalStyles.container}>
        <View style={globalStyles.flex}>
          <DropDownPicker
            style={globalStyles.input}
            dropDownContainerStyle={globalStyles.dropDown}
            searchTextInputStyle={globalStyles.dropDown}
            searchPlaceholder="hay el houda"
            ArrowUpIconComponent={() => (
              <Image
                source={require("./../assets/dropDownIcon.png")}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            )}
            ArrowDownIconComponent={() => (
              <Image
                source={require("./../assets/dropDownIcon.png")}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            )}
            placeholderStyle={globalStyles.dropDownText}
            selectedItemLabelStyle={globalStyles.dropDownText}
            listItemLabelStyle={
              {
                // textTransform: "uppercase",
                // fontFamily: "Montserrat_500Medium",
              }
            }
            placeholder="Départ"
            zIndex={3000}
            zIndexInverse={1000}
            open={openDeparture}
            value={departure}
            items={departureItems}
            setOpen={setOpenDeparture}
            setValue={setDeparture}
            setItems={setDepartureItems}
            onSelectItem={(value) => {
              SelectedDepartureItem(value);
            }}
            autoScroll={true}
            searchable={true}
            closeOnBackPressed={true}
          />
          <DropDownPicker
            style={globalStyles.input}
            dropDownContainerStyle={globalStyles.dropDown}
            searchTextInputStyle={globalStyles.dropDown}
            searchPlaceholder="hay el houda"
            ArrowUpIconComponent={() => (
              <Image
                source={require("./../assets/dropDownIcon.png")}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            )}
            ArrowDownIconComponent={() => (
              <Image
                source={require("./../assets/dropDownIcon.png")}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            )}
            placeholderStyle={globalStyles.dropDownText}
            selectedItemLabelStyle={globalStyles.dropDownText}
            listItemLabelStyle={
              {
                // textTransform: "uppercase",
                // fontFamily: "Montserrat_500Medium",
              }
            }
            zIndex={2000}
            zIndexInverse={2000}
            open={openArrival}
            placeholder="Arrive"
            value={arrival}
            items={arrivalItems}
            setOpen={setOpenArrival}
            setValue={setArrival}
            setItems={setArrivalItems}
            onSelectItem={(value) => {
              SelectedArrivalItem(value);
            }}
            autoScroll={true}
            searchable={true}
            closeOnBackPressed={true}
          />
          <Pressable
            style={globalStyles.btn}
            android_ripple={{ color: "#fff" }}
          >
            <Text
              style={{
                // fontFamily: "Montserrat_500Medium",
                fontSize: 18,
                color: "#fff",
              }}
              onPress={() => data()}
            >
              chercher
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          // backgroundColor: "#8a2be2",
          height: "65%",
          width: "90%",
        }}
      >
        {choices ? (
          <View
            style={{
              // backgroundColor: "#8a2be2",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              //blueviolet
            }}
          >
            <View
              style={{
                // backgroundColor: "red",
                flexDirection: "column",
                flexWrap:"wrap",
                borderWidth: 1,
                borderRadius: 16,
                borderColor: "#75A5CF",
                height: "40%",
                width: "100%",
                padding: "2%",
                
                
              }}
            >
              {choices.oneWayArray.map((choice, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flex:1,
                      flexDirection: "row",
                      alignItems: "baseline",
                    }}
                  >
                    <RadioButton
                      value={choice.busNumber}
                      label={choice.busNumber}
                      status={
                        checkedOneBus === choice.busNumber
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => {
                        setCheckedOneBus(choice.busNumber);
                        setCheckedSecondBus(false);
                        setCheckedFirstBus(false);
                        saveOneWayPath(choice.path);
                      }}
                    />
              
                   <View   style={{
                        flexDirection: "row",
                        width: "90%",
                        justifyContent: "space-between",
                      }}>    

                    <View
                      style={{
                        flexDirection: "row",
                        width: "20%",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Image
                        source={require("./../assets/bus.png")}
                        style={{
                          width: 25,
                          height: 25,
                        }}
                      />
                      <Text
                        style={{
                          // fontFamily: "Montserrat_500Medium",
                          textAlignVertical: "center",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {choice.busNumber}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "30%",
                        justifyContent: "space-evenly",
                        
                      }}
                    >
                      <Image
                        source={require("./../assets/completeTime.png")}
                        style={{
                          width: 25,
                          height: 25,
                        }}
                      />
                      <Text
                        style={{
                          // fontFamily: "Montserrat_500Medium",
                          textAlignVertical: "center",
                          textAlign: "center",
                          fontWeight: "bold",
                          
                        }}
                      >
                        {choice.time} Min
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "30%",
                        justifyContent: "space-evenly",
                        
                      }}
                    >
                      <Image
                        source={require("./../assets/completeDistance.png")}
                        style={{
                          width: 25,
                          height: 25,
                        }}
                      />
                      <Text
                        style={{
                          // fontFamily: "Montserrat_500Medium",
                          textAlignVertical: "center",
                          textAlign: "center",
                          fontWeight: "bold",
                          
                        }}
                      >
                        {choice.distance} Km
                      </Text>
                    </View>

                    </View>

                  </View>
                );
              })}
            </View>

            {/* second part  */}

            <View
              style={{
                // backgroundColor: "grey",
                flexDirection: "row",
                marginTop: "1%",
                borderWidth: 1,
                borderRadius: 16,
                borderColor: "#75A5CF",
                height: "40%",
                width: "100%",
                padding: "2%",
                //black
              }}
            >
              <View
                style={{
                  // flex:1,
                  flexDirection: "column",
                  width: "20%",
                  // backgroundColor:"blue",
                }}
              >
                {choices.multipleArray.map((choice, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <RadioButton
                        value={choice.busNumber}
                        label={choice.busNumber}
                        status={
                          checkedFirstBus === choice.busNumber
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => {
                          setCheckedFirstBus(choice.busNumber);
                          setCheckedOneBus(false);
                          getsecondBus(choice, multipleWay);
                        }}
                      />

                      <Text>{choice.busNumber}</Text>
                    </View>
                  );
                })}
              </View>

              {secondBusInfo && checkedFirstBus ? (
                <ScrollView style={{ width: "80%", height: "100%" }}>
                  {secondBusInfo.filtredData.map((secondBusEl, index) => {
                    // console.log("secondBus", secondBusEl);
                    return (
                      <View
                        key={index}
                        style={{
                          // backgroundColor: "#fff",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          height: "100%",
                        }}
                      >
                        <RadioButton
                          value={secondBusEl.arrivalBus}
                          label={secondBusEl.arrivalBus}
                          status={
                            checkedSecondBus === secondBusEl.arrivalBus
                              ? "checked"
                              : "unchecked"
                          }
                          onPress={() => {
                            setCheckedSecondBus(secondBusEl.arrivalBus);
                            setCheckedOneBus(false);
                            saveSecondBusinfo(secondBusEl);
                          }}
                        />
                        <View
                          style={{
                            width: "100%",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              width: "25%",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              source={require("./../assets/bus.png")}
                              style={{
                                width: 25,
                                height: 25,
                              }}
                            />
                            <Text
                              style={{
                                height: 30,
                                width: 30,
                                borderRadius: 30,
                                borderColor: "#709FC7",
                                // fontFamily: "Montserrat_500Medium",
                                textAlignVertical: "center",
                                textAlign: "center",
                                borderWidth: 3,
                                fontWeight: "bold",
                              }}
                            >
                              {" "}
                              {secondBusEl.arrivalBus}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              width: "30%",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "2%",
                            }}
                          >
                            <Image
                              source={require("./../assets/walk.png")}
                              style={{
                                width: 25,
                                height: 25,
                              }}
                            />
                            <Text
                              style={{
                                // fontFamily: "Montserrat_500Medium",
                                textAlignVertical: "center",
                                textAlign: "center",
                                fontWeight: "bold",
                                marginTop: "2%",
                              }}
                            >
                              {secondBusEl.distance.toFixed(2)} KM
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              width: "35%",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "2%",
                            }}
                          >
                            <Image
                              source={require("./../assets/completeTime.png")}
                              style={{
                                width: 25,
                                height: 25,
                              }}
                            />
                            <Text
                              style={{
                                // fontFamily: "Montserrat_500Medium",
                                textAlignVertical: "center",
                                textAlign: "center",
                                fontWeight: "bold",
                                marginTop: "2%",
                              }}
                            >
                              {secondBusEl.completeTime.toFixed(2)} MIN{" "}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              width: "33%",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "2%",
                            }}
                          >
                            <Image
                              source={require("./../assets/completeDistance.png")}
                              style={{
                                width: 25,
                                height: 25,
                              }}
                            />
                            <Text
                              style={{
                                // fontFamily: "Montserrat_500Medium",
                                textAlignVertical: "center",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              {secondBusEl.completeDistance.toFixed(2)} KM
                            </Text>
                          </View>

                          {/* <View style={{ flexDirection: "row" }}>
                            <Image
                              source={require("./../assets/completeDistance.png")}
                              style={{
                                width: 30,
                                height: 30,
                              }}
                            />
                            <Text>
                              Fisrt bus Distance:{" "}
                              {secondBusEl.departureDistance.toFixed(2)}
                            </Text>
                          </View> */}
                          {/* <View style={{ flexDirection: "row" }}>
                            <Image
                              source={require("./../assets/completeTime.png")}
                              style={{
                                width: 30,
                                height: 30,
                              }}
                            />
                            <Text>
                              {" "}
                              fisrt bus time:{" "}
                              {secondBusEl.departureTime.toFixed(2)}
                            </Text>
                          </View> */}

                          {/* <Text>
                            Second bus Distance:{" "}
                            {secondBusEl.ArrivalDistance.toFixed(2)}
                          </Text> */}
                          {/* <Text>
                            {" "}
                            fisrt bus time: {secondBusEl.ArrivalTime.toFixed(2)}
                          </Text> */}
                          {/* <Text>
                            completeTime: {secondBusEl.completeTime.toFixed(2)}
                          </Text>
                          <Text>
                            {" "}
                            complete Distance:{" "}
                            {secondBusEl.completeDistance.toFixed(2)}
                          </Text> */}
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              ) : null}
            </View>

            {checkedOneBus && !checkedSecondBus ? (
              <View style={globalStyles.btn}>
                <Text
                  style={{
                    // fontFamily: "Montserrat_500Medium",
                    fontSize: 18,
                    color: "#fff",
                  }}
                  onPress={() => navigateToGoogle(checkedOneBus)}
                >
                  map
                </Text>
              </View>
            ) : null}

            {!checkedOneBus && checkedSecondBus && checkedFirstBus ? (
              <View style={globalStyles.btn}>
                <Text
                  style={{
                    // fontFamily: "Montserrat_500Medium",
                    fontSize: 18,
                    color: "#fff",
                  }}
                  onPress={() =>
                    navigateToGoogleTowBuses(secondBusInfo.firstDep.busNumber)
                  }
                >
                  map
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  </>
   
  );
};
