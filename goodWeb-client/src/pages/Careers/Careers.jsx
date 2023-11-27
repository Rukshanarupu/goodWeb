import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import PageBanner from '../../Components/PageBanner/PageBanner';
import MainTitle from '../../Components/MainTitle';

const Careers = () => {
  const jobListings = useLoaderData();
  // console.log(jobListings)
  return (
    <div>
      <div className="text-center mb-4 ">
        <PageBanner title="Career" subTitle="Career" />
        <div className='mt-5'>
        <MainTitle heading="Explore Career Opportunities"
        paragraph="Welcome to our dynamic team at Good web solution. We're on a
        mission to technological services, and we're"
        secondPara="looking for talented individuals like you to join us."/>
        </div>
      </div>
      <div className="container py-5">
        <div className="row">
          {jobListings?.map((job, index) => (
            <div key={index} className="col-md-6 col-lg-4 col-sm-12">
              <Link  to={`/job-opening-details/${job._id}`} job={job}
              className='text-decoration-none text-black'>
              <div className="jobList-card bg-white rounded-3 shadow p-4 mb-4">
                <h5 className="fw-bold text-warning">{job.title}</h5>
                <p className="mb-1"><span className='fw-semibold'>Education:</span> <span style={{fontSize:"13px"}}>{job.education}</span></p>
                <p className="mb-1"><span className='fw-semibold'>Experience :</span> <span style={{fontSize:"13px"}}>{job.experience}</span></p>
                <p className="mb-1"><span className='fw-semibold'>Employment Type:</span> <span style={{fontSize:"13px"}}>{job.employment_type}</span></p>
                <p className="mb-1"><span className='fw-semibold'>Deadline:</span> <span style={{fontSize:"13px"}}>{job.deadline}</span></p>
                <div className="mt-4">
                  <Link to={`/job-opening-details/${job._id}`}>
                    <button className="my-btn" style={{padding:"8px 18px"}}>
                      See details
                    </button>
                  </Link>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Careers;
