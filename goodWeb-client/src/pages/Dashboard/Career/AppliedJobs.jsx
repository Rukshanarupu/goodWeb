import React, { useEffect, useState } from 'react';
import { FaCheckDouble, FaDownload, FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseUrl } from '../../../Components/Config/Server';

const AppliedJobs = () => {
  const appliedJobLoader = useLoaderData();
  const [appliedJobList, setAppliedJobList] = useState(appliedJobLoader);
  // fullName: '',
  //       email: '',
  //       number: '',
  //       dateOfBirth: '',
  //       position: title,
  //       workingExperiences: '',
  //       resume: '',
  //       coverLetter: '',
 
  const handleDelete = (id) => {
    console.log(id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
    .then((result) => {
      if (result.isConfirmed) {
        fetch(`${baseUrl}/deleteAppliedJob/${id}`, {
            method: 'DELETE',
        })
        .then((res) =>  res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount>0) {
            setAppliedJobList((prevJobs) =>
              prevJobs.filter((job) => job._id !== id)
            ); 
            Swal.fire('Deleted!', 'Application deleted successfully!', 'success');
          }
        })
      }
    });
  };

  return (
    <div className='bg-light p-md-5'>
      <h2 className='text-center mb-3'>Manage all Applied Jobs</h2>
      <table class="table table-striped table-hover table-info">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Applicant Name</th>
            <th scope="col">Email</th>
            <th scope="col">Position</th>
            <th scope="col">Working Experience</th>
            <th scope="col">Number</th>
            <th scope="col" className='text-center'>Resume</th>
            <th scope="col" className='text-center'>Action</th>
          </tr>
        </thead>
         <tbody>
          {appliedJobList?.map((appliedJob, index) => (
            <AppliedJob
            key={appliedJob._id}
            index={index}
            appliedJob={appliedJob}
            handleDelete={handleDelete}
            ></AppliedJob>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AppliedJob =({appliedJob, index, handleDelete})=>{
  const {_id, fullName, email, position, workingExperiences, resume, number}=appliedJob
  const handleResumeDownload = () => {
    const fileUrl = appliedJob.resume;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'filename.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return(
    <>
      <tr key={_id}>
        <th scope="row">{index+1}</th>
        <td>{fullName}</td>
        <td>{email}</td>
        <td>{position}</td>
        <td>{workingExperiences}</td>
        <td>{number}</td>
        <td className='text-center'>
          <Link to={resume} className='text-info fs-5' target="_blank" rel="noopener noreferrer">
            <FaEye />
          </Link>
          <a onClick={handleResumeDownload} className='btn text-warning fs-5'>
            <FaDownload className=''/>
          </a>
        </td>
        <td className='text-center fs-3'>
            <MdDelete onClick={() => handleDelete(_id)} className='me-1 p-1 bg-warning text-dark'/>
            {/* <a href=""><FaCheckDouble className='fs-4 bg-white p-1 text-dark'/></a> */}
        </td>
      </tr>
    </>
  )
}

export default AppliedJobs;