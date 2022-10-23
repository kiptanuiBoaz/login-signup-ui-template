import axios from 'axios';
import React,{useEffect, useState} from 'react';

export const UserDetails = () => {
   const [userDetails, setUserDetails] = useState();
   const [isLoading, setIsLoading] = useState(false);
   const isLoggedIn =  window.localStorage.getItem("isLoggedIn"); //getting the value from the browser memory
    //checking from the browser memory if the user is Loggedin


   if(isLoggedIn !== "true") {window.location.href="/sign-in"}
   
    
    useEffect(() => {
            const getUserDetails = async ()=>{
                setIsLoading(true);

                try {
                    setIsLoading(true);
                    // getting token from browser local storage
                    const token =  window.localStorage.getItem("token");
                
                    // console.log({token})

                    const res =   await axios({
                        method: "post",
                        url: "http://localhost:5000/user-data",
                        data: {token},
                    })

                    console.log({res});
                    setUserDetails(res.res.data.data);

                } 
                catch (error) {
                    console.error(error);
                } 
                setIsLoading(false);

            }
            getUserDetails();
           
        }, []
    );

   
    //  console.log(userDetails);

  return (
    
    <div>
        {isLoading && <div>Loading...</div>} 

        {!isLoading && 
        <div>
            <h1>Name:</h1><h1>{userDetails.fname} </h1>
            <h1>Email:</h1> <h1>{userDetails.email}</h1>
           
        </div>
        }

      
    </div>
  )
}
