export const getUser = async (id) => {
  try {
    const res = await fetch(`https://novabackend-kyw2.onrender.com/api/auth/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await res.json(); // ✅ await this
    return data; // ✅ return it
  } catch (err) {
    console.log(err);
    return null;
  }
};