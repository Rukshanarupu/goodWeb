/* eslint-disable no-unused-vars */
import { BsDash } from "react-icons/bs";
import pageBannerImg from "../../assets/photos/inner-bg.jpg"

const PageBanner = ({ title, subTitle }) => {
  const bannerStyle = {
    backgroundImage: `url(${pageBannerImg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "black",
    height: '300px',
    // opacity:".5"
  };
  const banner={
    width: "100%",
    height: "100%"
  }

  return (
    <div className="" style={bannerStyle}>
      <div className="container d-flex align-items-center" style={banner}>
        <div className="">
          <h1 className="border-start border-warning border-5 ps-3 fw-bold">{title}</h1>
          <div className="page-title-link d-flex align-items-center ps-3">
            <p>Home</p>
            <p className="text-warning fs-1"><BsDash /></p>
            <p>{subTitle}</p> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;



        {/* <PageBanner subTitle="" title=""/> */}
