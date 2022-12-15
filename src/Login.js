import "./App.css";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login() {

  const [password,setpassword] = useState("")
  
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        let loginData = await axios.post("https://oms-server.vercel.app/api/auth/login", values);
        window.localStorage.setItem("myapptoken", loginData.data.token);
        navigate("/home");
      } catch (error) {
        console.log(error);
       setpassword("Invaild email or password")
      
      }
    },
  });

// let func = () => {
//   value ="tamil" 
// }

  return (
    <div className="container" >
      <div className="row" id="top">
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
          <h1 className="text-center text-primary p-1">
            Order Management System
          </h1>
          <img width="100%" src="https://assets.website-files.com/5f44e5cc8a89454e54bb7007/624a8e877df65f3e09c45241_What%20is%20an%20OMS%20and%20its%20process_.png" className="bg-transparent" alt="order management system"/>
        </div>
        <div className="col-1"></div>
        <div className="card shadow  bg-white col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
          <form  onSubmit={formik.handleSubmit}>
            <h4 className="mt-3 text-center">Login</h4>

            <div className="m-3 fw-2">
              <label>Email</label>
              <input
                type={"email"}
                className="form-control standard-basic"
                name="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                ></input>
            </div>
            <div className="m-3">
              <label>Password</label>
              <input
                type={"password"}
                className="form-control"
                name="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                
              /><span className="text-start text-danger">{password}</span>
            </div>
            <p></p>
            <div className="ms-3 m-3">
              <input
                type={"submit"}
                className="btn btn-primary"
                value={"Login"}
              />
              <Link to={"/register"} className="link-primary ms-3">
                Register
              </Link>
             
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
