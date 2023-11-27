/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import {FaGoogle} from "react-icons/fa"
import ColorComponent from "../../Components/ColorComponent";

const Register = () => {
  const { colorStyle, color } = ColorComponent();
  const { createUser,signWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const from =location.state?.from?.pathname || '/'

  const handleRegistration = (event) => {
    event.preventDefault();
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setError("password not valid need 8 char ");
      return;
    }
    if ((name, email, password)) {
      createUser(email, password)
        .then((result) => {
          console.log(result.user);
        })
        .catch((err) => {
          console.log(err.message);
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
              <p className="text-danger">{error}</p>
              <form action="">
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="email p-3 m-2"
                  type="text"
                  placeholder="enter your Name"
                  required
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="email p-3 m-2"
                  type="email"
                  placeholder="enter your email"
                />
                <div className="pass-container">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="password p-3 m-2"
                    type="text"
                    placeholder="type your password"
                  />
                  {/* <input
                    className="password p-3 m-2"
                    type="password"
                    placeholder="enter your password"
                  /> */}
                  {/* <button>toggle</button> */}
                </div>
                <button onClick={handleRegistration} className="btn my-btn w-75 p-2 mt-3" style={colorStyle}> Register </button>
                
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
                    <button onClick={handleGoogleSignIn} className="d-flex align-items-center text-white px-4 bg-secondary py-2 rounded-3 text-sm bg-warning"><FaGoogle className='mr-1'></FaGoogle> Google</button>
                  </div>      
                </div>
                
                <p className="p-2">
                  <small className="text-warning">
                    Already have account? <Link to={"/register"} className="text-warning ">login here..</Link>
                  </small>
                </p>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <img
              className="w-100"
              src="https://i.ibb.co/Vmyggr3/undraw-Login-re-4vu2.png"
              alt=""
            />
          </div>
        </div>
        {/* <SocialLoginBtn></SocialLoginBtn> */}
      </div>
    </div>
  );
};

export default Register;
