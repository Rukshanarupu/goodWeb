import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { baseUrl } from '../../Components/Config/Server';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { useParams } from 'react-router-dom';

const JobApply = () => {
    const { handleSubmit, control, watch } = useForm({
        defaultValues: {
            country: { value: '+880', label: 'Bangladesh (+880)' },
        },
    });
    const { id, title } = useParams();
    // console.log(decodeURIComponent(title));
    const [countryOptions, setCountryOptions] = useState();
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        fetch(`${baseUrl}/countryCodeOptions`)
        .then((res) => res.json())
        .then((data) => setCountryOptions(data));
    }, []);
    // console.log(countryOptions)
    const [resumeFile, setResumeFile] = useState(false);
    console.log(resumeFile.name)

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        number: '',
        dateOfBirth: '',
        position: title,
        workingExperiences: '',
        resume: '',
    });
    console.log(formData)

    const onSubmit = async (data) => {
        // e.preventDefault();
        console.log(data)
        // const formData = new FormData();
        // formData.append('file', resumeFile);
        // // Append other form data
        // Object.entries(data).forEach(([key, value]) => {
        //     formData.append(key, value);
        // });
        // console.log(formData)
        const added_info = { 
            fullName: data.fullName,
            email: data.email,
            number: data.number,
            position: data.position,
            dateOfBirth: data.dateOfBirth,
            resume: data.resume,
            workingExperiences: data.workingExperiences,
        };
        console.log(added_info)
        fetch(`${baseUrl}/appliedJobs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',},
          body: JSON.stringify(added_info),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('Response from MongoDB:', data);
            if (data.acknowledged === true) {
                setFormData(added_info)
                Swal.fire({
                    title: 'Success!',
                    text: 'Job Posted successfully!!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
            setSubmitted(true);
        })
    }

    return (
        <div className='bg-light'>
        <div className="container mb-5 mt-3">
            <div className="row d-flex justify-content-center">
                <form onSubmit={handleSubmit(onSubmit)} id="formElem" enctype="multipart/form-data">
                    <div className="row">
                        <div className='col-md-6 col-sm-12'>
                            <div className='bg-white p-3 m-3 rounded'>
                                <h3 className="fw-bold text-warning mb-3">1. Personal Details</h3>
                                {/* <p className='mb-4 '>We'll need these details in order to be able to contact you.</p> */}
                                <div className="mb-4">
                                    <label className="form-label mb-1 fw-bold">Full Name</label>
                                    <Controller name="fullName" control={control}
                                    render={({ field }) => (
                                        <input type="text" {...field} className="form-control" placeholder='Your Name'/>
                                    )}/>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label mb-1 fw-bold">Email Address</label>
                                    <Controller name="email" control={control}
                                    render={({ field }) => (
                                        <input type="email" className="form-control" {...field} placeholder='email@address.com'/>
                                    )}/>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label mb-1 fw-bold">Country</label>
                                    <Controller name="country" control={control}
                                    render={({ field }) => (
                                        <Select {...field} options={countryOptions} placeholder="Select a country"/>
                                    )}/>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label mb-1 fw-bold">Number</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend bg-white d-flex align-items-center rounded-start border px-2">
                                            <span className="">{watch('country')?.value}</span>
                                        </div>
                                        <Controller name="number" control={control}
                                        render={({ field }) => (
                                            <input type="tel" className="form-control" {...field} placeholder="Enter your phone number" />
                                        )}/>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label mb-1 fw-bold">Date of Birth</label>
                                    <Controller name="dateOfBirth" control={control}
                                    render={({ field }) => (
                                        <input type="date" {...field} className="form-control" />
                                    )}/>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                            <div className='bg-white p-3 m-3 rounded'>
                                <h3 className="fw-bold text-warning mb-3">2. Profile</h3>
                                <div className="mb-4">
                                    <label className="form-label mb-1 fw-bold">Position</label>
                                    <Controller name="position" control={control} defaultValue={title} 
                                    render={({ field }) => (
                                        <input type="text" {...field} className="form-control" placeholder='Position' />
                                    )}/>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label mb-1 fw-bold">Working Experiences</label>
                                    <Controller name="workingExperiences" control={control}
                                    render={({ field }) => (
                                        <input type="text" {...field} className="form-control" placeholder='Experience'/>
                                    )}/>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label mb-1"><span className=' fw-bold'>Resume/ CV </span><br /><small>Accepted file formats are .pdf and .docx</small></label>
                                    <Controller name="resume" control={control}
                                    render={({ field }) => (
                                        <input name="resume" type="file" {...field} onChange={(e)=>setResumeFile(e.target.files[0])} className="form-control" accept=".pdf, .doc, .docx"/>
                                    )}/>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="my-btn">Submit</button>
                        </div>
                    </div>
                </form>
                {submitted && (
                    <div className="mt-4 text-success">
                        Form submitted successfully!
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default JobApply;
