import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { baseUrl } from "../../../Components/Config/Server";

const AddSuccess = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors }} = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        console.log(data)
        const successInfo = {video_url: data.video_url}
        console.log(data)
        fetch(`${baseUrl}/postSuccessVideo`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(successInfo)
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                setLoading(false);
                reset();
                Swal.fire({
                    title:"Good job!",
                    text: "Video Added Successfully.",
                    icon: "success"
                });
            }
        });
    };

    return (
        <div className="row">
            <div className='p-4 rounded-3 border shadow post-banner'>
                <div className="d-flex justify-content-between">
                    <h2 className='fw-bold text-info'>Add Success Video</h2>
                </div>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3 mb-5">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <label htmlFor="video_url" className="form-label">Video Url</label>
                            <input {...register("video_url")} type="text" className="form-control" placeholder="Url from youtube"/>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn my-btn">
                            {loading ? 'Adding...' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSuccess;