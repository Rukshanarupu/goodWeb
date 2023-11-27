import { Link, useParams } from 'react-router-dom';
import MainTitle from '../../Components/MainTitle';
import { useEffect, useState } from 'react';
import { FaMobileAlt, FaCloudSun } from 'react-icons/fa';
import { MdWeb } from 'react-icons/md';
import { GiBrain } from 'react-icons/gi';
import { AiOutlineSolution } from 'react-icons/ai';
import { baseUrl } from '../../Components/Config/Server';

const Services = () => {
  const [services, setServices]=useState() 
  useEffect(()=>{
    fetch(`${baseUrl}/services`)
    .then((res) => res.json())
    .then((data) => setServices(data))
    .catch((error) => console.error(error));
  },[])
  // console.log(services)
  const id=useParams().id
  // console.log(id)
  
  const focusedCardStyle= {
    backgroundColor: 'gray',
    // transform: 'scale(1.5)',
    transition: 'transform 0.3s ease-in-out',
    color:'white'
  }  
  return (
    <div className="my-5 my-font-family">
      <MainTitle heading="Our Services"
      paragraph="Our Service unlimited solutions to all your business needs. in the installation package we prepare search engine optimization, social media support, we provide corporate identity and graphic design services."
      />
      <div className="container">
        <div className="row">
          {services?.map((service_info, index) => (
            <div key={index} className={`col-lg-3 col-md-6 col-sm-12 mb-3`}>
              <div className={`service-card card h-100 text-start mb-5 shadow-lg ${id == service_info.id ? 'focused-card' : ''}`}  >
                <div className="d-flex justify-content-center mt-2">
                  <div className="px-2 fs-1 rounded-circle bg-warning">
                    {index === 0 ? (<MdWeb />) 
                    :index === 1 ? (<FaMobileAlt />) 
                    : index === 2 ? (< MdWeb/>) 
                    : index === 3 ? (<FaMobileAlt/>) 
                    : index === 4 ? (<GiBrain />)
                    : index === 5 ? (< FaCloudSun/>)
                    : (<AiOutlineSolution />)
                    }
                  </div>
                </div>
                <div className="card-body pb-0">
                  <h4 className={`card-title mb-2 fw-semibold text-center ${id == service_info.id ? 'focused-title' : ''}`}>{service_info.service_title}</h4>
                </div>
                <div className="mb-3 mt-1 text-center">
                  <Link to={`/service-details/${service_info._id}`} className={`service-btn py-2 px-3 text-decoration-none text-black ${id == service_info.id ? 'focused-btn' : ''}`}>Learn More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
