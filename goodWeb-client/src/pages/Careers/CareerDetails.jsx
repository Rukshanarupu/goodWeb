import JobDetails from "../../Components/JobDetails";
import { Link, useLoaderData } from "react-router-dom";

const CareerDetails = () => {
  const jobDetails=useLoaderData()
  console.log(jobDetails);
  const {title,  _id}=jobDetails
  
  return (
    <div className="container my-5">
      <JobDetails/>
      <div className="row">
        <div className='my-3 text-center'>
          <Link to={`/job-apply/${_id}/${encodeURIComponent(title)}`} type="submit" className='my-btn bg-warning'>Job Apply</Link>
        </div>
      </div>
    </div>
  );
};

export default CareerDetails;