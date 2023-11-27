import React, { useState } from 'react';
import AddService from './AddService';
import { Link, useLoaderData } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { baseUrl } from '../../../Components/Config/Server';
import Swal from 'sweetalert2';

const ManageService = () => {
    const manageServiceLoader = useLoaderData();
    const [allServices, setAllServices] = useState(manageServiceLoader);
    console.log(allServices)
   
    const handleServiceDelete = (id) => {
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
          fetch(`${baseUrl}/deleteService/${id}`, {
              method: 'DELETE',
          })
          .then((res) =>  res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount>0) {
                setAllServices((prevServices) =>
                    prevServices.filter((newServices) => newServices._id !== id)
                ); 
                Swal.fire('Deleted!', 'Application deleted successfully!', 'success');
            }
          })
        }
      });
    };

    return (
        <div className='p-md-5'>
            <AddService/>
            <div>
                <h2 className='text-center mb-3'>Manage all Services</h2>
                <table class="table table-striped table-warning">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title Id</th>
                        <th scope="col">Service title</th>
                        {/* <th scope="col" className='text-center'>Service Icon</th> */}
                        <th scope="col" className='text-center'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allServices?.map((service, index) => (
                        <tr key={service._id} className='mb-2'>
                            <th scope="row">{index+1}</th>
                            <td>{service.id}</td>
                            <td>{service.service_title}</td>
                            {/* <td className='text-center'><img style={{width:"25px", height:"19px"}} src={service.service_icon} alt="" /></td> */}
                            <td className='text-center d-flex align-items-center justify-content-center gap-3'>
                                <Link to={`/dashboard/manage-service-details/${service._id}`} className='text-info fs-5'>
                                    <button className='bg-info border-0 d-flex '><small style={{fontSize:"12px"}}>Details</small></button>
                                </Link>
                                <button className='me-1 p-1 bg-warning text-dark border-0 d-flex'><MdDelete onClick={() => handleServiceDelete(service._id)} className=''/></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageService;