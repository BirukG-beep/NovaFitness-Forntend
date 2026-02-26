import HeroPages from "@/components/hero-pages/HeroPages";
import Navbar from "@/components/navigation/Navbar";
import Fotter from "@/components/footer/Footer";
import ContactForm from "@/components/contact-page/ContactForm";
function Contact() {
  return (
    <main>
      <Navbar />
      <HeroPages page="Contact" />
      <ContactForm />
      <Fotter />

    </main>
  );
}

export default Contact;
