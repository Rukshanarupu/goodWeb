import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { baseUrl } from '../../../Components/Config/Server';
import Swal from 'sweetalert2';
import { imageUploadToken } from '../../../Components/Config/image';

const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;
const AddService = () => {
  const { handleSubmit, control, register } = useForm();

  const [formData, setFormData] = useState({
    id: '',
    service_title: '',
    service_icon:'',
    service_text: '',
    services_offered: [
      { service_offered_title: '', service_offered_des: [] },
    ],
  });
  console.log(formData);
  const addServiceField = () => {
    setFormData({
      ...formData,
      services_offered: [
        ...formData.services_offered,
        { service_offered_title: '', service_offered_des: [] },
      ],
    });
  };
  const removeServiceField = (index) => {
    const updatedServices = [...formData.services_offered];
    updatedServices.splice(index, 1);
    setFormData({
      ...formData,
      services_offered: updatedServices,
    });
  };
  

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
  //     if (data.success === true) {
  //       return data.data.url;
  //       // setFormData((prevFormData) => ({ ...prevFormData, service_icon: imageUrl }));
  //       // return imageUrl;
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
  const onSubmit = async (data, e) => {
    console.log(data);
    try {
      // const imageUrl = await uploadImage(data.service_icon);
      // const formData = {
      //   id: data.id,
      //   service_title: data.service_title,
      //   service_icon: imageUrl,
      //   service_text: data.service_text,
      //   services_offered: data.services_offered.map((service) => ({
      //     service_offered_title: service.service_offered_title,
      //     service_offered_des: service.service_offered_des || [],
      //   })),
      // };
      const res = await fetch(`${baseUrl}/addService`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const resData = await res.json();
      // console.log(resData);
      if (resData.acknowledged === true) {
        Swal.fire({
          title: 'Good job!',
          icon: 'success',
          text: 'Job added successfully',
        });
      } 
      else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add job. Please try again later.',
        });
      }
    } catch (error) {
      console.error('Error adding career:', error);
    }
  };

  return (
    <div>
      <div className="container py-2 rounded-3 border">
        <div className="">
          <h2 className="fw-bold text-info text-center">Add a Service</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3 row'>
            <div className="col-lg-4 col-sm-12 col-md-6">
              <label htmlFor="id" className="form-label fw-bold"><u>Service ID</u></label>
              <input
                type="text"
                className="form-control"
                id="id"
                {...register('id')}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              />
            </div>
            <div className="col-lg-4 col-sm-12 col-md-6">
              <label htmlFor="service_title" className="form-label fw-bold"><u>Service Title</u></label>
              <input
                type="text"
                className="form-control"
                id="service_title"
                {...register('service_title')}
                onChange={(e) => setFormData({ ...formData, service_title: e.target.value })}
              />
            </div>
            <div className="col-lg-4 col-sm-12 col-md-6">
              <label htmlFor="service_title" className="form-label fw-bold"><u>Service Icon Url</u></label>
              <input
                type="text"
                className="form-control"
                id="service_icon"
                {...register('service_icon')}
                onChange={(e) => setFormData({ ...formData, service_icon: e.target.value })}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4">
              <label htmlFor="service_text" className="form-label fw-bold">
                <u>Service Text</u>
              </label>
              <textarea
                className="form-control"
                id="service_text"
                {...register('service_text')}
                onChange={(e) => setFormData({ ...formData, service_text: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <div className="col-sm-12">
              <label className="form-label fw-bold me-1"><u>Services Offered</u></label>
              {formData.services_offered?.map((service, index) => (
                <div key={index} className="mb-2 row">
                  <div className='col-sm-12 col-md-6'>
                    <label htmlFor={`service_offered_title_${index}`} className="form-label">
                      Service Title
                    </label>
                    <input type="text" className="form-control" id={`service_offered_title_${index}`}
                      {...register(`services_offered[${index}].service_offered_title`)}
                      value={service.service_offered_title}
                      onChange={(e) => setFormData({ ...formData,
                        services_offered: [
                          ...formData.services_offered.slice(0, index),
                          { ...service, service_offered_title: e.target.value },
                          ...formData.services_offered.slice(index + 1),
                        ],
                      })}
                    />
                  </div>
                  <div className='col-sm-12 col-md-6'>
                    <label htmlFor={`service_offered_des_${index}`} className="form-label">
                      Service Description
                    </label>
                    <textarea type="text" className="form-control" value={service.service_offered_des}
                    id={`service_offered_des_${index}`}
                    {...register(`services_offered[${index}].service_offered_des`)}
                    onChange={(e) => setFormData({ ...formData,
                      services_offered: [
                        ...formData.services_offered.slice(0, index), { 
                          ...service, service_offered_des: e.target.value},
                        ...formData.services_offered.slice(index + 1),
                      ],
                    })}/>
                  </div>
                  <div>
                  <button type="button" className="btn btn-warning mt-2" onClick={() => removeServiceField(index)}>
                    Remove Service
                  </button>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-info " onClick={addServiceField}>
                Add Service
              </button>
            </div>
          </div>
          <div className='text-center'>
            <button type="submit" className="btn my-btn ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;