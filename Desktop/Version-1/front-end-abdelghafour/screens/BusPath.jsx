import React, { useEffect, useState, useRef } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View, Text, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Map from "../assets/Map";
import * as Location from "expo-location";
const { setIntervalAsync } = require("set-interval-async/dynamic");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "../assets/style";


class BusPath extends React.Component {
  constructor(props) {
    super(props);
    this.webView = React.createRef();
    this.state = {
      modalOpen: false,
      firstPoint: null,
      secondPoint: null,
      thirdPoint: null,
      fourthPoint: null,
    };
  }

  async componentDidMount() {
    const filterdData = await AsyncStorage.getItem("filterdData");

    if (filterdData === "undefined") {
      this.oneWay();
    } else {
      // console.log(filterdData)
      this.multipleWay();
    }
  }

  multipleWay() {
    let filtredData = 0;
    let firstIndex, secondIndex, Path;
    let firstPath = [];
    let secondPath = [];
    let firstBusStop, secondBusStop, thirdBusStop, fourthBusStop;
    setTimeout(async () => {
      const filterdDataString = await AsyncStorage.getItem("filterdData");
      filtredData = await JSON.parse(filterdDataString);

      // console.log(
      //   "-----------------------------departurePath---------------------------------------------"
      // );
      // console.log(filtredData.departurePath.flat(2));
      // console.log(filtredData.departurePath.flat(2)[0]);
      // console.log(filtredData.departurePath.flat(2)[1]);
      // console.log(firstIndex);
      
      // console.log(filtredData.departurePath.flat(2)[firstIndex - 2]);
      // console.log(filtredData.departurePath.flat(2)[firstIndex - 1]);
      
      
      
      // console.log(
        //   "-----------------------------ArrivalPath---------------------------------------------"
      // );
      // console.log(filtredData.ArrivalPath.flat(2));
      // console.log(filtredData.ArrivalPath.flat(2)[0]);
      // console.log(filtredData.ArrivalPath.flat(2)[1]);
      // console.log(secondIndex);
      // console.log(filtredData.ArrivalPath.flat(2)[secondIndex - 2]);
      // console.log(filtredData.ArrivalPath.flat(2)[secondIndex - 1]);
      
      firstIndex = filtredData.departurePath.flat(2).length;
      this.setState({ firstPoint:filtredData.departurePath.flat(2)[firstIndex - 2] })
      this.setState({ secondPoint:filtredData.departurePath.flat(2)[firstIndex - 1] })
      secondIndex = filtredData.ArrivalPath.flat(2).length;
      this.setState({ thirdPoint:filtredData.ArrivalPath.flat(2)[0]})
      this.setState({ fourthPoint:filtredData.ArrivalPath.flat(2)[1]})



      firstPath = filtredData.departurePath;
      secondPath = filtredData.ArrivalPath;

      Path = [firstPath, secondPath];

      // console.log(
      //   "-----------------------------Path---------------------------------------------"
      // );
      // console.log(Path);

      if (this.webView.current != null) {
        this.webView.current
          .injectJavaScript(`var mymap = L.map("mapid").setView([${
          filtredData.departurePath.flat(2)[0]
        }, ${filtredData.departurePath.flat(2)[1]}], 15)
         L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        {
          maxZoom: 18,
          attribution: "ALSA map",
          id: "mapbox/streets-v11",
        }
        ).addTo(mymap)
      `);

        this.webView.current.injectJavaScript(` L.marker([${
          filtredData.departurePath.flat(2)[0]
        }, ${filtredData.departurePath.flat(2)[1]}], {
        icon: L.icon({
        iconUrl: "https://i.postimg.cc/8PpsdvG5/front-of-bus.png",
        iconSize: [38, 40], 
        shadowSize: [50, 64],
        iconAnchor: [20, 30], 
        shadowAnchor: [4, 62], 
        popupAnchor: [-3, -76], 
        }),
    })
        .addTo(mymap)`);

        this.webView.current.injectJavaScript(` L.marker([${
          filtredData.departurePath.flat(2)[firstIndex - 2]
        }, ${filtredData.departurePath.flat(2)[firstIndex - 1]}], {
        icon: L.icon({
        iconUrl: "https://i.postimg.cc/8PpsdvG5/front-of-bus.png",
        iconSize: [38, 40], 
        shadowSize: [50, 64],
        iconAnchor: [20, 30], 
        shadowAnchor: [4, 62], 
        popupAnchor: [-3, -76], 
        }),
    })
        .addTo(mymap)`);

        this.webView.current.injectJavaScript(` L.marker([${
          filtredData.ArrivalPath.flat(2)[0]
        }, ${filtredData.ArrivalPath.flat(2)[1]}], {
        icon: L.icon({
        iconUrl: "https://i.postimg.cc/8PpsdvG5/front-of-bus.png",
        iconSize: [38, 40], 
        shadowSize: [50, 64],
        iconAnchor: [20, 30], 
        shadowAnchor: [4, 62], 
        popupAnchor: [-3, -76], 
        }),
    })
        .addTo(mymap)`);

        this.webView.current.injectJavaScript(` L.marker([${
          filtredData.ArrivalPath.flat(2)[secondIndex - 2]
        }, ${filtredData.ArrivalPath.flat(2)[secondIndex - 1]}], {
      icon: L.icon({
      iconUrl: "https://i.postimg.cc/8PpsdvG5/front-of-bus.png",
      iconSize: [38, 40], 
      shadowSize: [50, 64],
      iconAnchor: [20, 30], 
      shadowAnchor: [4, 62], 
      popupAnchor: [-3, -76], 
      }),
  })
      .addTo(mymap)`);

        this.webView.current.postMessage(JSON.stringify(Path));
      }
    }, 1800);

    setIntervalAsync(async () => {
      if (this.webView.current != null) {
        let latitude, longitude, marker, mymap;

        let location = await Location.getCurrentPositionAsync({});
        latitude = parseFloat(location.coords.latitude);
        longitude = parseFloat(location.coords.longitude);

        this.webView.current.injectJavaScript(`mymap.removeLayer(marker)`);

        this.webView.current.injectJavaScript(
          `marker = L.marker([${latitude}, ${longitude}]).addTo(mymap)`
        );
      }
    }, 1800);
  }

