import History from "./History";
import About from "../About/About";
import Website from "../Website/Website";
import ScrollToTop from "../Shared/ScrollToTop";
import SplideBanner from "./SplideBanner";
import PortfolioCategory from "../Portfolio/PortCategory";
import Success from "../Portfolio/Success";
import ServiceSection from "./ServiceSection";

const Home = () => {

  return (
    <div className="position-relative">
      <SplideBanner/>
      <About/>
      <History/>
      <ServiceSection/>
      {/* <Website/> */}
      {/* <PortfolioCategory/> */}
      <Success/>
      <ScrollToTop />
    </div>
  );
};

export default Home;
