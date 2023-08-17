import React from "react";
import {
  AiOutlineHistory,
  AiOutlineHome,
  AiOutlineLogin,
  // AiOutlineLogout,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiLogOutCircle, BiUserCircle } from "react-icons/bi";
import { LuBookMarked } from "react-icons/lu";
import { MdOutlineExplore } from "react-icons/md";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const accessTokenLogin =
    localStorage.getItem("accessToken") || "";
  const handleLogout = () => {
    navigate('/login');
  };
  return (
    <section className="set-side-bar">
      <div className="container">
        <div>
          <div className="wrapper-header">
            <Link to="/" className="wrapper-img">
              <img src="/image/zyro-image (1).png" alt="logo" />
            </Link>
            <h1>FixCode&Chill</h1>
          </div>
          <div className="list-nav">
            <div className="item-nav">
              <h3 className="title-h3">Menu</h3>
              <ul className="">
                <li className={location.pathname === "/" ? "active" : ""}>
                  <Link to="/">
                    <AiOutlineHome className="icon" />
                    <p>Home</p>
                  </Link>
                </li>
                <li
                  className={location.pathname === "/Explore" ? "active" : ""}
                >
                  <Link to="/Explore">
                    <MdOutlineExplore className="icon" />
                    <p>Explore</p>
                  </Link>
                </li>
                <li className={location.pathname === "/Search" ? "active" : ""}>
                  <Link to="/Search">
                    <AiOutlineSearch className="icon" />
                    <p>Search</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="item-nav">
              <h3 className="title-h3">PERSONAL</h3>
              <ul className="">
                <li
                  className={
                    location.pathname === "/BookMarked" ? "active" : ""
                  }
                >
                  <Link to="/BookMarked">
                    <LuBookMarked className="icon" />
                    <p>BookMarked</p>
                  </Link>
                </li>
                <li
                  className={location.pathname === "/History" ? "active" : ""}
                >
                  <Link to="/History">
                    <AiOutlineHistory className="icon" />
                    <p>History</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="item-nav">
              <h3 className="title-h3">GENERAL</h3>
              <ul className="">
                <li
                  className={location.pathname === "/Profile" ? "active" : ""}
                >
                  <Link to="/Profile">
                    <BiUserCircle className="icon" />
                    <p>Profile</p>
                  </Link>
                </li>
                {accessTokenLogin ? (
                  <li
                    onClick={handleLogout}
                    className={location.pathname === "/Login" ? "active" : ""}
                  >
                    <Link to="/Login">
                      <BiLogOutCircle className="icon" />
                      <p>Logout</p>
                    </Link>
                  </li>
                ) : (
                  <li
                    className={location.pathname === "/Login" ? "active" : ""}
                  >
                    <Link to="/Login">
                      <AiOutlineLogin className="icon" />
                      <p>Login</p>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
