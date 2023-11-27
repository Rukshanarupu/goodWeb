import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { baseUrl } from "../../../Components/Config/Server";
import { imageUploadToken } from "../../../Components/Config/image";

const AddPortfolio = () => {
    const [loading, setLoading] = useState(false);
    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;
    const { register, handleSubmit, reset, formState: { errors }} = useForm();

    const onSubmit = (data, e) => {
        console.log(data)
        // setLoading(true);
        const img = data.photo[0];
        console.log(img)
        const formData = new FormData();
        formData.append('image', img);
        fetch(imageHostingUrl, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(imgRes => {
            const added_info = { 
                portfolio_img: imgRes.data.url,
                portfolio_name: data.portfolio_name,
                portfolio_type: data.portfolio_type,
                portfolio_category: data.portfolio_category,
            };
            console.log(imgRes)
            if (imgRes.success==true) {
                fetch(`${baseUrl}/addPortfolio`, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(added_info)
                })
                .then(res => res.json())
                .then(data => { console.log(data)
                    if (data.acknowledged==true) {
                        setLoading(false);
                        // e.target.reset();
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
                    <h2 className='fw-bold text-info'>Add A Portfolio</h2>
                </div>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-3 mb-5">
                        <div className="col-md-6 col-sm-12">
                            <label htmlFor="photo" className="form-label">Portfolio Photo</label>
                            <input {...register("photo")} type="file" className="form-control rounded-0" style={{background:'#2778c442'}}  />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <label htmlFor="portfolio_name" className="form-label">Portfolio Title</label>
                            <input {...register("portfolio_name")} type="text" placeholder="Description" className="form-control rounded-0" style={{background:'#2778c442'}}  />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <label htmlFor="portfolio_type" className="form-label">Portfolio Type</label>
                            <input {...register("portfolio_type")} type="text" placeholder="Type" className="form-control rounded-0" style={{background:'#2778c442'}}  />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <label htmlFor="portfolio_category" className="form-label">Portfolio Category</label>
                            <select {...register("portfolio_category")} className="form-select rounded-0" aria-label="Default select example" style={{ background: '#2778c442' }}>
                                <option selected>Select any Category</option>
                                <option value="design">Design</option>
                                <option value="mockup">Mockup</option>
                                <option value="logos">Logos</option>
                                <option value="html">HTML</option>
                            </select>
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

export default AddPortfolio;