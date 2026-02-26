import { toEthiopian } from "ethiopian-date";

// Accept either a single Date or an array of Dates
export const todayCalculator = (dates) => {
  if (!Array.isArray(dates)) {
    // single date case
    const today = dates;
    return toEthiopian(today.getFullYear(), today.getMonth() + 1, today.getDate());
  }

  // array of dates case
  return dates.map((date) =>
    toEthiopian(date.getFullYear(), date.getMonth() + 1, date.getDate())
  );
};