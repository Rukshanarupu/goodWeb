import React, { useState } from 'react';
import { useForm , Controller} from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseUrl } from '../../../Components/Config/Server';
import { imageUploadToken } from '../../../Components/Config/image';

const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;
const EditPortfolio = () => {
    const selectedPortfolio = useLoaderData();
    const [loading, setLoading] = useState(false);
    // console.log(selectedPortfolio)
    const { control, handleSubmit, formState: { errors }, reset } = useForm()

    const portfolioCategories = [
        { value: 'design', label: 'Design' },
        { value: 'mockup', label: 'Mockup' },
        { value: 'logos', label: 'Logos' },
        { value: 'html', label: 'HTML' },
    ];
    // console.log(imageHostingUrl)
let imageUrl;
    // ...

const uploadImage = async (e) => {
    try {
        const image = e?.target?.files?.[0];
        console.log(image)
        // if (!image) {
        //     throw new Error("No image selected");
        // }
        const formData = new FormData();
        formData.append("image", image);
        const res = await fetch(imageHostingUrl, { method: "POST", body: formData });
        const data = await res.json();
        console.log(data)
        console.log(data.data.url)

        if (data.success) {
            imageUrl=data.data.url
            return imageUrl;
        } else {
            throw new Error("Image upload failed");
        }
    } catch (error) {
        console.error("Image upload error:", error);
        throw error;
    }
};

const onSubmit = async (data) => {
    setLoading(true);

    try {
        // const uploadedImageUrl = await uploadImage(data.portfolio_img);
        // console.log(uploadedImageUrl)
        const updatedInfo = {
            portfolio_name: data.portfolio_name,
            portfolio_type: data.portfolio_type,
            portfolio_img: imageUrl || selectedPortfolio.portfolio_img,
            portfolio_category: data.portfolio_category,
        };
        console.log(updatedInfo);
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
            if (result.isConfirmed) {
                fetch(`${baseUrl}/updatePortfolio/${selectedPortfolio?._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedInfo),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        if (data.message === 'Information updated successfully') {
                            setLoading(false);
                            Swal.fire(
                                'Good job!',
                                'Your Style updated successfully',
                                'success'
                            );
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
        setLoading(false);
    }
};

// ...


      
    return (
        <div className='m-md-5'>
            <h2 className="fw-bold text-dark text-center">Update of Service Information</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                    <div className="col-md-6 col-sm-12">
                        <label htmlFor="portfolio_name" className="form-label">Portfolio Name</label>
                        <Controller name="portfolio_name" control={control} defaultValue={selectedPortfolio?.portfolio_name}
                        render={({ field }) => <input type="text" {...field} className="form-control bg-info bg-opacity-10"/>}/>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <label htmlFor="portfolio_img" className="form-label">Portfolio Image</label>
                        <Controller name="portfolio_img" control={control} value={selectedPortfolio?.portfolio_img}
                        render={({ field }) => <input type="file" {...field} className="form-control bg-info bg-opacity-10"
                        onChange={(e) => {field.onChange(e); uploadImage(e);}}/>}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6 col-sm-12">
                        <label htmlFor="portfolio_type" className="form-label">Portfolio Type</label>
                        <Controller name="portfolio_type" control={control} defaultValue={selectedPortfolio?.portfolio_type}
                        render={({ field }) => <input type="text" {...field} className="form-control bg-info bg-opacity-10"/>}/>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <label htmlFor="portfolio_category" className="form-label">Portfolio Category</label>
                        <Controller name="portfolio_category" control={control} defaultValue={selectedPortfolio?.portfolio_category || ''}
                        render={({ field }) => 
                            <select {...field} className="form-select bg-info bg-opacity-10">
                                {portfolioCategories.map((category) => (
                                    <option key={category.value} value={category.value} selected={category.value === selectedPortfolio?.portfolio_category}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>}/>
                    </div>
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn my-btn ">
                    {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPortfolio;