// services/login.ts
import { toast } from "sonner";

export const Login = async (credentials) => {
  const toastId = toast.loading("Logging in...");

  try {
    const res = await fetch("https://novabackend-kyw2.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),  // ← fixed: use credentials param
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Login failed");
    }

    toast.success("Login successful!", { id: toastId });

    return result; // return the successful response (user/token/etc.)

  } catch (err) {
    toast.error(err.message || "Login failed", { id: toastId });
    throw err; // re-throw so caller can handle if needed
  }
};