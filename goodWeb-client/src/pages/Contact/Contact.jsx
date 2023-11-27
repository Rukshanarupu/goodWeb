import PageBanner from "../../Components/PageBanner/PageBanner";
import MainTitle from "../../Components/MainTitle";
import 'react-tabs/style/react-tabs.css';
import { FaHeadphones, FaEnvelope } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useEffect, useState } from "react";
import { baseUrl } from "../../Components/Config/Server";
import Swal from "sweetalert2";

const Contact = () => {
  const { handleSubmit, register, control, watch, formState: { errors } } = useForm({
    defaultValues: {country: { value: '+880', label: 'Bangladesh (+880)' }},
  });
  const [countryOptions, setCountryOptions] = useState();
  useEffect(() => {
      fetch(`${baseUrl}/countryCodeOptions`)
      .then((res) => res.json())
      .then((data) => setCountryOptions(data));
  }, []);
  // console.log(countryOptions)
  
  const [services, setServices] = useState();
  useEffect(() => {
      fetch(`${baseUrl}/services`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  // console.log(services)
  
  const onSubmit = async (data) => {
    const added_info = { 
      contact_name: data.contact_name,
      email: data.email,
      number: data.number,
      service_category: data.service_category,
      message: data.details,
    };
    fetch(`${baseUrl}/addContact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',},
      body: JSON.stringify(added_info),
    })
    .then((res) => res.json())
    .then((data) => {
      // console.log('Response from MongoDB:', data);
        if (data.acknowledged === true) {
          Swal.fire({
            title: 'Success!',
            text: 'Contact details send successfully!!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        }
    })
  }

  return (
    <div>
      <PageBanner subTitle="Contact" title="Contact"/>
      <div className="container mt-5">
        <MainTitle heading="Get in touch"
          secondPara="Let's see what others say about GoodWEB Solutions website template!"
          paragraph="Some of our awesome completed projects in below."/>
      </div>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-center align-content-center ">
            <form  onSubmit={handleSubmit(onSubmit)} className="col-md-6 p-5 bg-light shadow">
              <div className="mb-4">
                <Controller name="contact_name" control={control} render={({ field }) => (
                  <input type="text" {...field} className="form-control py-2" placeholder='Enter name' id="formGroupExampleInput"/>
                )}/>
              </div>
              <div className="mb-4">
                <Controller name="email" control={control} rules={{ required: 'Email is required' }} 
                render={({ field }) => (
                  <>
                    <input type="email" {...field} placeholder='Enter Your Email' id="formGroupExampleInput"
                      className={`form-control py-2 ${errors.email ? 'is-invalid' : ''}`}/>
                    {errors.last_name && (
                      <div className="invalid-feedback">{errors.last_name.message}</div>
                    )}
                  </>
                )}/>
              </div>
              <div className="mb-4">
                  <Controller name="country" control={control}
                  render={({ field }) => (
                      <Select {...field} options={countryOptions} placeholder="Select a country"/>
                  )}/>
              </div>
              <div className="mb-4">
                <div className="input-group">
                  <div className="input-group-prepend bg-white d-flex align-items-center rounded-start border px-2">
                    <span className="">{watch('country')?.value}</span>
                  </div>
                  <Controller name="number" control={control}
                  render={({ field }) => (
                    <input type="tel" className="form-control py-2" {...field} placeholder="Enter your phone number" id="exampleInputNumber1"/>
                  )}/>
                </div>
              </div>
              <div className="mb-4">
                <select {...register("service_category")} className="form-select py-2" aria-label="Default select example">
                  <option selected>What Service you need</option>
                  {services?.map((service, index) => (
                    // console.log(service)
                    <option key={index} value={service.service_title}>{service.service_title}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <Controller name="details" control={control} render={({ field }) => (
                  <textarea type="text" {...field} className="form-control py-2" placeholder='Give us more details..' id="floatingTextarea2" style={{"height": "150px"}}/>
                )}/>
              </div>
              <div className="text-center">
                <button type="submit" className="btn my-btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-sm-12 col-md-4">
            <div className="shadow p-3">
              <ImLocation className="fs-2 mb-3"/>
              <h3 className="text-warning fsw-bold">Headquarters</h3>
              <p className="m-0">PO Box 16122 Collins Street West</p>
              <p> Victoria 8007 Australia</p>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="shadow p-3">
              <FaEnvelope className="fs-2 mb-3"/>
              <h3 className="text-warning fsw-bold">Email Us</h3>
              <p className="m-0">info@yoursite.com</p>
              <p>info@yoursite.com</p>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="shadow p-3">
              <FaHeadphones className="fs-2 mb-3"/>
              <h3 className="text-warning fsw-bold">Call Us</h3>
              <p className="m-0">+61 3 8376 6284</p>
              <p>+61 3 8376 6185</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
