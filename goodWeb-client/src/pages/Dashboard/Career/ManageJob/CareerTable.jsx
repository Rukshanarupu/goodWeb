import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { baseUrl } from '../../../../Components/Config/Server';
import { Link, useLoaderData } from 'react-router-dom';

const CareerTable = () => {
    const careersDataLoader = useLoaderData()
    const [careersData, setCareersData] = useState(careersDataLoader)
    const [filterValue, setFilterValue] = useState('');
    const filteredRows = careersData.filter(
        (row) =>row.title && row.title.toLowerCase().includes(filterValue.toLowerCase())
    );
    console.log(careersData)

    const handleDeleteCareer = (id) => {
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
                fetch(`${baseUrl}/deletedCareer/${id}`, {
                    method: 'DELETE',
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.deletedCount>0) {
                        setCareersData((prevData) =>
                            prevData.filter((newData) => newData._id !== id)
                        ); 
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: `Account deleted Successfully`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                })
            }
        });
    };

    return (
        <div className='my-5'>
            <h3 className='text-info text-center'>Manage All Careers</h3>
            <div className="d-flex flex-column">
                <div className="d-flex flex-column flex-md-row gap-5 align-items-center" style={{ marginBottom: '16px' }}>
                    <h4>Search Here</h4>
                    <input className="border-2 px-4 py-2" type="text" placeholder="Search by name or email" value={filterValue} 
                    onChange={(e) => setFilterValue(e.target.value)}/>
                </div>
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Deadline</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Experience</th>
                                <th scope="col">Education</th>
                                <th scope="col text-center d-flex justify-content-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{fontSize:'13px'}}>
                            {filteredRows?.map((item, index) => (
                            <tr key={item.id}>
                                <td scope="row">{index+1}</td>
                                <td>{item.title}</td>
                                <td>{item.deadline}</td>
                                <td>{item.salary}</td>
                                <td>{item.experience}</td>
                                <td>{item.education}</td>
                                <td className=' text-center'>
                                    <Link className='border mb-1 text-decoration-none text-black px-2 bg-info' 
                                    to={`/dashboard/view-career-details/${item._id}`}>view</Link>
                                    <button className='border-0 rounded mt-1' onClick={() => handleDeleteCareer(item._id)}><MdDelete/></button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CareerTable;