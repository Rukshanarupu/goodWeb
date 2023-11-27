/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "./../pages/Register/Register";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../layouts/Dashboard";
import Home from "../pages/Home/Home";
import AboutDetails from "../pages/About/AboutDetails";
import ServiceDetails from "../pages/Services/ServiceDetails";
import Portfolio from "../pages/Portfolio/Portfolio";
// import Pricing from "../pages/Pricing/Pricing";
import Contact from "../pages/Contact/Contact";
import ErrorPage from "../pages/Shared/ErrorPage";
import Careers from "../pages/Careers/Careers";
import ManageCareers from "../pages/Dashboard/Career/ManageJob/ManageCareers";
import UpdateLogo from "../pages/Dashboard/UpdateLogo";
import ServicePage from "../pages/Services/ServicePage";
import { baseUrl } from "../Components/Config/Server";
import CareerDetails from "../pages/Careers/CareerDetails";
import AppliedJobs from "../pages/Dashboard/Career/AppliedJobs";
import JobApply from "../pages/Careers/JobApply";
import Test from "../pages/Careers/test";
import ManageBanner from "../pages/Dashboard/ManageBanner/ManageBanner";
import ManageAchievement from "../pages/Dashboard/ManageAchievement/ManageAchievement";
import ManageService from "../pages/Dashboard/ManageService/ManageService";
import ManagePortfolio from "../pages/Dashboard/ManagePortfolio/ManagePortfolio";
import AdminServeDetail from "../pages/Dashboard/ManageService/AdminServeDetail";
import EditPortfolio from "../pages/Dashboard/ManagePortfolio/EditPortfolio";
import ManageSuccess from "../pages/Dashboard/ManageSuccess/ManageSuccess";
import ManageContact from "../pages/Dashboard/ManageContacts/ManageContact";
import ViewCareerDetail from "../pages/Dashboard/Career/ManageJob/ViewCareerDetail";
import EditCareers from "../pages/Dashboard/Career/ManageJob/EditCareers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: ()=> fetch(`${baseUrl}/styles`)
      },
      {
        path: "/about",
        element: <AboutDetails></AboutDetails>,
      },
      {
        path: "/services",
        element: <ServicePage></ServicePage>,
      },
      {
        path: "/services/:id",
        element: <ServicePage></ServicePage>,
      },
      {
        path: "/service-details/:id",
        element: <ServiceDetails></ServiceDetails>,
        loader: ({ params }) => fetch(`${baseUrl}/service/${params.id}`),
      },
      {
        path: "/portfolio",
        element: <Portfolio></Portfolio>,
        loader: () => fetch(`${baseUrl}/portfolio`),
      },
      {
        path: "/career",
        element: <Careers />,
        loader: () => fetch(`${baseUrl}/careers`),
      },
      {
        path: "/job-opening-details/:id",
        element: <CareerDetails />,
        loader: ({ params }) => fetch(`${baseUrl}/careers/${params.id}`),
      },
      {
        path: `job-apply/:id/:title`,
        element: <JobApply />,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "test",
        element: <Test></Test>,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>, 
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: 'post-style',
        element: <UpdateLogo></UpdateLogo>,
        loader: () => fetch(`${baseUrl}/styles`),
      },
      {
        path: 'add-banner',
        element: <ManageBanner></ManageBanner>,
        loader: () => fetch(`${baseUrl}/banners`),
      },
      {
        path: 'manage-achievements',
        element: <ManageAchievement></ManageAchievement>,
        loader: () => fetch(`${baseUrl}/achievements`),
      },
      {
        path: 'manage-services',
        element: <ManageService></ManageService>,
        loader: () => fetch(`${baseUrl}/services`),
      },
      {
        path: 'manage-service-details/:id',
        element: <AdminServeDetail></AdminServeDetail>,
        loader: ({ params }) => fetch(`${baseUrl}/service/${params.id}`)
      },
      {
        path: 'manage-portfolio',
        element: <ManagePortfolio></ManagePortfolio>,
        loader: () => fetch(`${baseUrl}/portfolio`),
      },
      {
        path: 'edit-portfolio/:id',
        element: <EditPortfolio></EditPortfolio>,
        loader: ({ params }) => fetch(`${baseUrl}/portfolio/${params.id}`)
      },
      {
        path: 'manage-success',
        element: <ManageSuccess></ManageSuccess>,
        loader: () => fetch(`${baseUrl}/successVideos`),
      },
      {
        path: 'manage-careers',
        element: <ManageCareers></ManageCareers>,
        loader: () => fetch(`${baseUrl}/careers`),
      },
      {
        path: "edit-career/:id",
        element: <EditCareers />,
        loader: ({ params }) => fetch(`${baseUrl}/careers/${params.id}`),
      },
      {
        path: 'view-career-details/:id',
        element: <ViewCareerDetail></ViewCareerDetail>,
        loader: ({ params }) => fetch(`${baseUrl}/careers/${params.id}`),
      },
      {
        path: 'applied-job-list',
        element: <AppliedJobs></AppliedJobs>,
        loader: () => fetch(`${baseUrl}/appliedJobs`),
      },
      {
        path: 'manage-contacts',
        element: <ManageContact></ManageContact>,
        loader: () => fetch(`${baseUrl}/contacts`),
      },
    ]
  }
]);

export default router;
