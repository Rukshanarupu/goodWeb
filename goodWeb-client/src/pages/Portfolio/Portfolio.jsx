import MainTitle from "../../Components/MainTitle";
import PageBanner from "../../Components/PageBanner/PageBanner";
import PortfolioCategory from "./PortCategory";
import Success from "./Success";
import Testimonial from "./Testimonial";

const Portfolio = () => {
    return (
        <div>
            <PageBanner subTitle="Our Portfolio" title="Our Portfolio"/>
            <PortfolioCategory/>
            <Success/>
            {/* <Testimonial/> */}
        </div>
    );
};

export default Portfolio;