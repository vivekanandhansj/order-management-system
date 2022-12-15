import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Navbar } from './Navbar';

function Viewrepo() {

    let params = useParams()
    const [users, setusers] = useState("_")

    
    let formik = useFormik({
        initialValues: {
          name:"",
          category:"",
          price:"",
    
    
        }})   
    
    
    useEffect( async () => {
        try {
            let repoData = await axios.get(`https://oms-server.vercel.app/api/order/viewOrder/${params.id}`, {
                headers: {
                  Authorization: window.localStorage.getItem("myapptoken"),
                },
              });
              formik.setValues({
                      name: repoData.data.name,
                      commit: repoData.data.category,
                      code:repoData.data.price
                    });
                    setusers(repoData.data)
            } catch (error) {
              alert("Something went wrong");
        }         
     }, [])

  return (
    <>
    <Navbar/>
    <div className="container card-body text-center ">
      <h1 className='text-center'>Order details</h1>
    <div>
      <p>{`Name : ${users.name}`}</p>
      <p>{`Category : ${users.category}`}</p>
      <p>{`Price : ${users.price}`}</p>

    </div>
 </div>


 </>
   );
 
}

export default Viewrepo
