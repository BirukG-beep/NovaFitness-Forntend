export const dueDateCalculator = (
  todayDay,
  todayMonth,
  lastPaymentMonth,
  lastPaymentYear,
  todayYear,
  registerDate
) => {
  let overdue = 0;

  console.log("we are caculator for overdue")

  console.log(registerDate , todayDay)
 console.log(todayDay,
  todayMonth,
  lastPaymentMonth,
  lastPaymentYear,
  todayYear,
  registerDate)
  // 🔹 If payment was in previous year
  if (lastPaymentYear < todayYear) {
   
    const yearDiff = todayYear - lastPaymentYear;
    const yearDays = yearDiff * 360;

    const monthDiff = 12 - lastPaymentMonth + todayMonth;
    const monthDays = monthDiff * 30;

    const dayDiff = todayDay - registerDate;

    overdue = yearDays + monthDays + dayDiff;
  } 
  // 🔹 Same year
  else {
    console.log("pay")
     console.log(lastPaymentYear)
    console.log(todayMonth , lastPaymentMonth)
    const monthDiff = todayMonth - lastPaymentMonth;
    const monthDays = monthDiff * 30;

    overdue = monthDays + (todayDay - registerDate);
  }

  console.log(overdue)
  return overdue > 0 ? overdue : 0;
};