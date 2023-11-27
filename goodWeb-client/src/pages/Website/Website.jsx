import { Link } from "react-router-dom";
import websiteImg from "../../assets/photos/device_03.png"
import { ImCheckmark } from 'react-icons/im';
import ColorComponent from "../../Components/ColorComponent";

const Website = () => {
    const { colorStyle, color } = ColorComponent();
    return (
        <div className="website-section my-font-family">
            <div className="container">
                <div className="row d-flex align-items-center">
                    <div className="col-md-6 pe-lg-5">
                        <div className="text-left text-white">
                            <h1>Beautiful Websites</h1>
                            <p className="fst-italic text-secondary">Full access control of the background parallax effects, <br/>change your awesome background elements and edit colors from style.css or colors</p>
                            <ul className="list-inline block">
                                <a className="text-decoration-none text-white me-5"><ImCheckmark/> Custom Sections</a>
                                <a className="text-decoration-none text-white me-5"><ImCheckmark/> Parallax</a>
                                <a className="text-decoration-none text-white me-5"><ImCheckmark/> Icons & PSD</a>
                                <a className="text-decoration-none text-white me-5"><ImCheckmark/> Limitless Colors</a>
                            </ul>
                            <div className="mt-5 mb-3">
                            <Link href="/services" className="my-btn" style={colorStyle}>Learn More</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-center">
                            <img src={websiteImg} alt="" className="img-fluid"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Website;