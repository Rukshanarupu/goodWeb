
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from './Config/Server';
import Loader from '../pages/Shared/Loader';

const JobDetails = () => {
    const [jobDetails, setJobDetails] = useState(null);
    const { id } = useParams();
    // console.log(id);
    useEffect(() => {
      fetch(`${baseUrl}/careers/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setJobDetails(data);
        })
        .catch((error) => console.error(error));
    }, [id]);
    console.log(jobDetails);
  
    if (!jobDetails) {
      return <Loader/>;
    }
    const {title, about_position, education, vacancy, department, responsibility, job_req, employment_type, workplace_type, salary, experience, deadline, instructions, benefit, _id}=jobDetails
  
    return (
        <div className="row">
          <div className="col-lg-9 col-md-8 col-sm-12">
            <div className="text-secondary">
              <h1 className='display-6 fw-bold text-black'>{title}</h1>
              <p>{about_position}</p>
              {responsibility?
              <div className='my-2'>
                <h4 className='text-dark'>Key Responsibilities</h4>
                <ul className=''>
                  {/* {responsibility.map(()=>())} */}
                  {responsibility?.map((res, index) => (
                    <li className="" key={index}>{res?.text}</li>
                  ))}
                </ul>
              </div>:''}
              {job_req?
              <div className='my-2'>
                <h4 className='text-dark'>Skills, Knowledge and Expertise</h4>
                <ul className=''>
                  {job_req?.map((req, index) => (
                    <li className="" key={index}>{req?.text}</li>
                  ))}
                </ul>
              </div>:''}
              
              {education?
                <div className='my-2'>
                  <h4 className='text-dark'>Educational Requirements</h4>
                  <ul className=''>
                    <li className="">{education}</li>
                  </ul>
                </div>:''
              }
              {experience?
                <div className='my-2'>
                  <h4 className='text-dark'>Experience Requirements</h4>
                  <ul className=''>
                    <li className="">{experience}</li>
                  </ul>
                </div>:''
              }
              {benefit?
              <div className='my-2'>
                <h4 className='text-dark'>Others benefits</h4>
                <ul className=''>
                  {benefit?.map((res, index) => (
                    <li className="" key={index}>{res.text}</li>
                  ))}
                </ul>
              </div>:''}
              {instructions?
                <div className='my-2'>
                  <h4 className='text-dark'>Job Apply Instructions</h4>
                  <ul className=''>
                      <li className="">{instructions}</li>
                  </ul>
                </div>:''
              }
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-12">
            <div className="rounded p-3 pe-1" style={{backgroundColor:"#d3f0f4"}}>
              <div className='my-3'>
                <h6 className='text-dark mb-1 fw-bold'>Application Deadline</h6>
                <p style={{fontSize:"14px"}}>{deadline}</p>
              </div>
              {employment_type?
              <div className='my-3'>
                <h6 className='text-dark mb-1 fw-bold'>Employment Type</h6>
                <p style={{fontSize:"14px"}}>{employment_type}</p>
              </div>:''}
              {workplace_type?
              <div className='my-3'>
                <h6 className='text-dark mb-1 fw-bold'>Workplace Type</h6>
                <p style={{fontSize:"14px"}}>{workplace_type}</p>
              </div>:''}
              {salary?
              <div className='my-3'>
                <h6 className='text-dark mb-1 fw-bold'>Compensation</h6>
                <p style={{fontSize:"14px"}}>{salary} taka</p>
              </div>:''}
              {vacancy?
              <div className='my-3'>
                <h6 className='text-dark mb-1 fw-bold'>Vacancy</h6>
                <p style={{fontSize:"14px"}}>{vacancy}</p>
              </div>:''}
              {department?
              <div className='my-3'>
                <h6 className='text-dark mb-1 fw-bold'>Department</h6>
                <p style={{fontSize:"14px"}}>{department}</p>
              </div>:''}
              
            </div>
          </div>
        </div>
    );
};

export default JobDetails;