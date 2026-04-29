// app/description/page.js    ← or wherever this file is (e.g. app/how-it-works/page.js for better URL)
import React from "react";
import StepCard from "@/components/StepCard";
import HeroPages from "@/components/hero-pages/HeroPages";
import NavBar from "@/components/navigation/Navbar";
import Fotter from "@/components/footer/Footer"; // ← fix to Footer if typo

import { Metadata } from "next";

export const metadata = {
  title: "How It Works - Join Nova Fitness Center",
  description:
    "Easy 4-step membership process at Nova Fitness Center: Register your account, choose your plan, make secure payment, and upload receipt for instant verification. Start your fitness journey today!",
  keywords: [
    "nova fitness membership",
    "how to join nova fitness",
    "gym membership process",
    "nova fitness signup steps",
    "fitness center registration",
    "gym payment and verification",
  ],
  openGraph: {
    title: "How It Works | Join Nova Fitness Center Easily",
    description:
      "Follow our simple 4-step process to become a member: register, select plan, pay securely, and upload proof. Get started with premium training and classes now.",
    url: "https://novafitnesscenter.com/description", // update if route is different (e.g. /how-it-works)
    images: [
      {
        url: "/how-it-works-og.jpg", // create 1200×630 image in /public/ (e.g. steps infographic or happy member)
        width: 1200,
        height: 630,
        alt: "Nova Fitness Center membership signup process steps",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works - Nova Fitness Center Membership",
    description:
      "Quick & secure way to join: Register → Choose Plan → Pay → Upload Receipt. Your fitness transformation starts here!",
    images: ["/how-it-works-og.jpg"],
  },
  alternates: {
    canonical: "/description", // change to "/how-it-works" if you rename the route/folder
  },
  robots: {
    index: true,
    follow: true,
  },
};

const DescriptionPage = () => {
  const steps = [
    {
      step: 1,
      title: "Register Account",
      image: "/register.png",
      description:
        "Create your gym account by providing basic information and selecting your membership plan.",
    },
    {
      step: 2,
      title: "Choose Payment Method",
      image: "/payment.png",
      description:
        "Select the plan that fits your goals and schedule.",
    },
    {
      step: 3,
      title: "Make Payment",
      image: "/insert.png",
      description:
        "Complete your payment securely using your preferred bank or mobile payment.",
    },
    {
      step: 4,
      title: "Upload Receipt",
      image: "/thanks.png",
      description:
        "Upload your payment proof for verification.",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <HeroPages page="How It Works" /> {/* Updated for better on-page heading/SEO */}
      <div className="px-6 md:px-20 py-16">
        <h1 className="text-4xl font-bold text-center mb-16 text-white">
          How It Works – Join Nova Fitness Center
        </h1>

        {steps.map((stepData, index) => (
          <StepCard
            key={index}
            {...stepData}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>

      <Fotter /> {/* ← Consider renaming component to Footer */}
    </div>
  );
};

export default DescriptionPage;