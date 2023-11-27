import React, { useState } from 'react';
import AddBanner from './AddBanner';
import { useLoaderData } from 'react-router-dom';
import { MdDelete, MdDownloadForOffline } from 'react-icons/md';
import Swal from 'sweetalert2';
import { baseUrl } from '../../../Components/Config/Server';

const ManageBanner = () => {
    const bannerData = useLoaderData()
    const [banners, setBanners] = useState(bannerData)

    console.log(bannerData)

    const handleDeleteBanner = (id) => {
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
                fetch(`${baseUrl}/deletedBanner/${id}`, {
                    method: 'DELETE',
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.deletedCount>0) { 
                        setBanners((prevBanners) =>
                            prevBanners.filter((banner) => banner._id !== id)
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
            <AddBanner/>
            <div className='my-5'>
                <h3 className='text-info text-center mb-3'>Manage All Banners</h3>
                <div className='row'>
                    {/* {filteredRows?.map((item, index) => ())} */}
                    {banners?.map((item) => (
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <div className='position-relative'>
                                <div className='mb-3'>
                                    <img className='w-100' src={item.banner_img} alt="" />
                                </div>
                                <button className='border-0 position-absolute end-0 top-0 bg-info text-warning' onClick={() => handleDeleteBanner(item._id)}><MdDelete /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageBanner;