import React, { useState, useEffect } from 'react';
import MainTitle from '../../Components/MainTitle';
import PageBanner from '../../Components/PageBanner/PageBanner';
import "../../Components/Css/Pricing.css"

const Pricing = () => {
    const [pricing, setPricing] = useState([]);

    useEffect(() => {
        fetch('pricingData.json')
        .then((res) => res.json())
        .then((data) => setPricing(data))
        .catch((error) => console.error(error));
    }, []);

    return (
        <div className=' '>
            <PageBanner subTitle="Pricing" title="Pricing" />
            <div className="container my-5">
                <MainTitle heading="Pricing"
                secondPara="We thank you for all our awesome testimonials! There are hundreds of our happy customers!"
                paragraph="Let's see what others say about GoodWEB Solutions website template!"/>
                <div className="row">
                    {pricing?.map((plan, index) => (
                        <div className="col-md-4 col-sm-6" key={index}>
                            <div className="pricing text-center overflow-hidden position-relative bg-light pb-2 border border-warning-subtle mb-3">
                                <div className="mb-5 text-start pricing-header position-relative text-white d-flex align-items-center justify-content-between">
                                    <div className=''>
                                        <h3 className="fw-semibold text-uppercase">{plan.pricing_type}</h3>
                                        <p className="">{plan.pricing_description}</p>
                                    </div>
                                    <div>
                                        <p className="year fw-semibold text-center bg-white px-2 py-1 rounded-circle">
                                            Pay only <br />
                                            ${plan.pricing_per_year}/year
                                        </p>
                                    </div>
                                </div>
                                <div className="">
                                    <h5 className="amount bg-white py-2 position-absolute rounded-2">
                                        $<span className='fw-bold fs-3'>{plan.pricing_per_month}</span> <br />/month
                                    </h5>
                                </div>
                                <ul className="my-2 list-unstyled bg-white rounded m-5 p-3 text-start">
                                    {plan.pricing_features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                                <button href="#" className="inline-block px-4 fs-5 fw-bold mb-2 rounded-2">
                                    Select the plan
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
