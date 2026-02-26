"use client";

const TimeLine = ({ options = [], value, onChange }) => {
  const len = options.length;
  const index = options.findIndex((opt) => opt.value === value);
  const containerWidth = 90; // in px, matching w-[200px]
  const halfCirclePx = 12 / 2; // 0.75rem * 16px/rem / 2
  const offsetPct = (halfCirclePx / containerWidth) * 100;

  let activeWidth = 0;
  if (len > 1 && index >= 0) {
    activeWidth = (index / (len - 1)) * (100 - 2 * offsetPct);
  }

  return (
    <div className="w-full flex justify-center ">
      <div className="relative w-[200px]">

        {/* Background Line */}
        <div
          className="absolute top-1 h-1 bg-gray-300 rounded"
          style={{
            left: `${offsetPct}%`,
            right: `${offsetPct}%`,
          }}
        ></div>

        {/* Active Line */}
        <div
          className="absolute top-1 h-1 bg-blue-600 rounded transition-all duration-300"
          style={{
            left: `${offsetPct}%`,
            width: `${activeWidth}%`,
          }}
        ></div>

        {/* Circles */}
        <div className="flex justify-between relative">
          {options.map((option) => {
            const isActive = value === option.value;

            return (
              <div
                key={option.value}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => onChange(option.value)}
              >
                <div
                  className={`h-3 w-3 rounded-full transition-all duration-300
                    flex items-center justify-center
                    ${
                      isActive
                        ? "bg-blue-600 scale-110"
                        : "bg-gray-400"
                    }`}
                ></div>

                <span
                  className={`text-xs mt-2 capitalize transition-all duration-300 ${
                    isActive ? "text-blue-600 font-semibold" : "text-gray-500"
                  }`}
                >
                  {option.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;