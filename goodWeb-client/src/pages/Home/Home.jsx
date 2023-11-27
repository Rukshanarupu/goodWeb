import History from "./History";
import About from "../About/About";
import Services from "../Services/Services";
import Website from "../Website/Website";
import ScrollToTop from "../Shared/ScrollToTop";
import SplideBanner from "./SplideBanner";
import PortfolioCategory from "../Portfolio/PortCategory";
import Success from "../Portfolio/Success";

const Home = () => {

  return (
    <div className="position-relative">
      <SplideBanner/>
      <About/>
      <History/>
      <Services/>
      {/* <Website/> */}
      <PortfolioCategory/>
      <Success/>
      <ScrollToTop />
    </div>
  );
};

export default Home;
