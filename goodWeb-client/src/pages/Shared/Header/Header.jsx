import { FaEnvelope, FaFacebook, FaInstagramSquare, FaLinkedinIn, FaPhoneSquareAlt, FaRssSquare, FaTwitterSquare } from "react-icons/fa";
import "../../../Components/Css/Common.css"
import Navbar from "./Navbar";

const Header = () => {
    return (
        <div className="">
            <div className="bg-info py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="d-flex gap-5">
                                <a href="#" className="text-white text-decoration-none text-hover"><FaEnvelope/> youremail@gmail.com</a>
                                <a href="tel:1234567890" className="text-white text-decoration-none text-hover"><FaPhoneSquareAlt/> +1 234 567 890</a>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <ul className="nav justify-content-md-end justify-content-sm-center">
                                <li className="nav-item"><a href="#" className="nav-link text-white p-1  text-hover"><FaFacebook/></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white p-1  text-hover"><FaInstagramSquare/></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white p-1  text-hover"><FaLinkedinIn/></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white p-1  text-hover"><FaTwitterSquare/></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white p-1  text-hover"><FaRssSquare/></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
		    </div>
            <Navbar/>
        </div>
    );
};

export default Header;