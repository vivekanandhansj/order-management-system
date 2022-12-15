import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

function CreateRespo() {

  let navigate = useNavigate();
  const [wait, setwait] = useState("");

  let formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      price: "",
    },
    onSubmit: async (values) => {
      setwait("Wait for a moment");
      try {
        await axios.post(
          "https://oms-server.onrender.com/api/order/createOrder",
          values,
          {
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          }
        );
      } catch (error) {
        alert("Something went wrong in token");
      }
      navigate("/home");
    },
  });

  return (
    <>
     
    <Navbar/>
    
    <div className="container card-body ">
      <form onSubmit={formik.handleSubmit}>
        <div className="card col-lg-6">
          <h5 className="card-header fs-3 "> Order Management system </h5>
          <div className="container row mt-3 mb-3  ">
            <div >
              <label htmlFor="formGroupExampleInput" className="form-label">
                 Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder="Order name"
              />
            </div>
            <div >
              <label htmlFor="formGroupExampleInput" className="form-label">
                 Category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                onChange={formik.handleChange}
                value={formik.values.category}
                placeholder="Category name"
              />
            </div>
            <div >
              <label htmlFor="formGroupExampleInput" className="form-label">
                 Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                onChange={formik.handleChange}
                value={formik.values.price}
                placeholder="Price in rupees"
              />
            </div>
           
           
            <span className="text-center text-danger">{wait}</span>
            <div className="d-grid col-3 mt-3 mx-auto  ">
              <button
                className="btn btn-outline-primary text-center "
                type={"submit"}
                value="Submit"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    
    
    
    </>
  );
}

export default CreateRespo;
