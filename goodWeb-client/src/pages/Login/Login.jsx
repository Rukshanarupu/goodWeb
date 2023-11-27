import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import {FaGoogle} from "react-icons/fa"
import ColorComponent from "../../Components/ColorComponent";

// import { useLocation, useHistory, useNavigate } from "react-router";

const Login = () => {
  const { loginUser, signWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const location = useLocation();
  // const history = useHistory();
  // let navigate = useNavigate();
  const from =location.state?.from?.pathname || '/'

  const handleLogin = (event) => {
    event.preventDefault();
    if ((email, password)) {
      loginUser(email, password)
        .then((result) => {
          console.log(result.user);
          // navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleGoogleSignIn=()=>{
    signWithGoogle()
    .then((result) => {
      const loggedUser= result.user;
      console.log(loggedUser)
      navigate(from, {replace: true})
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage)
    });
  }
  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6 ">
            <div className="border w-100 m-auto text-center p-5">
              <form action="">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="email p-3 m-2"
                  type="email"
                  placeholder="enter your email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="password p-3 m-2"
                  type="password"
                  placeholder="enter your password"
                />
                <button onClick={handleLogin} className="btn my-btn w-75 p-2 mt-3">Login </button>

                <div className="d-flex flex-column">
                  <div className="position-relative py-2">
                    <div className="position-absolute inset-0 d-flex align-items-center">
                      <div className="border-bottom border-2" style={{width:"100%"}}></div>
                    </div>
                    <div className="position-relative d-flex justify-content-center">
                      <span className="bg-white px-4 text-sm text-black-50">Or login with</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <button onClick={handleGoogleSignIn} className="d-flex align-items-center text-white px-4 bg-secondary py-2 rounded-3 text-sm bg-warning"><FaGoogle className='me-1'></FaGoogle> Google</button>
                  </div>      
                </div>

                <p className="p-2">
                  <small className="text-warning">
                    Are you new? <Link to={"/register"} className="text-warning ">register here..</Link>
                  </small>
                </p>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <img
              className="w-100"
              src="https://i.ibb.co/hYJTmVX/undraw-Mobile-login-re-9ntv-1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
