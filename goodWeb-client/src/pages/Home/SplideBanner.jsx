import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import Loader from '../Shared/Loader';
import { baseUrl } from '../../Components/Config/Server';
import { Link } from 'react-router-dom';

const SplideBanner = () => {
  const [slides, setSlides]=useState()
  useEffect(()=>{
    fetch(`${baseUrl}/banners`)
    .then((res) => res.json())
    .then((data) => setSlides(data))
    .catch((error) => console.error(error));
  },[])
  console.log(slides)

  if (!slides) {
    return <Loader/>;
  }

  const options = {
    type         : 'loop',
    gap          : '1rem',
    autoplay     : true,
    pauseOnHover : false,
    resetProgress: false,
    // height       : '500px',
  };

  return (
    <div className="wrapper">
      <Splide
        options={ options }
        aria-labelledby="autoplay-example-heading"
        hasTrack={ false }
      className=''
      >
        <div style={ { position: 'relative' } }>
          <SplideTrack>
            { slides?.map( (slide, index) => (
              <SplideSlide key={slide._id} className='overlay-container' 
              // style={{ backgroundImage: `url(${slide.banner_img})` }}
              >
              <img className='w-100' src={ slide.banner_img } alt={index}
              style={{height:"600px"}}/>
              {/* <div className="container" style={{"height": "100%"}}>
                <div className="row d-flex justify-content-center align-items-center " style={{"height": "100%"}}>
                  <div className="col-lg-8 col-md-10 col-sm-12"> 
                    <div className="banner-content ">              
                      <div className='text-white'>
                        <h2>{slide?.heading}</h2>
                        <p style={{fontSize: "17px"}} className=''>{slide?.subheading}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              </SplideSlide>
              
            ))}
          </SplideTrack>
        </div>
        <div className="splide__progress">
          <div className="splide__progress__bar" />
        </div>
        <button className="splide__toggle border-0 bg-info position-absolute bottom-0 left-0">
          <span className="splide__toggle__play text-warning"><FaPlayCircle/></span>
          <span className="splide__toggle__pause text-warning"><FaPauseCircle /></span>
        </button>
      </Splide>
    </div>
  );
};

export default SplideBanner;