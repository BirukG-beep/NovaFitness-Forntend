"use client";

const DueBadge = ({ createdAt }) => {
  const today = new Date();
  const created = new Date(createdAt);

  const diffDays = Math.floor(
    (today - created) / (1000 * 60 * 60 * 24)
  );

  const isDue = diffDays > 30;

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        isDue
          ? "bg-red-100 text-red-600"
          : "bg-green-100 text-green-600"
      }`}
    >
      {isDue ? "Due" : "Active"}
    </span>
  );
};

export default DueBadge;