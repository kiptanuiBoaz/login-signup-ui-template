import axios from 'axios';
import React from 'react';

export const UserDetails = () => {
   
    
    const getUserDetails = async ()=>{
        try {
            // getting token from browser local storage
            const token =  window.localStorage.getItem("token");
            // console.log({token})

            const res =  token && await axios({
                method: "post",
                url: "http://localhost:5000/user-data",
                data: JSON.stringify({token:token}),
            })

            console.log(res.data.data);
           

        } catch (error) {
            console.log(error);
        } 
    }

     getUserDetails();

  return (
    <div>
        <h1>something something</h1>
        <h1>something</h1>
    </div>
  )
}
