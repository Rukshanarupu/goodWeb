import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import 'react-tabs/style/react-tabs.css';
import MainTitle from "../../Components/MainTitle";

const PortfolioCategory = () => {
  const allData = useLoaderData();
  // console.log(allData) 
  const [items, setItems] = useState(allData);

  const filterItem=(cateItem)=>{
    const updatedItems=allData?.filter(data=>{
      return data.portfolio_category===cateItem
    })
    setItems(updatedItems)
  }

  if (!items) {
    return <Loader/>;
  }

  return (
    <div className=" my-5">
      <div className="container">
        <MainTitle heading="Our Portfolio"
        paragraph="We build professional website templates, web design projects, material designs and UI kits."
        secondPara="Some of our awesome completed projects in below."/>
        <div className="category-tab d-flex justify-content-center gap-3">
          <button className="tab-list  bg-white py-2 px-3 btn"
          onClick={()=>setItems(allData)}>
            All
          </button>
          <button className="tab-list bg-white py-2 px-3 btn" 
          onClick={()=>filterItem("design")}>
            Design
          </button>
          <button className="tab-list bg-white py-2 px-3 btn"
          onClick={()=>filterItem("mockup")}>
            Mockup
          </button>
          <button className="tab-list bg-white py-2 px-3 btn"
          onClick={()=>filterItem("logos")}>
            Logos
          </button>
          <button className="tab-list bg-white py-2 px-3 btn"
          onClick={()=>filterItem("html")}>
            HTML
          </button>
        </div>
      </div>
      <div className="menu-items container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              {
                items?.map(item=>{
                  const {portfolio_img, portfolio_name, portfolio_type,}=item
                  return (
                    <div className="tab-items1 col-lg-3 col-md-4 col-sm-6 my-2 px-2">
                        <div className="border shadow p-0">
                          <div className="d-flex align-items-center justify-content-center">
                            <img className="img-fluid" src={portfolio_img} alt={portfolio_name} />
                          </div>
                          <div className="card-body bg-light p-2">
                            <h5 className="card-title">{portfolio_name}</h5>
                            <p>{portfolio_type}</p>
                          </div>
                        </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCategory;
