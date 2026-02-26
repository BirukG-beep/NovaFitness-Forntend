import Hero from "../components/hero/Hero";
import WhoWeAre from "../components/who-we-are/WhoWeAre";
import FeaturedClass from "../components/featured-class/FeaturedClass";
import CallToAction from "../components/call-to-action/CallToAction";
import ChooseUs from "../components/choose-us/ChooseUs";
import PricingCards from "../components/pricing/PricingCards";
import CallToAction2 from "../components/call-to-action2/CallToAction2";
import NavBar from "../components/navigation/Navbar";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/ScrollToTop";
import CoachesSection from "../components/coachs/CoachesSection"
function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <WhoWeAre />
      <FeaturedClass />
      <CallToAction />
      <ChooseUs />
      <PricingCards />
      <CoachesSection />
      <CallToAction2 />
      <Footer />
      <ScrollToTop/>
    </main>
  );
}

export default Home;
