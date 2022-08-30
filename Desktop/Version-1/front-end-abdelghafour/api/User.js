import { baseUrl } from '../config';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const login = async (login) => {

    console.log(login)

  const url= `${baseUrl}/api/user/signIn`
  
   return axios({
        method: 'post',
        url: url,
        data:login
      }).then((response)=>{
        return response
      }).catch((error)=>{
        return error
      })

  
};

export const register = (register) => {


    const url= `${baseUrl}/api/user/signUp`
   
  
    return axios({
         method: 'post',
         url: url,
         data:register
       }).then((response)=>{
         return response
       }).catch((error)=>{
         return error
       })
};
export const mail = (email) => {
  
  const url= `${baseUrl}/api/user/sendMail`
   
  
  return axios({
       method: 'PUT',
       url: url,
       data:email
     }).then((response)=>{
       return response
     }).catch((error)=>{
       return error
     })


};


export const profile = async (profile) => {
    const user = await AsyncStorage.getItem('User')
   
    if (user) {
        const res = JSON.parse(user)
        const url= `${baseUrl}/api/user/updateUserInfo/${res.userId}`
    
        return axios({
             method: 'PUT',
             url: url,
             headers: { 'Authorization': `Bearer ${res.userToken}`},
             data:profile
           }).then((response)=>{
             return response 
           }).catch((error)=>{
             return error
           })
    }
    else {
        
        return false
    }
};


export const logged = async () => {
    
    const user = await AsyncStorage.getItem('User')
    if (user) {

        const res = JSON.parse(user)
        const url= `${baseUrl}/api/user/${res.userId}`
        return axios({
             method: 'GET',
             url: url,
             headers: { 'Authorization': `Bearer ${res.userToken}`},
          
           }).then((response)=>{
            // console.log(response.data)

              return response
           }).catch((error)=>{
             return error
           })

     
    }
    else {
        return false
    }

};


