"use client";

const CoachCard = ({ coach }) => {
  const Icon = coach.icon;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300 border border-gray-100">
      <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 rounded-full mb-4">
        <Icon className="text-gray-700 text-2xl" />
      </div>

      <h3 className="text-xl font-bold text-gray-700 text-center mb-2">
        {coach.name}
      </h3>

      <p className="text-sm text-gray-700 text-center font-medium mb-3">
        {coach.role}
      </p>

      <p className="text-gray-600 text-sm text-center">
        {coach.description}
      </p>
    </div>
  );
};

export default CoachCard;