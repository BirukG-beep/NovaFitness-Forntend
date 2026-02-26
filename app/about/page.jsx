import HeroPages from "@/components/hero-pages/HeroPages";
import WhoWeAre from "@/components/about-page/who-we-are/WhoWeAre";
import History from "@/components/about-page/history/History";
import NavBar from "@/components/navigation/Navbar";
import Fotter from "@/components/footer/Footer";
function About() {
  return (
    <main>
      <NavBar/>
      <HeroPages page="About" />
      <WhoWeAre />
      <History />
      <Fotter />
    </main>
  );
}

export default About;
