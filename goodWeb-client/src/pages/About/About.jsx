import { Link } from 'react-router-dom';
import aboutImgOne from '../../assets/photos/about_01.jpg';
import aboutImgTwo from '../../assets/photos/about_02.jpg';
import ColorComponent from '../../Components/ColorComponent';

const About = () => {
    const { colorStyle, color } = ColorComponent();
    // console.log(colorStyle)

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 ">
                    <div className="mb-5">
                        <h6 className='text-uppercase text-body-secondary fw-semibold'>About Us</h6>
                        <h3 className='fw-medium text-uppercase'>Welcome to GoodWEB Solutions</h3>
                        <div className=' text-body-secondary mb-4'>
                            <p className="fs-4 fst-italic py-2">Quisque eget nisl id nulla sagittis auctor quis id. Aliquam quis vehicula enim, non aliquam risus. Sed a tellus quis mi rhoncus dignissim.</p>
                            <p> Integer rutrum ligula eu dignissim laoreet. Pellentesque venenatis nibh sed tellus faucibus bibendum. Sed fermentum est vitae rhoncus molestie. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed vitae rutrum neque. Ut id erat sit amet libero bibendum aliquam. Donec ac egestas libero, eu bibendum risus. Phasellus et congue justo. </p>
                        </div>
                        <Link to="/about" className="my-btn text-decoration-none" style={colorStyle}>Learn More</Link>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <img className='img-fluid' src={aboutImgOne} alt="" />
                </div>
                <hr className="border-top border-dashed border-2 mt-4 mb-3"></hr>
                <div className="col-md-6 ">
                    <img className='img-fluid' src={aboutImgTwo} alt="" />
                </div>
                <div className="col-md-6 ">
                    <div className="mt-3 mt-md-0">
                        <h6 className='text-uppercase text-body-secondary fw-semibold'>WHO WE ARE</h6>
                        <h3 className='fw-medium text-uppercase'>Welcome to GoodWEB Solutions</h3>
                        <div className=' text-body-secondary mb-4'>
                            <p className="fs-4 fst-italic py-2">Quisque eget nisl id nulla sagittis auctor quis id. Aliquam quis vehicula enim, non aliquam risus. Sed a tellus quis mi rhoncus dignissim.</p>
                            <p> Integer rutrum ligula eu dignissim laoreet. Pellentesque venenatis nibh sed tellus faucibus bibendum. Sed fermentum est vitae rhoncus molestie. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed vitae rutrum neque. Ut id erat sit amet libero bibendum aliquam. Donec ac egestas libero, eu bibendum risus. Phasellus et congue justo. </p>
                        </div>
                        <Link to="/services" className="my-btn text-decoration-none" style={colorStyle}>Learn More</Link>
                        <hr className="border-top border-dashed"></hr>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;