  oneWay() {
    let Path = [];
    setTimeout(async () => {
      const path = await AsyncStorage.getItem("Path");
      Path = await JSON.parse(path);

      let lastStopLat = Path[Path.length - 1][0];
      let lastStopLon = Path[Path.length - 1][1];
      let firstStopLat = Path[0][0];
      let firstStopLon = Path[0][1];

      if (this.webView.current != null) {
        this.webView.current
          .injectJavaScript(`var mymap = L.map("mapid").setView([${firstStopLat}, ${firstStopLon}], 15)
         L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        {
          maxZoom: 18,
          attribution: "ALSA map",
          id: "mapbox/streets-v11",
        }
        ).addTo(mymap)
      `);

        this.webView.current
          .injectJavaScript(` L.marker([${firstStopLat}, ${firstStopLon}], {
        icon: L.icon({
        iconUrl: "https://i.postimg.cc/8PpsdvG5/front-of-bus.png",
        iconSize: [38, 40], 
        shadowSize: [50, 64],
        iconAnchor: [20, 30], 
        shadowAnchor: [4, 62], 
        popupAnchor: [-3, -76], 
        }),
    })
        .addTo(mymap)`);

        this.webView.current.injectJavaScript(`
        L.marker([${lastStopLat}, ${lastStopLon}], {
        icon: L.icon({
        iconUrl: "https://i.postimg.cc/8PpsdvG5/front-of-bus.png",
        iconSize: [38, 40], 
        shadowSize: [50, 64],
        iconAnchor: [20, 30], 
        shadowAnchor: [4, 62], 
        popupAnchor: [-3, -76], 
        }),
    })
        .addTo(mymap)`);
        this.webView.current.postMessage(JSON.stringify(Path));
      }
    }, 1800);

    setIntervalAsync(async () => {
      if (this.webView.current != null) {
        let latitude, longitude, marker, mymap;

        let location = await Location.getCurrentPositionAsync({});
        latitude = parseFloat(location.coords.latitude);
        longitude = parseFloat(location.coords.longitude);

        this.webView.current.injectJavaScript(`mymap.removeLayer(marker)`);

        this.webView.current.injectJavaScript(
          `marker = L.marker([${latitude}, ${longitude}]).addTo(mymap)`
        );
      }
    }, 1800);
  }

  render() {
    return (
      <>
        <WebView
          javaScriptEnabled={true}
          ref={this.webView}
          source={{ html: Map }}
          startInLoadingState={true}
        />

        <Modal visible={this.state.modalOpen} animationType="slide">
          <View style={globalStyles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={{ ...globalStyles.modalToggle, ...globalStyles.modalClose }}
              onPress={() => this.setState({ modalOpen: false })}
            />
            <WebView
              source={{
                uri: `https://www.google.com/maps/dir/${this.state.firstPoint},${this.state.secondPoint}/${this.state.thirdPoint},${this.state.fourthPoint}`,
              }}
            />
          </View>
        </Modal>

        <MaterialIcons
          name="my-location"
          size={24}
          color={"white"}
          style={globalStyles.modalToggle}
          onPress={() => this.setState({ modalOpen: true })}
        />
      </>
    );
  }
}



export default BusPath;
