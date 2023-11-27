import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { baseUrl } from '../../../Components/Config/Server';
import Swal from 'sweetalert2';
import { IoCloseCircle } from "react-icons/io5";
import { imageUploadToken } from '../../../Components/Config/image';

const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;

const EditService = ({onClose, serviceInfo}) => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors }, reset } = useForm()
  console.log(serviceInfo)

  // ..................Upload photo..........................
  // console.log(imageHostingUrl)
  // let imageUrl;
  // const uploadImage = async (e) => {
  //   try {
  //     const image = e?.target?.files?.[0];
  //     console.log(image)
  //     // if (!image) {
  //     //   return null;
  //     // }
  //     const formData = new FormData();
  //     formData.append("image", image);
  //     const res = await fetch(imageHostingUrl, { method: "POST", body: formData});
  //     const data = await res.json();
  //     console.log(data)
  //     if (data.success==true) {
  //       imageUrl= data.data.url;
  //       console.log(imageUrl)
  //       return imageUrl
  //     } 
  //     else {
  //       throw new Error("Image upload failed");
  //     }
  //   } 
  //   catch (error) {
  //     console.error("Image upload error:", error);
  //     throw error;
  //   }
  // };

  const onSubmit = async (data) => {
    // console.log(data)
    setLoading(true);
    try {           
        const updatedInfo = {
            id: data.id,
            service_icon: data.service_icon,
            service_title: data.service_title,
            service_text: data.service_text,
            services_offered: data?.services_offered?.map((service) => ({
              service_offered_title: service?.service_offered_title,
              service_offered_des: service?.service_offered_des,
            })),
        };
        Swal.fire({
          title: "Are you sure for Update?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0dcaf0",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Update it!",
        })
        .then((result) => {
          // console.log(result)
          if (result.isConfirmed==true) {
            fetch(`${baseUrl}/updateService/${serviceInfo?._id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json"},
              body: JSON.stringify(updatedInfo),
            })
              // console.log(updatedInfo)
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              if (data.message === 'Information updated successfully') {
                setLoading(false);
                // e.target.reset();
                Swal.fire(
                  'Good job!',
                  'Your Style updated successfully',
                  'success'
                )
                onClose();
              }
            })
              .catch((err) => {
                  console.log(err);
              });
          }
        });
    } 
    catch (error) {
        console.error("Error during form submission:", error);
    }
  
  }

  return (
    <div className="rounded-3 m-md-5 p-4 border">
      <div className="mb-3 position-relative">
        <h2 className="fw-bold text-dark text-center">Update of Service Information</h2>
        <IoCloseCircle onClick={onClose} className='position-absolute left-0 top-0 d-flex fs-1' style={{cursor:"pointer"}}/>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-3 mb-3">
            <div className="col-md-4 col-sm-12">
              <label htmlFor="id" className="form-label">Title Id</label>
              {serviceInfo && (
                <Controller name="id" control={control} defaultValue={serviceInfo?.id}
                render={({ field }) => <input type="text" {...field} className="form-control bg-info bg-opacity-10"/>}/>
              )}
            </div>
            {/* <div className="col-md-6 col-sm-12">
                <label htmlFor="service_icon" className="form-label">Service Icon Url</label>
                <Controller name="service_icon" control={control} value={serviceInfo?.service_icon}
                render={({ field }) => <input type="text" {...field} className="form-control bg-info bg-opacity-10"
                // onChange={(e) => {field.onChange(e); uploadImage(e);}}
                />}/>
            </div> */}
            <div className="col-md-4 col-sm-12">
              <label htmlFor="service_title" className="form-label">Service Title</label>
              {serviceInfo && (
                <Controller name="service_title" control={control} defaultValue={serviceInfo?.service_title}
                render={({ field }) => <input {...field} className="form-control bg-info bg-opacity-10"/>}/>
              )}
            </div>
            <div className="col-md-4 col-sm-12">
              <label htmlFor="service_text" className="form-label">Service Details</label>
              {serviceInfo && (
                <Controller name="service_text" control={control} defaultValue={serviceInfo?.service_text}
                render={({ field }) => <textarea {...field} className="form-control bg-info bg-opacity-10"/>}/>
              )}
            </div>
        </div>
        <div className='row mb-3'>
          {serviceInfo.services_offered?.map((service, index) => (
            // console.log(service)
            <div key={index} className="mb-3 col-md-6 col-sm-12">
              <div>
                <label htmlFor={`service_offered_title_${index}`} className="form-label"> Offered Service Title</label>
                <Controller
                  name={`services_offered[${index}].service_offered_title`}
                  control={control}
                  defaultValue={service?.service_offered_title}
                  render={({ field }) => <input {...field} className="form-control bg-info bg-opacity-10" />}
                />
              </div>
              <div className='mb-1 col-sm-12 col-md-6'>
                <label htmlFor={`service_offered_text_${index}`} className="form-label">
                  Offered Service Description
                </label>
                <Controller
                  name={`services_offered[${index}].service_offered_des`}
                  control={control}
                  defaultValue={service?.service_offered_des}
                  render={({ field }) => <textarea type="text" {...field} className="form-control" />}
                />
              </div>
            </div>
          ))}
        </div>
        <div className='text-center'>
            <button type="submit" className="btn my-btn ">
              {loading ? 'Updating...' : 'Update'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default EditService;