import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";


function Home() {
  
  const [orders, setOrders] = useState([]);
  
  async function fetchAll() {
    try {
      let studentsData = await axios.get("https://vivek-oms.herokuapp.com/api/order/orderList", {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      });
      setOrders(studentsData.data);
    } catch (error) {
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

 

  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to delete this order?"
      );
      if (ask) {
        await axios.delete(`https://vivek-oms.herokuapp.com/api/order/deleteOrder/${id}`, {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        });
        fetchAll();
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };



  return ( <div className="container-fluid">
   
     
<Navbar/>


      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5">
        <div className="m-4 mt-3 fs-3">
        <Link to={"/newrepo"}type="button" className=" btn btn-outline-primary">New Order</Link>
        </div>
          <table className="table table-striped">
            <thead>
              <tr className="text-center">
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>

                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr className="text-center">
                    <td className="h5 text-dark">{order.name}</td>
                    <td className="h5 text-dark">{order.category}</td>
                    <td className="h5 text-dark">{order.price}</td>
               
                    <td className="">
                      <Link to={`/viewrepo/${order._id}`}
                        className="btn btn-primary btn-sm ms-2">
                        view
                      </Link>
                      <Link to={`/editrepo/${order._id}`} 
                        className="btn btn-warning btn-sm ms-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="btn btn-danger btn-sm ms-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className=" col">
        <img width="100%" src="https://efleetcare.com.au/wp-content/uploads/2020/08/gps-fleet-management-software.jpg" className="bg-transparent" alt="order management system"/>
        </div>
      </div>
    </div>
  );
}

export default Home;
