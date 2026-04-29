import React from "react";

const StepCard = ({ step, image, title, description, reverse }) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center gap-10 mb-20`}
    >
      {/* Image */}
      <div className="md:w-1/2">
        <img
          src={image}
          alt={title}
          className="rounded-2xl shadow-xl w-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">
          Step {step}
        </h2>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
