import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { baseUrl } from '../../../Components/Config/Server';
import AddPortfolio from './AddPortfolio';

const ManagePortfolio = () => {
    const portfolioLoader = useLoaderData()
    const [portfolios, setPortfolios] = useState(portfolioLoader)
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    console.log(portfolios)

    const handleEditPortfolio = (portfolio) => {
        // console.log(portfolio)
        setSelectedPortfolio(portfolio);
        const modal = new window.bootstrap.Modal(document.getElementById(`exampleModal-${selectedPortfolio}`));
        modal.show();
    };

    const handleDeletePortfolio = (id) => {
        console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        })
        .then((result) => {
            if (result.isConfirmed) {
                fetch(`${baseUrl}/deletedPortfolio/${id}`, {
                    method: 'DELETE',
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.deletedCount>0) { 
                        setPortfolios((prevPortfolio) =>
                            prevPortfolio.filter((newPortfolio) => newPortfolio._id !== id)
                        );                     
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Banner has been deleted.",
                            icon: "success"
                        });
                    }
                })
            }
        });
    };

    return (
        <div className='p-md-5'>
            <AddPortfolio/>
            <div className='my-5'>
                <h3 className='text-info text-center mb-3'>Manage All Portfolio</h3>
                <table class="table shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col text-center">Picture</th>
                            <th scope="col">Type</th>
                            <th scope="col">Category</th>
                            <th scope="col" className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {portfolios?.map((portfolio, index) => (
                        <tr key={portfolio._id}>
                            <th scope="row">{index+1}</th>
                            <td>{portfolio.portfolio_name}</td>
                            <td>
                                <img className='rounded-circle' style={{width:"110px"}} src={portfolio.portfolio_img} alt="" />
                            </td>
                            <td>{portfolio.portfolio_type}</td>
                            <td>{portfolio.portfolio_category}</td>
                            <td className='text-center d-flex align-items-center justify-content-center gap-3'>
                                <Link to={`/dashboard/edit-portfolio/${portfolio._id}`}
                                className='fs-5 bg-info border-0 d-flex px-2 text-decoration-none text-black'
                                style={{ borderRadius: "10px 0px 10px 0px" }}>
                                    <small style={{ fontSize: "13px" }}>Edit</small>
                                </Link>
                                <button className='me-1 p-1 bg-warning text-dark border-0 d-flex'><MdDelete onClick={() => handleDeletePortfolio(portfolio._id)} className=''/></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default ManagePortfolio