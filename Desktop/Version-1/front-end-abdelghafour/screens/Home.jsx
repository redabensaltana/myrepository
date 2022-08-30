import React from "react";
import { View, Button, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import BusStopDetails from "./components/BusStopDetails";
import * as Location from "expo-location";
import { backUrl } from "../config";
const {
  io,
  default: socketIo,
} = require("../node_modules/socket.io-client/dist/socket.io");
import Map from "../map/map.js";
import TopBar from "./components/TopBarHome";
const { setIntervalAsync } = require("set-interval-async/dynamic");

class Home extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      location: [30.419007, -9.587358],
      errorMsg: null,
      busStopDetails: null,
      visible: true,
    };
    this.ref = React.createRef();
  }

  hideSpinner = () => {
    this.setState({ visible: false });
  };
  showSpinner = () => {
    this.setState({ visible: true });
  };

  LoadingIndicatorView() {
    return <ActivityIndicator color="white" size="large" />;
  }

  setError() {
    this.setState({
      errorMsg: "Permission to access location was denied",
    });
  }

  setLocation(location) {
    this.state.location = location;
  }

  injectMap() {
    const map = `
    
    var polygon;
    
    const clearMap = () => {
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      return fetch("${backUrl}/api/busStop/clearMap", options);
    }
    
    const getBusStopDetails = (cord) => {
      if (polygon) {
        mymap.removeLayer(polygon);
        polygon = null
      }
        clearMap()
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify({
            cord : cord
        })
      };
      
      return fetch("${backUrl}/api/busStop/getBusStopDetails", options);
    };
    //?creating map
      var mymap = L.map("mapid").setView([${this.state.location.coords.latitude},${this.state.location.coords.longitude}], 16);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        {
          minZoom: 6,
          maxZoom: 18,
          attribution: "ALSA map",
          id: "mapbox/streets-v11",
        }
        ).addTo(mymap);
        var mypos = L.marker([${this.state.location.coords.latitude},${this.state.location.coords.longitude}], {
          icon: L.icon({
            iconUrl:
              "https://i.postimg.cc/ydyD5vQS/standing-up-man.png",
            // shadowUrl: 'https://cdn-icons-png.flaticon.com/512/64/64283.png',
            iconSize: [60, 60], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [20, 30], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62], // the same for the shadow
            popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
          }),
        })
        .on("click", () => {
          mymap.flyTo([${this.state.location.coords.latitude},${this.state.location.coords.longitude}], 15,{
            pan: {
                animate: true
            },
        })
        })
        .addTo(mymap);
  
        fetch("${backUrl}/api/busStop/getBusStops_2", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => {
         
            data.busStops.forEach((stop) => {
              
              if(stop.number.length > 1){
                L.marker(stop.cordinates, {
                  icon: L.icon({
                    iconUrl: "https://i.postimg.cc/8PpsdvG5/front-of-bus.png",
                    // shadowUrl: 'https://cdn-icons-png.flaticon.com/512/64/64283.png',
                    iconSize: [30, 30], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [20, 30], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62], // the same for the shadow
                    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
                  }),
                })
                  .addTo(mymap)
                  .on("click", () => {
                    getBusStopDetails(stop.cordinates)
                    mymap.flyTo(stop.cordinates, 16,{
                      pan: {
                          animate: true
                      },
                  })
                  });
              }else{
                L.marker(stop.cordinates, {
                  icon: L.icon({
                    iconUrl: "https://i.postimg.cc/7YKhKLPN/front-of-bus-green.png",
                    // shadowUrl: 'https://cdn-icons-png.flaticon.com/512/64/64283.png',
                    iconSize: [30, 30], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [20, 30], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62], // the same for the shadow
                    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
                  }),
                })
                  .addTo(mymap)
                  .on("click", () => {
                    getBusStopDetails(stop.cordinates)
                    mymap.flyTo(stop.cordinates, 16,{
                      pan: {
                          animate: true
                      },
                  })
                  });
              }
            });
          });
      function drawWay(path) {
        if (polygon) {
          mymap.removeLayer(polygon);
          polygon = null
        }
        polygon = L.polygon(path, { color: "#66a5d1" }).addTo(mymap);
        //? to let the path fit the screen
        mymap.flyToBounds(polygon.getBounds());
      }
      
      mymap.on("click",() => {
        if (polygon) {
          mymap.removeLayer(polygon);
          polygon = null;
        }
        clearMap()
      });
      `;

    if (this.ref.current) {
      this.ref.current.injectJavaScript(map);
    }
  }

  componentDidMount() {
    this._isMounted = true;

    //****** Socket setup ********/
    const socket = io(`${backUrl}`);
    socket.on("connect", () => {
      console.log("connected to socket : " + socket.id);
    });
    //****** Current Location *******/
    var location;

    const getCurrentLocation = async () => {
      // console.log("async getCurrentLocation func");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted" && this._isMounted == true) {
        this.setError();
        return;
      }

      location = await Location.getCurrentPositionAsync({});
      if (this._isMounted == true) {
        this.setLocation(location);
      }

      setTimeout(() => {
        if (this._isMounted == true && this.ref.current != null) {
          this.injectMap();
        }
      }, 2000);
    };

    getCurrentLocation();

    setIntervalAsync(async () => {
      if (this.ref.current != null) {
        let latitude, longitude;
        let location = await Location.getCurrentPositionAsync({});
        latitude = parseFloat(location.coords.latitude);
        longitude = parseFloat(location.coords.longitude);

        this.ref.current.injectJavaScript(`mymap.removeLayer(mypos)`);

        this.ref.current.injectJavaScript(
          `mypos = L.marker([${latitude},${longitude}], {
            icon: L.icon({
              iconUrl:
                "https://i.postimg.cc/ydyD5vQS/standing-up-man.png",
              // shadowUrl: 'https://cdn-icons-png.flaticon.com/512/64/64283.png',
              iconSize: [60, 60], // size of the icon
              shadowSize: [50, 64], // size of the shadow
              iconAnchor: [20, 30], // point of the icon which will correspond to marker's location
              shadowAnchor: [4, 62], // the same for the shadow
              popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
            }),
          })
          .on("click", () => {
            mymap.flyTo([${latitude},${longitude}], 15,{
              pan: {
                  animate: true
              },
          })
          })
          .addTo(mymap);`
        );
        console.log("5 sec passed: location updated");
      }
    }, 5000);

    //****** Bus stop details *******/
    socket.on("busStopDetails", (data) => {
      if (this._isMounted == true) {
        this.setState({
          busStopDetails: data,
        });
      }
    });

    socket.on("clearMap", () => {
      if (this._isMounted == true) {
        this.setState({
          busStopDetails: null,
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <TopBar navigation={this.props.navigation} />
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            flex: 1,
            padding: 0,
          }}
        >
          {this.state.location != null && (
            <View
              style={{ position: "relative", height: "100%", width: "100%" }}
            >
              <WebView
                originWhitelist={["*"]}
                javaScriptEnabled={true}
                // geolocationEnabled={true}
                // ref={(ref) => (this.ref = ref)}
                ref={this.ref}
                source={{
                  html: Map,
                }}
                style={{
                  width: "100%",
                  height: "90%",
                  borderTopRightRadius: 40,
                  borderTopLeftRadius: 40,
                  backgroundColor: "#75a5cf",
                }}
                onLoadStart={() => this.showSpinner()}
                onLoad={() => this.hideSpinner()}
              />
              {this.state.visible && (
                <ActivityIndicator
                  color="white"
                  size="large"
                  style={{
                    flex: 1,
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#75a5cf",
                  }}
                />
              )}
              {this.state.busStopDetails != null && (
                <BusStopDetails
                  data={this.state.busStopDetails}
                ></BusStopDetails>
              )}
            </View>
          )}
        </View>
      </>
    );
  }
}

export default Home;


