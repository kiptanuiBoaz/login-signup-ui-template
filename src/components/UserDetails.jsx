import axios from 'axios';
import React from 'react';

export const UserDetails = () => {
   const [userDetails, setUserDetails] = React.useState();
    
    const getUserDetails = async ()=>{
        try {
            // getting token from browser local storage
            const token =  window.localStorage.getItem("token");
            // console.log({token})

            const res =   await axios({
                method: "post",
                url: "http://localhost:5000/user-data",
                data: {token},
            })

            // console.log(res.data.data);
            setUserDetails(res.data.data);
           

        } catch (error) {
            console.log(error);
        } 
    }

    getUserDetails();
    //  console.log(userDetails);

  return (
    <div>
        Name:<h1>{userDetails.fname} </h1>
        Email:<h1>{userDetails.email}</h1>
    </div>
  )
}
