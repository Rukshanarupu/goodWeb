import Swal from "sweetalert2";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../Components/Config/Server";
import { useForm, Controller } from 'react-hook-form';
import { imageUploadToken } from "../../Components/Config/image";

const UpdateLogo = () => {
    const styles=useLoaderData()
    // console.log(styles[0])

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // ..................Upload photo
    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;
    // console.log(imageHostingUrl)
    const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm()

    let imageUrl;
    const uploadImage = async (e) => {
        const image = e.target.files[0];
        console.log(image)
        if (!image) {
            return null;
        }
        const formData = new FormData();
        // console.log(imageHostingUrl)
        formData.append("image", image);
        try {
            const res = await fetch(imageHostingUrl, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                imageUrl= data.data.url;
                return imageUrl
            } 
            else {
                throw new Error("Image upload failed");
            }
        } 
        catch (error) {
            console.error("Image upload error:", error);
            throw error;
        }
    };

    // Set the default value for the photo field
    useEffect(() => {
        setValue('photo', styles[0]?.logo_url);
    }, [styles, setValue]);

    const onSubmit = (data) => {
        setLoading(true);
        try {
            const imageUrl = uploadImage(data);            
            const updatedStyleInfo = {
                logo_url: imageUrl || styles[0]?.logo_url, // Use the new image URL if available, otherwise use the existing one
                color_code: data.color_text,
            };
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Change it!",
            })
            .then((result) => {
                // console.log(result)
                if (result.isConfirmed) {
                    fetch(`${baseUrl}/update-style/${styles[0]?._id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedStyleInfo),
                    })
                    // console.log(updatedStyleInfo)
                    .then((res) => res.json())
                    .then((data) => {
                    console.log(data);
                    if (data.message === 'Style updated successfully') {
                        setLoading(false);
                        // e.target.reset();
                        Swal.fire(
                            'Good job!',
                            'Your Style updated successfully',
                            'success'
                        )
                        navigate("/");
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
    
};

    return (
        <div className="bg-light p-md-5 h-100" style={{background:""}}>
            <div className="row">
                <div className='p-4 rounded-3 border shadow post-banner bg-white'>
                    <div className="d-flex justify-content-between">
                        <h2 className='fw-bold text-info text-center'>Add Style</h2>
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3 mb-5">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <label htmlFor="Photo" className="form-label">Upload Logo</label>
                                <Controller name="photo" control={control}
                                render={({ field }) => (
                                    <input className="form-control" type="file"
                                    onChange={(e) => {field.onChange(e); uploadImage(e);}}/>
                                )}
                                />
                                {errors.photo && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <label htmlFor="color_text" className="form-label">Hexa Color Code</label>
                                {styles && styles.length > 0 && (
                                    <Controller
                                    name="color_text"
                                    control={control}
                                    defaultValue={styles[0]?.color_code}
                                    render={({ field }) => <input {...field} className="form-control"/>}
                                    />
                                )}
                                {errors.color_text && <span className="text-danger">This field is required</span>}
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="btn my-btn">
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateLogo;