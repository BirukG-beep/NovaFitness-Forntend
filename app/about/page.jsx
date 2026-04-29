// app/about/page.js     ← .js is fine!
import HeroPages from "@/components/hero-pages/HeroPages";
import WhoWeAre from "@/components/about-page/who-we-are/WhoWeAre";
import History from "@/components/about-page/history/History";
import NavBar from "@/components/navigation/Navbar";
import Fotter from "@/components/footer/Footer"; // ← probably meant Footer?

import { Metadata } from "next"; // works in .js too!

export const metadata = {
  title: "About Us",
  description:
    "Discover Nova Fitness Center – your local gym with expert personal trainers, group fitness classes, modern equipment, and a welcoming community focused on health and results.",
  openGraph: {
    title: "About Nova Fitness Center | Gym & Personal Training",
    description:
      "Learn about our story, mission, experienced team, and what makes Nova the best fitness destination in town.",
    url: "https://novafitnesscenter.com/about",
    images: [
      {
        url: "/about-og.jpg", // add this 1200×630 image in /public/
        width: 1200,
        height: 630,
        alt: "Nova Fitness Center gym interior and team",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nova Fitness Center",
    images: ["/about-og.jpg"],
  },
  alternates: {
    canonical: "/about",
  },
  // Optional – usually inherited from root layout, but you can override
  robots: {
    index: true,
    follow: true,
  },
};

function About() {
  return (
    <main >
      <NavBar />
      <HeroPages page="About" />
      <WhoWeAre />
      <History />
      <Fotter /> {/* Fix typo → <Footer /> if it's a typo */}
    </main>
  );
}

export default About;