import PageBanner from "../../Components/PageBanner/PageBanner";
import Services from "./Services";


const ServicePage = () => {
    return (
        <div className="service-section">
            <PageBanner subTitle="Our Services" title="Our Services"/>
            <Services/>
        </div>
    );
};

export default ServicePage;