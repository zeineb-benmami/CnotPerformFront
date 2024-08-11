import React, { useEffect, useState } from "react";

//Import Components
import Navbar from "./Navbar/Navbar";
import Section from "./HeroSection/Section";
import CardsMini from "./HeroSection/cards-mini";
import AboutUs from "./AboutUs/about-us";
import Features from "./Features/features";

import Events from "./Planning/events";
import Blog from "./Blog/blog";
import FAQs from "./Faqs/FAQs";
import Footer from "./Footer/footer";

const CryptoIcoLanding = () => {
  //meta title
  document.title = "Accueil | CNOT PERFORM";

  const [imglight, setimglight] = useState(true);
  const [navClass, setnavClass] = useState("");
  const [showButton, setShowButton] = useState(false);

  // Use ComponentDidMount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.addEventListener("scroll", scrollNavigation, true);
  }, []);

  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 80) {
      setimglight(false);
      setnavClass("nav-sticky");
    } else {
      setimglight(true);
      setnavClass("");
    }
  }

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false);
    };

    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      {/* import navbar */}
      <Navbar navClass={navClass} imglight={imglight} isSimple={true} />

      {showButton && (
        <button
          className="fixed bottom-5 right-7 z-50 cursor-pointer p-4"
          onClick={handleScrollToTop}
        >
          <div className="event-up-icon">
            <i className="bx bx-up-arrow-circle h1 up-arrow-icon text-primary"></i>
          </div>
        </button>
      )}
      {/* Hero section */}
      <Section />


      {/* aboutus */}
      <AboutUs />

      {/* features */}
      <Features />

      {/* blog */}
      <Blog />

      <Events />

      {/* faqs */}
      <FAQs />

      {/* footer */}
      <Footer />
    </React.Fragment>
  );
};

export default CryptoIcoLanding;
