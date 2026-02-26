import React from "react";
import StepCard from "@/components/StepCard";
import HeroPages from "@/components/hero-pages/HeroPages";
import NavBar from "@/components/navigation/Navbar";
import Fotter from "@/components/footer/Footer";
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
   <HeroPages />
  <div className="px-6 md:px-20 py-16">
    <h1 className="text-4xl font-bold text-center mb-16 text-white">
      How It Works
    </h1>

    {steps.map((stepData, index) => (
      <StepCard
        key={index}
        {...stepData}
        reverse={index % 2 !== 0}
      />
    ))}
  </div>

  <Fotter />
</div>
  );
};

export default DescriptionPage;
