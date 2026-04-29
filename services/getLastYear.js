export const getLastYear = async (id) => {
  try {
    const res = await fetch(`https://novabackend-kyw2.onrender.com/api/payment/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    // ✅ safety checks
    if (!data?.payment || data.payment.length === 0) {
      console.warn(`No payment data for user ${id}`);
      return 0; // or null if you prefer
    }

    const rawYear = data.payment[0]?.eth_year;

    const lastYear = Number(rawYear);

    if (isNaN(lastYear)) {
      console.warn(`Invalid year for user ${id}:`, rawYear);
      return 0;
    }

    return lastYear;

  } catch (err) {
    console.error(`Error fetching last year for user ${id}:`, err);
    return 0; // ✅ IMPORTANT: don't return null
  }
};