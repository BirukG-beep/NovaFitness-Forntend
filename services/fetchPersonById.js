export  const fetchPersonById = (id) => {
    return fetch(`http://localhost:4000/api/banks/user/${id}`)
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