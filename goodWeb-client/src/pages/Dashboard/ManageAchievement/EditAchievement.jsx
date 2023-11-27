import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { baseUrl } from '../../../Components/Config/Server';
import Swal from 'sweetalert2';
import { IoCloseCircle } from "react-icons/io5";
import { imageUploadToken } from '../../../Components/Config/image';

const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;
const EditAchievement = ({onClose, achievement}) => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors }, reset } = useForm()
  // console.log(achievement)

  // ..................Upload photo..........................
  // console.log(imageHostingUrl)
  let imageUrl;
  const uploadImage = async (e) => {
    try {
      const image = e?.target?.files?.[0];
      console.log(image)
      // if (!image) {
      //   return null;
      // }
      const formData = new FormData();
      formData.append("image", image);
      const res = await fetch(imageHostingUrl, { method: "POST", body: formData});
      const data = await res.json();
      console.log(data)
      if (data.success==true) {
        imageUrl= data.data.url;
        console.log(imageUrl)
        return imageUrl
      } 
      else {
        throw new Error("Image upload failed");
      }
    } 
    catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    // console.log(data)
    setLoading(true);
    try {           
        const updatedInfo = {
          icon: imageUrl ? imageUrl: achievement?.icon, 
          title: data.title,
          count: data.count,
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
            fetch(`${baseUrl}/updateAchievements/${achievement?._id}`, {
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
    <div className="rounded-3 mb-3 p-4 shadow">
      <div className="mb-3 position-relative">
        <h2 className="fw-bold text-dark text-center">Update of Achievement Information</h2>
        <IoCloseCircle onClick={onClose} className='position-absolute left-0 top-0 d-flex fs-1' style={{cursor:"pointer"}}/>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-3 mb-5">
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className='d-flex align-items-center justify-content-between'>
                <img className='d-lg-none d-md-block d-sm-block' src={achievement.icon} alt="" />
                <div>
                  <label htmlFor="icon" className="form-label">Upload Icon</label>
                  <Controller name="icon" control={control}
                  render={({ field }) => (
                    <input className="form-control" type="file"
                    onChange={(e) => {field.onChange(e); uploadImage(e);}}/>
                  )}/>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label htmlFor="count" className="form-label">Counter Number</label>
              {achievement  && (
                <Controller name="count" control={control} defaultValue={achievement?.count}
                render={({ field }) => <input {...field} className="form-control"/>}/>
              )}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label htmlFor="title" className="form-label">Title</label>
              {achievement  && (
                <Controller name="title" control={control} defaultValue={achievement?.title}
                render={({ field }) => <input {...field} className="form-control"/>}/>
              )}
            </div>
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

export default EditAchievement;