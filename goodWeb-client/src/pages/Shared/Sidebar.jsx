import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { GrBusinessService, GrLogout } from 'react-icons/gr'
import { BsFillBriefcaseFill, BsFillHouseAddFill } from 'react-icons/bs'
import portfolio_icon from '../../assets/logos/portfolio.png'
import job_icon from '../../assets/logos/posting.png'
import application_icon from '../../assets/logos/resume.png'
import { AuthContext } from '../../provider/AuthProvider'
import {RxAvatar} from 'react-icons/rx';
import { GiAchievement, GiKnightBanner } from 'react-icons/gi'
import { IoLogoAngular  } from "react-icons/io";
import { FaPhotoVideo, FaUsers } from 'react-icons/fa'


const Sidebar = () => {
  const navigate = useNavigate()
  const { user, logOut } = useContext(AuthContext)
  // console.log(user)
  
  const handleLogOut = () => {
    logOut()
    navigate('/')
  }
  return (
    <>
      <div 
      className='position-md-fixed justify-content-between overflow-hidden overflow-sm-visible bg-secondary px-2 py-4 dashboard-nav' style={{ height: '100%' }}>
        <div className='mb-3 d-none d-md-block'>
          <div className='d-flex justify-content-center'>
            {user && user.photoURL?
              <img className='rounded-circle border bg-warning p-1' src={user?.photoURL} alt="" style={{width:"100px"}}/>:
              <RxAvatar className='display-1 text-warning bg-white p-1 rounded-circle'/>
            }
          </div>
          <div className='d-flex justify-content-center text-white'>
            {user?<h5>{user.displayName?user.displayName:""}</h5>:""}
          </div>
        </div>
        <ul className='navbar-nav sidebar-nav justify-content-end'>
          <li className='nav-item my-nav justify-content-center d-flex'>
            <NavLink to='/dashboard/post-style' exact activeClassName="active" className='nav-link text-decoration-none d-flex align-items-center px-4 py-2 mt-md-2 dashboard-nav-item'>
              <IoLogoAngular className='me-2 text-black d-none d-md-block'/>
              <span className=''>Update Logo</span>
            </NavLink>
          </li>
          <li className='nav-item my-nav justify-content-center d-flex'>
            <NavLink to='/dashboard/add-banner' exact activeClassName="active" className='nav-link text-decoration-none d-flex align-items-center px-4 py-2 mt-md-2 dashboard-nav-item'>
              <GiKnightBanner className='me-2 text-black d-none d-md-block'/>
              <span className=''>Manage Banner</span>
            </NavLink>
          </li>
          <li className='nav-item my-nav justify-content-center d-flex'>
            <NavLink to='/dashboard/manage-achievements' exact activeClassName="active" className='nav-link text-decoration-none d-flex align-items-center px-4 py-2 mt-md-2 dashboard-nav-item'>
              <GiAchievement className='me-2 text-black d-none d-md-block'/>
              <span className=''>Manage Awards</span>
            </NavLink>
          </li>
          <li className='nav-item my-nav justify-content-center d-flex'>
            <NavLink to='/dashboard/manage-services' exact activeClassName="active" className='nav-link text-decoration-none d-flex align-items-center px-4 py-2 mt-md-2 dashboard-nav-item'>
              <GrBusinessService className='me-2 d-none d-md-block'/>
              <span className=''>Manage Services</span>
            </NavLink>
          </li>
          <li className='nav-item my-nav justify-content-center d-flex'>
            <NavLink to='/dashboard/manage-portfolio' exact activeClassName="active" className='nav-link text-decoration-none d-flex align-items-center px-4 py-2 mt-md-2 dashboard-nav-item'>
              <img style={{width:"15px"}} src={portfolio_icon} className=' d-none d-md-block' alt="" />
              <span className='ms-2'>Manage Portfolio</span>
            </NavLink>
          </li>
          <li className='nav-item my-nav justify-content-center d-flex'>
            <NavLink to='/dashboard/manage-success' exact activeClassName="active" className='nav-link text-decoration-none d-flex align-items-center px-4 py-2 mt-md-2 dashboard-nav-item'>
              <FaPhotoVideo className='me-2 text-black d-none d-md-block'/>
              <span className='ms-2'>Manage Success</span>
            </NavLink>
          </li>
          <li className='nav-item my-nav justify-content-center d-flex'>
            <NavLink to='/dashboard/manage-careers' exact activeClassName="active" className='nav-link text-decoration-none d-flex align-items-center px-4 py-2 mt-md-2 dashboard-nav-item'>
              <img style={{width:"15px"}} src={job_icon} className=' d-none d-md-block' alt="" />
              <span className='ms-1'>Post Job</span>
            </NavLink>
          </li>
          <li className='nav-item my-nav justify-content-center d-flex'>
            <NavLink to='/dashboard/applied-job-list' exact activeClassName="active" className='nav-link text-decoration-none d-flex align-items-center px-4 py-2 mt-md-2 dashboard-nav-item'>
              <img style={{width:"15px"}} src={application_icon} className=' d-none d-md-block' alt="" />
              <span className='ms-1'>Applied Jobs</span>
            </NavLink>
          </li>
          <li className='nav-item my-nav justify-content-center d-flex'>
            <NavLink to='/dashboard/manage-contacts' exact activeClassName="active" className='nav-link text-decoration-none d-flex align-items-center px-4 py-2 mt-md-2 dashboard-nav-item'>
              <FaUsers className='me-2 text-black d-none d-md-block'/>
              <span className=''>Manage Contacts</span>
            </NavLink>
          </li>
        </ul>
        <hr className='h-1 w-100 my-2'/>
        
        <li className='nav-item my-nav justify-content-center d-flex'>
            <NavLink to='/' exact activeClassName="active" className='nav-link text-decoration-none d-flex align-items-center px-4 py-2 mt-md-2 dashboard-nav-item'>
              <BsFillHouseAddFill className='me-2 text-black '/>
              <span className='d-none d-md-block'>Home</span>
            </NavLink>
          </li>
        <div className='d-flex justify-content-center text-white mt-4'>
          <button className='btn logout-btn border-0 bg-light py-1 px-3' onClick={handleLogOut} 
          ><GrLogout/> <span className='d-none d-md-block'>Logout</span></button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
