import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { baseUrl } from '../../../../Components/Config/Server';
import Swal from 'sweetalert2';

const AddACareer = () => {
  const { handleSubmit, control, register } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const { fields, append, remove } = useFieldArray({ control, name: 'about_position', name: 'benefits'});  
  const [responsibilities, setResponsibilities] = useState(Array.from({ length: 1 }, (_, index) => ({ id: index, text: '' })));
  const [jobRequirements, setJobRequirements] = useState(Array.from({ length: 1 }, (_, index) => ({ id: index, text: '' })));

  const [formData, setFormData] = useState({ title: '', about_position:'', department:'', responsibility:'', job_req:'', employment_type:'', workplace_type:'', deadline:'', vacancy: '', salary: '', experience: '', instructions: '', education: '', benefit: '', });
  // console.log(formData)  

  const onSubmit = async (data) => {
    console.log(data) 
    try {
      const res = await fetch(`${baseUrl}/postAJob`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      console.log(resData)  
      if (resData.acknowledged== true) {
        Swal.fire({ title: "Good job!", icon: "success",
          text: "Job added successfully"
        });
      } 
      else {
        Swal.fire({ icon: 'error', title: 'Error',
          text: 'Failed to add job. Please try again later.',
        });
      }
    } 
    catch (error) {
      console.error('Error adding career:', error);
    }
  };

  return (
    <div className=''>
      <h2 className="fw-bold text-info text-center">Add of Job</h2>
      <div className="container py-3 border-2 rounded-3 shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {/* Position, Education and Deadline */}
          <div className="mb-2 row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label className="form-label fw-bold">Position Title</label>
              <Controller name="title" control={control}
              render={({ field }) => (
                <input type="text" {...field} className="form-control"/>
              )}/>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label className="form-label fw-bold">Education</label>
              <Controller name="education" control={control}
              render={({ field }) => (
                <input type="text" {...field} className="form-control"/>
              )}/>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label className="form-label fw-bold">Deadline</label>
              <Controller name="deadline" control={control}
              render={({ field }) => (
                <input type="date" {...field} className="form-control"/>
              )}/>
            </div>
          </div>
          {/* Employment Type, Salary and Experience */}
          <div className="mb-2 row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label className="form-label fw-bold">Salary</label>
              <Controller name="salary" control={control}
              render={({ field }) => (
                <input type="number" {...field} className="form-control"/>
              )}/>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label className="form-label fw-bold">Employment Type</label>
              <Controller name="employment_type" control={control}
              render={({ field }) => (
                <input type="text" {...field} className="form-control"/>
              )}/>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label className="form-label fw-bold">Experience</label>
              <Controller name="experience" control={control}
              render={({ field }) => (
                <input type="text" {...field} className="form-control"/>
              )}/>
            </div>
          </div>
          {/* Workplace Type, Department and Vacancy*/}
          <div className="mb-2 row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label className="form-label fw-bold">Workplace Type</label>
              <Controller name="workplace_type" control={control}
              render={({ field }) => (
                <input type="text" {...field} className="form-control"/>
              )}/>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label className="form-label fw-bold">Vacancy</label>
              <Controller name="vacancy" control={control}
              render={({ field }) => (
                <input type="text" {...field} className="form-control"/>
              )}/>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label className="form-label fw-bold">Department</label>
              <Controller name="department" control={control}
              render={({ field }) => (
                <input type="text" {...field} className="form-control"/>
              )}/>
            </div>
          </div>
          {/* Job requirement and Responsibilities (Array) */}
          <div className="mb-2 row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label className="form-label fw-bold">Responsibilities</label>
              {responsibilities?.map((responsibility_item, index) => (
                <div key={responsibility_item.id} className="mb-2">
                  <textarea name='responsibility' className="form-control" defaultValue={responsibility_item.text}
                  {...register(`responsibility[${index}].text`)}/>
                </div>
              ))}
              <div>
                <button className='border-0 rounded bg-warning me-1' type="button"
                onClick={() => setResponsibilities((prevResponsibilities) => [...prevResponsibilities, ''])}>
                  Add
                </button>
                <button className='border-0 rounded bg-info' type="button"
                onClick={() => setResponsibilities((prevResponsibilities) => prevResponsibilities.length > 0 ? prevResponsibilities.slice(0, prevResponsibilities.length - 1) : [])}>
                  Remove
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label className="form-label fw-bold">Job Requirements</label>
              {jobRequirements?.map((jobReq, index) => (
                <div key={jobReq.id} className="mb-2">
                  <textarea name='job_req' className="form-control" defaultValue={jobReq.text}
                  {...register(`job_req[${index}].text`)}/>
                </div>
              ))}
              <div>
                <button className='border-0 rounded bg-warning me-1' type="button"
                onClick={() => setJobRequirements((prevRequirement) => [...prevRequirement, '' ])}>
                  Add
                </button>
                <button className='border-0 rounded bg-info' type="button"
                onClick={() => setJobRequirements((prevRequirement) => prevRequirement.length>0? prevRequirement.slice(0, prevRequirement.length - 1):[])}>
                  Remove
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <label className="form-label fw-bold me-3">Benefits</label>
              {fields.map((benefit, index) => (
                <div key={benefit.id} className="mb-1">
                  <textarea className="form-control" defaultValue={benefit.text} name="benefits"
                  {...register(`benefits[${index}].text`)}/>
                  <button type="button" className='border-0 rounded bg-warning mt-1' onClick={() => remove(index)}>Remove</button>
                </div>
              ))}
              <button type="button" className='border-0 rounded bg-info' onClick={() => append({ text: '' })}>Add</button>
            </div>
          </div>
          {/* Instructions, Benefits */}
          <div className="mb-2 row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <label className="form-label fw-bold">About Position</label>
              <Controller name="about_position" control={control}
              render={({ field }) => (
                <textarea {...field} className="form-control" rows="3" />
              )}/>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <label className="form-label fw-bold">Apply Instructions</label>
              <Controller name="instructions" control={control}
              render={({ field }) => (
                <textarea {...field} className="form-control" rows="3" />
              )}/>
            </div>
          </div>
          <button type="submit" className="my-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddACareer;
