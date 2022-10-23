import React ,{useState}from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

export const ResetPassword = () => {

  const [formData, updateFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus,setVerificationStatus] = useState();
  const [setResponse, setSetResponse] = useState();
  isLoading && console.log();
  
  // query the id and token from params
  const queryParams = new URLSearchParams(window.location.search);
  const userId = queryParams.get('userId');
  const token = queryParams.get('token');
  
  // authenticate the id and token 
  const  verifyTokenId =  async ()=>{
    try {
      const res =  await axios ({
        method: "post",
        url: `http://localhost:5000/verify-link/${userId}/${token}`,
      })

     setVerificationStatus( res.data.status);
    
    } catch (error) {
      console.error(error);
    }
  }

  userId && token && verifyTokenId();

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.type]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // ... submit to API or something
    setPassword();
  };

  const setPassword = async () => {
    
    try{
      setIsLoading(true);
     

      const res = await axios ({
        method: "post",
        url: `http://localhost:5000/reset-password/${userId}/${token}`,
        data: formData,
       
      })
     
      setSetResponse(res.data.status);
      if(res.data.status==="password updated") { window.location.href="/sign-in"};
      
    }

    catch (error) {

      console.log(error);
      
    }

    finally{
      setIsLoading(false);
    }


  }
  return (

    <form className='forgot-password'> 
    <p className={verificationStatus === "verified"  ? "success": "failed"} > {verificationStatus === "verified"  ? "Success! Link verified, please set new password" :  "Sorry, your link appears to be broken"} </p>
        <div className="mb-3">
            <label>New Password</label>
            <input
            required
            type="password"
            className="form-control"
            placeholder="Enter new password"
            // onChange={handleChange}
            />
      </div>

      <div className="mb-3">
            <label>Confirm Password</label>
            <input
            type="password"
            required
            className="form-control"
            placeholder="Confirm new password"
            onChange={handleChange}
            />
      </div>

     
        <div className="d-grid">
            <button onClick={handleSubmit} type="submit" className=" mb-3 btn btn-primary">
                Submit
            </button>
        </div>
      

        <p className="d-grid  text-right">
         <Link to={'/sign-up'}>sign Up?</Link>
      </p>
    </form>
  )
}

