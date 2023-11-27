import { Link, NavLink } from "react-router-dom";
import logo_img from "../../../assets/logos/logo.png"
import "./navbar.min.js"
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../../Components/Config/Server.js";
import { AuthContext } from "../../../provider/AuthProvider.jsx";

const Navbar = ({setFocusedCard }) => {
    const { user, logOut } = useContext(AuthContext)
    // const [isAdmin, isAdminLoading] = useAdmin();
    // console.log(user)
    const [logo, setLogo]=useState()
    const [navServices, setNavServices]=useState()
    const handleMenuClick = (cardId) => {
      setFocusedCard(cardId);
    };
    useEffect(()=>{
        fetch(`${baseUrl}/services`)
        .then((res) => res.json())
        .then((data) => setNavServices(data))
        .catch((error) => console.error(error));
    },[])
    // console.log(navServices)

    useEffect(()=>{
        fetch(`${baseUrl}/styles`)
        .then((res) => res.json())
        .then((data) => setLogo(data))
        .catch((error) => console.error(error));
    },[])
    // console.log(logo[0])
    
    const handleLogOut = () => {
        logOut()
        navigate('/')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-black">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        {logo ?
                            <img className="logo" src={logo[0]?.logo_url} alt="" />:
                            <img className="logo" src={logo_img} alt="" />
                        }
                    </Link>
                    <button type="button" className="navbar-toggler bg-white border-2 border-warning p-1" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item my-nav">
                                <NavLink to="/" exact activeClassName="active"
                                className="nav-link my-font-family fw-semibold">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item my-nav">
                                <NavLink to="/about" exact activeClassName="active"
                                className="nav-link my-font-family fw-semibold">
                                    About us
                                </NavLink>
                            </li>
                            <li className="nav-item my-nav dropdown">
                                <NavLink to="/services" exact activeClassName="active" id="navbarDarkDropdownMenuLink" 
                                className="nav-link my-font-family fw-semibold dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Our Services
                                </NavLink>                           
                                <ul className="dropdown-menu" aria-labelledby="">
                                    {navServices?.map((navService) => (
                                        <li key={navService.id}>
                                        <NavLink
                                            to={`/services/${navService.id}`}
                                            className="dropdown-item my-dropdown-item fw-semibold"
                                            onClick={() => handleMenuClick(navService.id)}
                                        >
                                            {navService.service_title}
                                        </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item my-nav">
                                <NavLink exact activeClassName="active"
                                className="nav-link my-font-family fw-semibold" to="/portfolio">Portfolio
                                </NavLink>
                            </li>
                            <li className="nav-item my-nav">
                                <NavLink exact activeClassName="active"
                                className="nav-link my-font-family fw-semibold" to="/career">Career
                                </NavLink>
                            </li>
                            <li className="nav-item my-nav">
                                <NavLink exact activeClassName="active"
                                className="nav-link my-font-family fw-semibold" to="/dashboard/post-style">Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item my-nav">
                                <NavLink exact activeClassName="active"
                                className="nav-link my-font-family fw-semibold" to="/contact">Contact
                                </NavLink>
                            </li>
                            {/* <li className="nav-item my-nav">
                                <NavLink exact activeClassName="active"
                                className="nav-link my-font-family fw-semibold" to="/login">Login
                                </NavLink>
                            </li> */}
                            {user?
                                <button className='btn border-0 bg-light py-1 px-2' onClick={handleLogOut} 
                                >Logout</button>:
                                <li className="nav-item my-nav">
                                    <NavLink exact activeClassName="active"
                                    className="nav-link my-font-family fw-semibold" to="/register">Sign Up
                                    </NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            </div>
    );
};

export default Navbar;