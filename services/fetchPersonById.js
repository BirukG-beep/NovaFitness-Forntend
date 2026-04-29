export  const fetchPersonById = (id) => {
    return fetch(`https://novabackend-kyw2.onrender.com/api/banks/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched person data:", data);
        return data;
      })
      .catch((err) => {
        console.error("Error fetching person by ID:", err);
        throw err;
      });
}