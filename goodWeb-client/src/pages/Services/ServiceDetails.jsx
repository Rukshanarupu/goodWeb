// Import necessary components and styles
import React, { useState, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { baseUrl } from '../../Components/Config/Server';
import Loader from '../Shared/Loader';


const ServiceDetails = () => {
  const [singleService, setSingleService] = useState(null); // Initialize as null
  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    fetch(`${baseUrl}/service/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleService(data);
      })
      .catch((error) => console.error(error));
  }, []);
  // console.log(singleService);

  if (!singleService) {
    return <Loader/>;
  }
  const {service_title, service_text, services_offered}=singleService
  // console.log(service_title);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-9 col-md-10 col-sm-12 offset-md-2">
          <div className="card d-flex">
            <div className='d-flex justify-content-center'>
            <img
              src={`https://via.placeholder.com/800x400?text=${service_title}`}
              className="card-img-top " style={{height:"250px"}}
              alt="title"
            /> 
            </div>
            <div className="card-body">
              <h2 className="card-title">{service_title}</h2>
              <p className="card-text">{service_text}</p>
              <h4 className="mb-3">Services Offered:</h4>
              <div className='d-md-flex '>
              {services_offered?.map((service, index) => (
                <div
                  className={`service-offer card-body pt-0 ${index === 0 ? 'ps-md-0' : ''} ${
                    index === services_offered.length - 1 ? '' : 'border-end'
                  }`}
                  key={index}
                >
                  <h5 className="card-title">{service.service_offered_title}</h5>
                  {/* <ul className="card-text list-unstyled">
                    {service.service_offered_des?.map((offer, offerIndex) => (
                      <li className="" key={offerIndex}>{offer}</li>
                    ))}
                  </ul> */}
                  <p>{service.service_offered_des}</p>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;