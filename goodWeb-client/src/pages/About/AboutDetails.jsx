import PageBanner from "../../Components/PageBanner/PageBanner";
import Testimonial from "../Portfolio/Testimonial";
import About from "./About";


const AboutDetails = () => {
    return (
        <div>
            <PageBanner title={"About Us"} subTitle={"About Us"}/>
            <About/>
            {/* <Testimonial/> */}
        </div>
    );
};

export default AboutDetails;