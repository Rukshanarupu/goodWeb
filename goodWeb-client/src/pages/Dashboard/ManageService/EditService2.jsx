import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { baseUrl } from '../../../Components/Config/Server';
import Swal from 'sweetalert2';
import { IoCloseCircle } from "react-icons/io5";
import { imageUploadToken } from '../../../Components/Config/image';

const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;
const EditService = ({onClose, serviceInfo}) => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, reset } = useForm()
  console.log(serviceInfo)
  const [formData, setFormData] = useState({
    id: serviceInfo.id,
    service_title: serviceInfo.service_title,
    service_icon: serviceInfo.service_icon,
    service_text: serviceInfo.service_text,
    services_offered: serviceInfo.services_offered.map((service) => ({
      service_offered_title: service.service_offered_title,
      service_offered_des: service.service_offered_des,
    })),
  }); 
  console.log(formData)
  const addServiceField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      services_offered: [
        ...prevFormData.services_offered,
        { service_offered_title: '', service_offered_des: '' },
      ],
    }));
  };
  const removeServiceField = (index) => {
    setFormData((prevFormData) => {
      const updatedServices = [...prevFormData.services_offered];
      updatedServices.splice(index, 1);
      return {
        ...prevFormData,
        services_offered: updatedServices,
      };
    });
  };
  const handleServiceChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedServices = [...prevFormData.services_offered];
      updatedServices[index][field] = value;
      return {
        ...prevFormData,
        services_offered: updatedServices,
      };
    });
  }; 

  // ..................Upload photo..........................
  // console.log(imageHostingUrl)
  
  let imageUrl;
  const uploadImage = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        imageUrl = data.data.url;
        return imageUrl; // Return the imageUrl
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

  const id = event.target.id.value;
  const service_title = event.target.service_title.value;
  const service_icon = event.target.service_icon.value;
  const service_text = event.target.service_text.value;

  // Extract values from services_offered field if applicable
  const services_offered = event.target.services_offered.value;
  const service_offered_title = event.target.service_offered_title.value;
  const service_offered_des = event.target.service_offered_des.value;

  const updatedInfo = {
    id: id,
    service_icon: imageUrl || service_icon,
    service_title: service_title,
    service_text: service_text,
    services_offered: services_offered?.map((service) => ({
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

  return (
    <div className="rounded-3 m-md-5 p-4 border">
      <div className="mb-3 position-relative">
        <h2 className="fw-bold text-dark text-center">Update of Service Information</h2>
        <IoCloseCircle onClick={onClose} className='position-absolute left-0 top-0 d-flex fs-1' style={{cursor:"pointer"}}/>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className="row mb-3">
            <div className="col-md-6 col-sm-12">
              <label htmlFor="id" className="form-label">Title Id</label>
              <input type="number" name="id" defaultValue={serviceInfo?.id} className="form-control bg-info bg-opacity-10"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="service_icon" className="form-label">Service Icon</label>
              <input id="service_icon" name="image" defaultValue={serviceInfo?.service_icon} id='image'
              onChange={(e) => uploadImage(e)} type="file" class="form-control bg-info bg-opacity-10"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="service_title" className="form-label">Service Title</label>
              <input defaultValue={serviceInfo?.service_title} className="form-control bg-info bg-opacity-10"/>
            </div>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="service_text" className="form-label">Service Details</label>
              <textarea name="service_text" defaultValue={serviceInfo?.service_text} className="form-control bg-info bg-opacity-10"/>
            </div>
        </div>
        <div className='row mb-3'>
        {formData.services_offered?.map((service, index) => (
          <div key={index} className="mb-3 row">
            <div className='col-md-6 col-sm-12'>
              <label htmlFor={`service_offered_title_${index}`} className="form-label"> Offered Service Title</label>
              <input
                name={`services_offered[${index}].service_offered_title`}
                value={service?.service_offered_title}
                className="form-control bg-info bg-opacity-10"
                onChange={(e) => handleServiceChange(index, 'service_offered_title', e.target.value)}
              />
            </div>
            <div className='col-md-6 col-sm-12'>
              <label htmlFor={`service_offered_text_${index}`} className="form-label">Offered Service Description</label>
              <textarea
                name={`services_offered[${index}].service_offered_des`}
                value={service?.service_offered_des}
                className="form-control"
                onChange={(e) => handleServiceChange(index, 'service_offered_des', e.target.value)}
              />
            </div>
            <div>
              <button type="button" className="btn btn-warning mt-2" onClick={() => removeServiceField(index)}>Remove Service</button>
            </div>
          </div>
        ))}
          <div>
          <button type="button" className="btn btn-info" onClick={addServiceField}>Add Service</button>
          </div>
        </div>
        <div className='text-center'>
          <button type="submit" className="btn my-btn "> {loading ? 'Updating...' : 'Update'}</button>
        </div>
      </form>
    </div>
  );
};

export default EditService;