// app/pricing/page.js
import HeroPages from "@/components/hero-pages/HeroPages";
import PricingCards from "@/components/pricing/PricingCards";
import NavBar from "@/components/navigation/Navbar";
import Fotter from "@/components/footer/Footer"; // ← probably should be Footer

import { Metadata } from "next";

export const metadata = {
  title: "Pricing & Membership Plans",
  description:
    "Explore affordable membership options at Nova Fitness Center. Choose from monthly, quarterly, or annual plans with access to gym, classes, and personal training. Transparent pricing – no hidden fees.",
  keywords: [
    "nova fitness pricing",
    "nova fitness membership plans",
    "gym membership cost",
    "nova fitness center prices",
    "personal training pricing",
    "fitness membership plans",
    "affordable gym membership",
  ],
  openGraph: {
    title: "Pricing & Membership Plans | Nova Fitness Center",
    description:
      "Find the perfect membership for your fitness goals. Monthly, quarterly, annual plans with full gym access, group classes & expert personal trainers.",
    url: "https://novafitnesscenter.com/pricing",
    images: [
      {
        url: "/pricing-og.jpg",           // ← recommended: 1200×630 image in /public/
        width: 1200,
        height: 630,
        alt: "Nova Fitness Center membership pricing plans and gym facilities",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Fitness Center Pricing & Plans",
    description:
      "Transparent and flexible membership pricing – join today and start your transformation.",
    images: ["/pricing-og.jpg"],
  },
  alternates: {
    canonical: "/pricing",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function Pricing() {
  return (
    <main>
      <NavBar />
      <HeroPages page="Pricing" />
      
      {/* Optional: Add a clear H1 for on-page SEO */}
      <div className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Membership Plans & Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the plan that fits your goals and budget. All memberships include full gym access, group classes, and premium amenities.
          </p>
        </div>
      </div>

      <PricingCards />

      <Fotter /> {/* ← Rename to <Footer /> if it's a typo */}
    </main>
  );
}

export default Pricing;