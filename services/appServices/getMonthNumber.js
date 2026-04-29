const months = [
  "Meskerem",
  "Tikimt",
  "Hidar",
  "Tahsas",
  "Tir",
  "Yekatit",
  "Megabit",
  "Miazia",
  "Ginbot",
  "Sene",
  "Hamle",
  "Nehase",
];

// Function to get month number
export const  getMonthNumber = (monthName) => {
  const index = months.findIndex((m) => m === monthName);
  return index !== -1 ? index + 1 : null; // return null if month not found
}

// Usage examples:
console.log(getMonthNumber("Meskerem")); // 1
console.log(getMonthNumber("Nehase"));   // 12
console.log(getMonthNumber("Invalid"));  // null