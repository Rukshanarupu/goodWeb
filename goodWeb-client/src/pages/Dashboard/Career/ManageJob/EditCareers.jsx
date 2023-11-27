import { useLoaderData } from 'react-router-dom';
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { baseUrl } from '../../../../Components/Config/Server';
import Swal from 'sweetalert2';

const EditCareers = () => {
    const careerData=useLoaderData()
    const { handleSubmit, control, register } = useForm();
    const [loading, setLoading]=useState(false)
    console.log(careerData);
    
  const [submitted, setSubmitted] = useState(false); 
  const [responsibilities, setResponsibilities] = useState(careerData.responsibility || Array.from({ length: 1 }, (_, index) => ({ id: index, text: '' })));
  const [jobRequirements, setJobRequirements] = useState(careerData.job_req || Array.from({ length: 1 }, (_, index) => ({ id: index, text: '' })));
  const [benefits, setBenefits] = useState(careerData.benefit || Array.from({ length: 1 }, (_, index) => ({ id: index, text: '' })));

  const [formData, setFormData] = useState({ title: '', about_position:'', department:'', responsibility:'', job_req:'', employment_type:'', workplace_type:'', deadline:'', vacancy: '', salary: '', experience: '', instructions: '', education: '', benefit: '', });
  // console.log(formData)  
    
  const onSubmit = async (data) => {
    // console.log(data)
    setLoading(true);
    try {           
        const updatedInfo = {
          title: data.title, about_position: data.about_position,
          department: data.department, responsibility: data.responsibility,
          job_req: data.job_req, education: data.education,
          employment_type: data.employment_type,
          workplace_type: data.workplace_type, benefit: data.benefit,
          deadline: data.deadline, vacancy: data.vacancy,
          salary: data.salary, experience: data.experience,
          instructions: data.instructions, education: data.education,
        };
        console.log(data)
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
          console.log(result)
          if (result.isConfirmed==true) {
            fetch(`${baseUrl}/updateCareer/${careerData?._id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json"},
              body: JSON.stringify(updatedInfo),
            })
            //   console.log(updatedInfo)
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
              if (data.message === 'Information updated successfully') {
                setFormData(updatedInfo)
                setLoading(false);
                // e.target.reset();
                Swal.fire(
                  'Good job!',
                  'Your Style updated successfully',
                  'success'
                )
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
        <div className=''>
          <h2 className="fw-bold text-info text-center">Update posted Job</h2>
          <div className="container py-3 border-2 rounded-3 shadow">
            <form onSubmit={handleSubmit(onSubmit)} className="">
              {/* Position, Education and Deadline */}
              <div className="mb-2 row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <label className="form-label fw-bold">Position Title</label>
                  <Controller name="title" control={control} defaultValue={careerData.title}
                  render={({ field }) => (
                    <input type="text" {...field} className="form-control"/>
                  )}/>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <label className="form-label fw-bold">Education</label>
                  <Controller name="education" control={control} defaultValue={careerData.education}
                  render={({ field }) => (
                    <input type="text" {...field} className="form-control"/>
                  )}/>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <label className="form-label fw-bold">Deadline</label>
                  <Controller name="deadline" control={control}  defaultValue={careerData.deadline}
                  render={({ field }) => (
                    <input type="date" {...field} className="form-control"/>
                  )}/>
                </div>
              </div>
              {/* Employment Type, Salary and Experience */}
              <div className="mb-2 row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <label className="form-label fw-bold">Salary</label>
                  <Controller name="salary" control={control}  defaultValue={careerData.salary}
                  render={({ field }) => (
                    <input type="number" {...field} className="form-control"/>
                  )}/>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <label className="form-label fw-bold">Employment Type</label>
                  <Controller name="employment_type" control={control} defaultValue={careerData.employment_type}
                  render={({ field }) => (
                    <input type="text" {...field} className="form-control"/>
                  )}/>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <label className="form-label fw-bold">Experience</label>
                  <Controller name="experience" control={control} defaultValue={careerData.experience}
                  render={({ field }) => (
                    <input type="text" {...field} className="form-control"/>
                  )}/>
                </div>
              </div>
              {/* Workplace Type, Department and Vacancy*/}
              <div className="mb-2 row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <label className="form-label fw-bold">Workplace Type</label>
                  <Controller name="workplace_type" control={control} defaultValue={careerData.workplace_type}
                  render={({ field }) => (
                    <input type="text" {...field} className="form-control"/>
                  )}/>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <label className="form-label fw-bold">Vacancy</label>
                  <Controller name="vacancy" control={control} defaultValue={careerData.vacancy}
                  render={({ field }) => (
                    <input type="text" {...field} className="form-control"/>
                  )}/>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <label className="form-label fw-bold">Department</label>
                  <Controller name="department" control={control} defaultValue={careerData.department}
                  render={({ field }) => (
                    <input type="text" {...field} className="form-control"/>
                  )}/>
                </div>
              </div>
              {/* Job requirement and Responsibilities (Array) */}
              <div className="mb-2 row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <label className="form-label fw-bold">Responsibilities</label>
                    {responsibilities?.map((res, index) => ( 
                        // console.log(res)
                        <div key={res.id} className="mb-2">
                            <Controller name={`responsibility[${index}].text`} defaultValue={res.text}
                            control={control} render={({ field }) => <textarea {...field} className="form-control" />}/>
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
                  {jobRequirements?.map((req, index) => (
                    <div key={req.id} className="mb-2">
                      <textarea name='job_req' className="form-control" defaultValue={req.text}
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
                  <label className="form-label fw-bold">Benefits</label>
                  {benefits?.map((item, index) => (
                    <div key={item.id} className="mb-2">
                      <textarea name='benefit' className="form-control" defaultValue={item.text}
                      {...register(`benefit[${index}].text`)}/>
                    </div>
                  ))}
                  <div>
                    <button className='border-0 rounded bg-warning me-1' type="button"
                    onClick={() => setBenefits((prevBenefit) => [...prevBenefit, '' ])}>
                      Add
                    </button>
                    <button className='border-0 rounded bg-info' type="button"
                    onClick={() => setBenefits((prevBenefit) => prevBenefit.length>0? prevBenefit.slice(0, prevBenefit.length - 1):[])}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              {/* Instructions, Benefits */}
              <div className="mb-2 row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label fw-bold">About Position</label>
                  <Controller name="about_position" control={control} defaultValue={careerData.about_position}
                  render={({ field }) => (
                    <textarea {...field} className="form-control" rows="3" />
                  )}/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <label className="form-label fw-bold">Apply Instructions</label>
                  <Controller name="instructions" control={control} defaultValue={careerData.instructions}
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

export default EditCareers;