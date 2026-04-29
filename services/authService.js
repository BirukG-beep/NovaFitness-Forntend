const API_URL = "https://novabackend-kyw2.onrender.com/api/auth";

export const getUsers = async () => {
  const res = await fetch(`${API_URL}`);
  console.log(res)
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const resetPassword = async (phone, password) => {
  const res = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, password }),
  });

  if (!res.ok) throw new Error("Failed to reset password");

  const data = await res.json();
  return data;
};