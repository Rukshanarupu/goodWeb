import React, { useEffect, useState } from 'react';
import { FaCheckDouble, FaDownload, FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseUrl } from '../../../Components/Config/Server';

const ManageContact = () => {
  const contactLoader = useLoaderData();
  const [contactDetails, setContactDetails] = useState(contactLoader);
  console.log(contactDetails)
 
  const handleDeleteContact = (id) => {
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
        fetch(`${baseUrl}/deletedContact/${id}`, {
            method: 'DELETE',
        })
        .then((res) =>  res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount>0) {
            setContactDetails((prevContacts) =>
              prevContacts.filter((newContacts) => newContacts._id !== id)
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
      <div className='  row'>
        {contactDetails?.map(contact=>(
            <div className="col-md-6 col-sm-12">
            <div className='card bg-white mb-4'>
                <div class="card-body">
                    <h5 class="card-title"><span className='fw-bold'>Name:</span> <span>{contact.contact_name}</span></h5>
                    <h6 class="card-title"><span className='fw-bold'>Email:</span> <span>{contact.email}</span></h6>
                    <h6 class="card-title"><span className='fw-bold'>Number:</span> <span>{contact.number}</span></h6>
                    <h6 class="card-title"><span className='fw-bold'>Service:</span> <span>{contact.service_category}</span></h6>
                    <p class="card-text"><span className='fw-bold'>Message:</span> {contact.message}</p>
                    <div className='text-end'>
                    <button onClick={() => handleDeleteContact(contact._id)} class="btn btn-warning "><small>Delete</small></button>
                    </div>
                </div>
            </div>

            </div>
        ))}
      </div>
    </div>
  );
};

export default ManageContact;