import React, { useRef } from 'react';
import JobDetails from '../../../../Components/JobDetails';
import { Link, useLoaderData } from 'react-router-dom';
import html2PDF from 'jspdf-html2canvas';

const ViewCareerDetail = () => {
    const componentRef = useRef(null);
    const careerData = useLoaderData();
    console.log(careerData);
    const { _id } = careerData;

    const handleJobDownload = () => {
        const page = document.getElementById('page'); // assuming 'page' is the ID of the container you want to convert
        html2PDF(page, {
            jsPDF: {
                format: 'a4',
            },
            imageType: 'image/jpeg',
            output: './pdf/generate.pdf',
        });
    };

    return (
        <div id="page">
            <div className='p-md-3' >
            <JobDetails />
            <div className='d-flex justify-content-evenly my-2'>
                <Link to={`/dashboard/edit-career/${_id}`} className='btn my-btn'>
                    Edit
                </Link>
                <a onClick={handleJobDownload} className='btn my-btn'>
                    Download
                </a>
            </div>
        </div>
        </div>
    );
};

export default ViewCareerDetail;
