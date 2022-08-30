import { baseUrl } from '../config';
import * as Location from "expo-location";
import axios from 'react-native-axios';


export const getBusStops = async () => {

    let location = await Location.getCurrentPositionAsync({});
    let latitude =  parseFloat(location.coords.latitude)
    let longitude = parseFloat(location.coords.longitude)

    const url = `${baseUrl}/api/busStop/getBusStops/${latitude}/${longitude}`
    return axios({
        method: 'GET',
        url: url,
    }).then((response) => {
        return response
    }).catch((error) => {
        return error
    })




};


export const nearBusStop= async (checked) => {

  
    let location = await Location.getCurrentPositionAsync({});
    let latitude =  parseFloat(location.coords.latitude)
    let longitude = parseFloat(location.coords.longitude)
   
    const url = `${baseUrl}/api/busStop/nearBusStops/${latitude}/${longitude}/${checked}`
    return axios({
        method: 'GET',
        url: url,
    }).then((response) => {
        return response
    }).catch((error) => {
        return error
    })

  

};

