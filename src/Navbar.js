import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    let navigate = useNavigate();
    let handleLogout = () => {
        window.localStorage.removeItem("myapptoken");
        navigate("/");
      };
  return (
    <>
 <nav className="navbar bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="ms-2  fa-brands bi bi-stack" />
            <Link to="/home" className="ms-2 fs-3">ORDER MANAGEMENT</Link>
          </a>
          <ul className="nav justify-content-end">
           
            <li className="nav-item">
              <a href= "#"onClick={handleLogout} >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
