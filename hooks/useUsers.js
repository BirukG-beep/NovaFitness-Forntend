import { useEffect, useState } from "react";
import { getUsers } from "@/services/authService";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data.users))
      .catch((err) => console.error(err));
  }, []);

  return { users };
};