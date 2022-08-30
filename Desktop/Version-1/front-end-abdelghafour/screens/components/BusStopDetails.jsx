import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useState } from "react";
import { getBusLinePath } from "../../api/BusLine";
import busStop from "../../assets/bus-stop.png";
import nextArrival from "../../assets/corner-down-right-double.png";
import clock from "../../assets/clock.png";
import { useFonts, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
var moment = require("moment");

// import {
//   Montserrat_100Thin,
//   Montserrat_200ExtraLight,
//   Montserrat_300Light,
//   Montserrat_500Medium,
//   Montserrat_600SemiBold,
//   Montserrat_700Bold,
//   Montserrat_800ExtraBold,
//   Montserrat_900Black,
// } from '@expo-google-fonts/montserrat'

const BusStopDetails = (props) => {
  const data = props.data;
  const [busActive, setBusActive] = useState(data[0].num);

  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        setBusActive(item.num);
        getBusLinePath(item.num);
      }}
    >
      {item.num == busActive ? (
        <View
          style={[
            styles.busLine,
            { borderWidth: 4, borderColor: "#75a5cf", height: 65, width: 65 },
          ]}
        >
          <Text
            style={{
              fontFamily: "Montserrat_500Medium",
              fontSize: 19,
              color: "#202020",
            }}
          >
            {item.num}
          </Text>
        </View>
      ) : (
        <View style={styles.busLine}>
          <Text
            style={{
              fontFamily: "Montserrat_500Medium",
              fontSize: 16,
              color: "#6a6873",
            }}
          >
            {item.num}
          </Text>
        </View>
      )}
    </Pressable>
  );

  var remainingTime;
  var first;
  var second;
  var nextTime;
  var remTimeFirst;
  var remTimeSecond;

  function getNextTime() {
    var now = moment().format("HH:mm");
    now = moment(now, "HH:mm");
    nextTime = moment(
      data.filter((el) => el.num == busActive)[0].nextTime,
      "HH:mm"
    );
    console.log(nextTime)

    remainingTime = nextTime.diff(now);
    remainingTime = moment(remainingTime, "x").format("HH:mm");

    remTimeFirst = moment(remainingTime, "HH:mm")
      .subtract(10, "minutes")
      .format("HH:mm");
    remTimeSecond = moment(remainingTime, "HH:mm")
      .add(10, "minutes")
      .format("HH:mm");

    first = moment(
      data.filter((el) => el.num == busActive)[0].nextTime,
      "HH:mm"
    );
    second = moment(
      data.filter((el) => el.num == busActive)[0].nextTime,
      "HH:mm"
    );
    first = first.subtract(10, "minutes").format("HH:mm");
    second = second.add(10, "minutes").format("HH:mm");
    return true;
  }

  return (
    <View style={styles.busDetailsContainer}>
      <FlatList
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        horizontal={true}
        data={data}
        renderItem={renderItem}
      />
      <View style={styles.busDetails}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Image
            source={busStop}
            style={{ width: 30, height: 30, marginRight: 10 }}
          ></Image>
          <Text style={styles.info}>Bus .</Text>
          <Text style={styles.infodata}> {busActive}</Text>
        </View>
        <View>
          {data.filter((el) => el.num == busActive)[0].nextTime ==
          "hors service" ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Image
                source={nextArrival}
                style={{ width: 30, height: 30, marginRight: 10 }}
              ></Image>
              <Text style={styles.info}>Prochaine arrivée .</Text>
              <Text style={[styles.infodata, { color: "#d65c66" }]}>
                {" "}
                hors service
              </Text>
            </View>
          ) : (
            getNextTime() && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Image
                    source={nextArrival}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  ></Image>
                  <Text style={styles.info}>Prochaine arrivée .</Text>
                  <Text style={styles.infodata}>
                    {" "}
                    {first} .... {second}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Image
                    source={clock}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  ></Image>
                  <Text style={styles.info}>Reste .</Text>
                  <Text style={styles.infodata}>
                    {" "}
                    {remTimeFirst.slice(0, 2) == "00"
                      ? remTimeFirst.substring(3)
                      : remTimeFirst.replace(":", "h ")}
                    min .... {remTimeSecond.replace(":", "h ")}min
                  </Text>
                </View>
              </>
            )
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  busDetailsContainer: {
    bottom: 20,
    position: "absolute",
    width: "100%",
    height: 280,
    alignItems: "center",
  },

  busDetails: {
    padding: 30,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: "#fff",
    width: "90%",
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  busLine: {
    height: 60,
    width: 60,
    backgroundColor: "#fff",
    borderRadius: 50 / 2,
    bottom: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  info: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 17,
    color: "#202020",
  },

  infodata: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
    color: "#486985",
  },
});

export default BusStopDetails;
