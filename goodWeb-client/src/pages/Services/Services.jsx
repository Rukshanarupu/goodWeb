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
                  <div className="px-2 fs-1 rounded-circle bg-warning service-icon">
                  {index === 0 ? <MdWeb /> :index === 1 ? <GiBrain /> :index === 2 ? <FaCloudSun /> :index === 3 ? <FaMobileAlt /> : index === 4 ? <img src="https://i.ibb.co/fktLnTM/solution.png" alt=""/>: index === 5 ? <img src="https://i.ibb.co/wdrNFKx/app-development.png" alt="" /> :index === 6 ? <img src="https://i.ibb.co/X4X4kc1/coding-1.png" alt="" /> :index === 7 ? <img src="https://i.ibb.co/vxsBFqJ/solutions.png" alt="" /> :index === 8 ? <img src="https://i.ibb.co/t2KDvkk/brainstorm.png" alt="" /> :index === 9 ? <img src="https://i.ibb.co/ZHPs7jQ/css.png" alt="" /> : index === 10 ? <img src="https://i.ibb.co/DYF1mRD/digital-services.png" alt="" />: index === 11 ? <img src="https://i.ibb.co/NCqhBSz/clear-sky.png" alt="" /> : index === 11 ? <img src="https://i.ibb.co/xspGQzc/coding.png" alt="" />:<AiOutlineSolution />}</div>
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
