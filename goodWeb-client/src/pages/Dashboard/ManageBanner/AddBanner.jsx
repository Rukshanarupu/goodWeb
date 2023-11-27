import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { baseUrl } from "../../../Components/Config/Server";
import { imageUploadToken } from "../../../Components/Config/image";

const AddBanner = () => {
    const [loading, setLoading] = useState(false);
    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;
    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const [submitted, setSubmitted]=useState()

    const onSubmit = (data, e) => {
        setLoading(true);
        const img = data.Photo[0];
        const formData = new FormData();
        formData.append('image', img);
        fetch(imageHostingUrl, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(imgRes => {
            const banner_info = { 
                banner_img: imgRes.data.url,
                heading: data.banner_title,
                subheading: data.banner_des,
            };
            if (imgRes.success) {
                fetch(`${baseUrl}/addBanner`, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(banner_info)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        setLoading(false);
                        e.target.reset();
                        Swal.fire({
                            title:"Good job!",
                            text: "Banner Added Successfully.",
                            icon: "success"
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="row">
            <div className='p-4 rounded-3 border shadow post-banner'>
                <div className="d-flex justify-content-between">
                    <h2 className='fw-bold text-info'>Add Banner</h2>
                </div>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3 mb-5">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <label htmlFor="Photo" className="form-label">Banner Photo</label>
                            <input {...register("Photo")} type="file" className="form-control" />
                            
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <label htmlFor="banner_title" className="form-label">Title</label>
                            <input {...register("banner_title")} type="text" placeholder="Description" className="form-control" />
                            
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <label htmlFor="banner_des" className="form-label">Description</label>
                            <input {...register("banner_des")} type="text" placeholder="Description" className="form-control" />
                            
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

export default AddBanner;