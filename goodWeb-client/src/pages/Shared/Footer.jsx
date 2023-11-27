import {FaEnvelope, FaArrowRight} from "react-icons/fa";
import footerLogo from '../../assets/logos/logo-2.png'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../Components/Config/Server";

function Footer() {
  const [logo, setLogo]=useState()
  useEffect(()=>{
    fetch(`${baseUrl}/styles`)
    .then((res) => res.json())
    .then((data) => setLogo(data))
    .catch((error) => console.error(error));
  },[])
  // console.log(logo[0])
  return (
    <footer className=" text-muted ">
      <div className="bg-dark p-5 m-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Link to="/">
                {logo ?
                  <img className="logo" src={logo[0]?.logo_url} alt="" />:
                  <img className="logo" src={footerLogo} alt="" />
                }
              </Link>
              <div className=" mt-3">
                <p>Integer rutrum ligula eu dignissim laoreet. Pellentesque venenatis nibh sed tellus faucibus bibendum. Sed fermentum est vitae rhoncus molestie. Cum sociis natoque penatibus et magnis dis montes.</p>
                <p>Sed fermentum est vitae rhoncus molestie. Cum sociis natoque penatibus et magnis dis montes.</p>
              </div>
            </div>
            <div className="col-md-4 ml-md-5">
              <h4 className="text-white">Pages</h4>
              <ul className="p-0">
                <li className="d-flex gap-2 align-items-center"><Link className="footer-page-link text-decoration-none text-muted" to="/">Home <FaArrowRight className="footer-icon "/></Link></li>
                <li className="d-flex gap-2 align-items-center"><Link className="footer-page-link text-decoration-none text-muted" to="/career">Career <FaArrowRight className="footer-icon "/></Link></li>
                <li className="d-flex gap-2 align-items-center"><Link className="footer-page-link text-decoration-none text-muted" to="/portfolio">Portfolio <FaArrowRight className="footer-icon "/></Link></li>
                <li className="d-flex gap-2 align-items-center"><Link className="footer-page-link text-decoration-none text-muted" to="/about">About <FaArrowRight className="footer-icon "/></Link></li>
                <li className="d-flex gap-2 align-items-center"><Link className="footer-page-link text-decoration-none text-muted" to="/services">Service <FaArrowRight className="footer-icon "/></Link></li>
                <li className="d-flex gap-2 align-items-center"><Link className="footer-page-link border-0 text-decoration-none text-muted" to="/contact">Contact <span><FaArrowRight className="footer-icon "/></span></Link></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h4 className="text-white">Subscribe</h4>
              <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which one know this tricks.</p>
              <form>
                <form className="form-group bg-black d-flex justify-content-between align-items-center p-3 rounded" action="">
                  <input type="text" className="bg-black border-0" name="search"
                  placeholder="Subscribe our newsletter.."/>
                  <FaEnvelope/>
                </form>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black py-5 text-center">
        <p className="text-small m-0">All Rights Reserved. © 2023 UniqueCo.IT Ltd. & Developed by MERN</p>
      </div>
    </footer>
  );
}

export default Footer;
