import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/reducer/userSlice";


const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueRegister, setvalueRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChangeInputRegister = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setvalueRegister({ ...valueRegister, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userRegister = valueRegister;
      await dispatch(register(userRegister) as any).unwrap();
      navigate("/Login");
    } catch (err) {
      console.log(11111, err);
    }
  };
  return (
    <section className="sect-login">
      <div className="bkg-img"></div>
      <div className="container">
        <div className="wrapper-login">
          <h2 className="title-login">Create Account</h2>
          <div className="login-with">
            <button className="h-12 w-12 rounded-full bg-white tw-flex-center hover:brightness-75 transition duration-300">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
                enable-background="new 0 0 48 48"
                className="text-primary"
                height="25"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </button>
            <button className="h-12 w-12 rounded-full bg-white tw-flex-center hover:brightness-75 transition duration-300">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                className="text-primary"
                height="25"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
              </svg>
            </button>
          </div>
          <form
            className="form"
            action="/register"
            method="POST"
            onSubmit={handleRegister}
          >
            <div className="user-name">
              <input
                onChange={handleChangeInputRegister}
                className="first-name"
                type="text"
                name="firstName"
                placeholder="First Name"
              />
              <input
                onChange={handleChangeInputRegister}
                className="last-name"
                type="text"
                name="lastName"
                placeholder="Last Name"
              />
            </div>
            <input
              onChange={handleChangeInputRegister}
              className="email"
              name="email"
              type="email"
              placeholder="Email.."
            />
            <input
              onChange={handleChangeInputRegister}
              className="password"
              name="password"
              type="password"
              placeholder="Password.."
            />
            <input className="btn btn-signin" type="submit" value="Register" />
          </form>
          <p className="text-sign-up">
            Not a member?<Link to="/Login">Sign In</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
