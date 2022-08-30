
import { baseUrl } from '../config';
import axios from 'react-native-axios';

export const getBusRoutes = (departure, arrival) => {

    let ride = {
        "departure": departure,
        "arrival": arrival,
    }
    const url = `${baseUrl}/api/busLine/getBusRoutes`
    return axios({
        method: 'post',
        url: url,
        data: ride
    }).then((response) => {
       
        return response
    }).catch((error) => {
        return error
    })


  
};

export const secondBus = (busNumber,multipleArray) => {
   

    let secondBus = {
        "departure": busNumber,
        "multipleArray": multipleArray,
    }

    const url = `${baseUrl}/api/busLine/getSecondBus`
    return axios({
        method: 'post',
        url: url,
        data: secondBus
    }).then((response) => {
       
        return response
    }).catch((error) => {
        return error
    })


  
};


export const getBusLinePath = (num) => {

    const body = {
        num:num
    }

    fetch(`${baseUrl}/api/busLine/getBusLinePath`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
};





















































