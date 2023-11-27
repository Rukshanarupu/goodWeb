import React, { useState } from 'react';
import EditAchievement from './EditAchievement';
import { useLoaderData } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';

const ManageAchievement = () => {
    const achievements = useLoaderData();
    const [editingAchievement, setEditingAchievement] = useState(null);
    // console.log(editingAchievement)

    const handleEditClick = (achievement) => {
        setEditingAchievement(achievement);
    };

    return (
        <div className='p-md-5' style={{ background: "rgba(161, 222, 233, 0.623)", height: "100%" }}>
            <div className='mb-5'>
                <div className=''>
                    <h2 className="fw-bold text-dark text-center">History of Achievement</h2>
                    <div className='row'>
                        {achievements?.map((achievement) => (
                            <div className='col-md-6 col-lg-3 col-sm-12' key={achievement._id}>
                                <div className='p-4 bg-warning mt-2 rounded'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <img className='w-25' src={achievement.icon} alt="" />
                                        <div className='text-center'>
                                            <h6>{achievement.title}</h6>
                                            <p>{achievement.count}</p>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button
                                            onClick={() => handleEditClick(achievement)}
                                            className='p-1 text-black bg-info border-0 fs-4 d-flex align-items-center rounded'
                                        >
                                            <FaRegEdit />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {editingAchievement && (
                <EditAchievement
                    achievement={editingAchievement}
                    onClose={() => setEditingAchievement(null)}
                />
            )}
        </div>
    );
};

export default ManageAchievement;
