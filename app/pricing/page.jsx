import HeroPages from "@/components/hero-pages/HeroPages";
import PricingCards from "@/components/pricing/PricingCards";
import NavBar from "@/components/navigation/Navbar";
import Fotter from "@/components/footer/Footer";
function Pricing() {
  return (
    <main>
      <NavBar />
      <HeroPages page="Pricing" />

      <PricingCards />
      <Fotter />
    </main>
  );
}
export default Pricing;
