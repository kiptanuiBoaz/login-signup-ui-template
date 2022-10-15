import React from "react";
import axios from "axios";

export const SignUp = () => {

  const [formData, updateFormData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    // ... submit to API 
    registerUser();
  };

  const registerUser = async () => {
    try{

      setIsLoading(true);

      const res = await axios ({
        method: "post",
        url: "http://localhost:5000/register",
        data: formData,
       
      })

      console.log(res.data);
      // console.log(formData)

    }

    catch (error) {

      console.log(error);
      console.log(isLoading);
    }

    finally{
      setIsLoading(false);
    }

  };

  
    return (
      <form>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={handleChange}
            name="fname"
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
            
          <input onChange={handleChange} type="text" name ="lname"  className="form-control"  placeholder="Last name" />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
            name="password"
          />
        </div>

        <div className="d-grid">
          <button onClick={handleSubmit} type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  
}
