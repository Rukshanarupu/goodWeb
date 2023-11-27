import React, { useState } from 'react';
import AddSuccess from './AddSuccess';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseUrl } from '../../../Components/Config/Server';
import { MdDelete } from 'react-icons/md';

const ManageSuccess = () => {
    const successData = useLoaderData()
    const [successVideos, setSuccessVideos] = useState(successData)
    console.log(successVideos)

    const handleDeleteVideo = (id) => {
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
                fetch(`${baseUrl}/deletedSuccessVideo/${id}`, {
                    method: 'DELETE',
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.deletedCount>0) { 
                        setSuccessVideos((prevVideos) =>
                            prevVideos.filter((videos) => videos._id !== id)
                        );                     
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Banner has been deleted.",
                            icon: "success"
                        });
                    }
                })
            }
        });
    };

    return (
        <div className='m-md-5'>
            <AddSuccess/>
            <div className='my-5'>
                <h3 className='text-info text-center mb-3'>Manage All Success</h3>
                <div className='row'>
                    {successVideos?.map((item, index) => (
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <div className='position-relative'>
                                <div className="mb-3 overflow-hidden">
                                    <iframe
                                    width="100%"
                                    height="250"
                                    src={item.video_url}
                                    frameBorder="0"
                                    allowFullScreen
                                    title={`Video ${index + 1}`}
                                    ></iframe>
                                </div>
                                <button className='border-0 position-absolute end-0 top-0 bg-warning' onClick={() => handleDeleteVideo(item._id)}><MdDelete /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageSuccess;