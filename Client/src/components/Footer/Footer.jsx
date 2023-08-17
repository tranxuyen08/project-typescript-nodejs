import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="wrapper-content">
          <div className="col-md-6 text-center">
            <p className="footer-text">Copyright &copy; 2020</p>
          </div>
          <div className="col-md-6 text-center contact">
            <p className="footer-text">
              Contact me:
              <span>
                <BsFacebook />
              </span>
              <span>
                <AiFillGithub />
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
