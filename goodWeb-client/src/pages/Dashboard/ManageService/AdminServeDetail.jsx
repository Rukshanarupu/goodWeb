import { MdEditSquare } from "react-icons/md";
import ServiceDetails from "../../Services/ServiceDetails";
import { useLoaderData } from "react-router-dom";
import EditService from "./EditService";
import { useState } from "react";

const AdminServeDetail = () => {
    const serviceData=useLoaderData()
    const [editingService, setEditingService] = useState(null);
    console.log(serviceData)
    console.log(serviceData.id)

    const handleEditClick = (serviceData) => {
        setEditingService(serviceData);
    };
    return (
        <div className="position-relative">
            <ServiceDetails/>
            <div className="text-end position-absolute service-edit-btn" >
                <button className="border border-2 border-warning rounded-circle"
                onClick={() => handleEditClick(serviceData)}>
                    <MdEditSquare className=" p-2 fs-1"/>
                </button>
            </div>
            
            {editingService && (
                <EditService
                    serviceInfo={editingService}
                    onClose={() => setEditingService(null)}
                />
            )}
        </div>
    );
};

export default AdminServeDetail;