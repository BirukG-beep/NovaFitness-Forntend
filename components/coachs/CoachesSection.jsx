"use client";

import CoachCard from "./CoachCard";
import Title from "./Title"
import { coaches } from "@/data/coaches";

const CoachesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
         <Title />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {coaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoachesSection;