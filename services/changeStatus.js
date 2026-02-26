const changeStatus = async (userId, month, newStatus) => {
  try {
    // setLoading(true);
    const res = await fetch("https://novabackend-kyw2.onrender.com/api/payment/updatePaymentStatus", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, month, status: newStatus }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data.message);
      return;
    }

    // ✅ Update frontend state if backend confirms
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u._id === userId
          ? { ...u, months: { ...u.months, [month]: newStatus } }
          : u
      )
    );
  } catch (error) {
    console.error("Error updating status:", error);
  } finally {
    // setLoading(false);
  }
};