import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom"

export  const Login = () => {

  const [formData, updateFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  isLoading&& console.log();
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
    logInUser();
  };

  const logInUser = async () => {
    
    try{
      setIsLoading(true);

      const res = await axios ({
        method: "post",
        url: "http://localhost:5000/login",
        data: formData,
       
      })
     
      console.log({res});
      if(res.data.status === "ok" ){
        alert("login successful");
        window.localStorage.setItem("token",res.data.data); 
        window.localStorage.setItem("isLoggedIn",true)
        window.location.href="/"
        
      }
      else if (res.data.error === "invalid password"){
        setPasswordError(true);
      }
      else{
        console.error(res.data.status);
      }
    }

    catch (error) {

      console.log(error);
      
    }

    finally{
      setIsLoading(false);
    }


  }

  //signing out function
  const signOut = () =>{
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isLoggedIn")
    window.location.href=("/")
  }

  return (
    <form>
      <h3>Sign In</h3>
      { passwordError && <p className='failed'>Incorrect password. Please try again, or click on forgot password to reset your password</p>}

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
            
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <div className="d-grid">
        <button onClick={handleSubmit} type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Forgot <Link to={'/forgot-password'}>password?</Link>
      </p>
    </form>
  )
  
};
