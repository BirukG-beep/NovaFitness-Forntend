import { useState } from "react";
import { resetPassword } from "../services/authService";

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleReset = async (phone, password) => {
    try {
      setLoading(true);
      const data = await resetPassword(phone, password);
      alert("Password updated successfully");
      return data; // ✅ return response
    } catch (error) {
      alert("Error resetting password");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleReset, loading };
};