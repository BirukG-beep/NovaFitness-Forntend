// services/login.ts
import { toast } from "sonner";

export const payment = async (userId) => {
  const toastId = toast.loading("Processing payment...");

  try {
    const res = await fetch(`http://localhost:4000/api/payment/${userId}`);

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Login failed");
    }

    toast.success("Month sccessful!", { id: toastId });

    return result; // return the successful response (user/token/etc.)

  } catch (err) {
    toast.error(err.message || "Login failed", { id: toastId });
    throw err; // re-throw so caller can handle if needed
  }
};
export const allpayment = async (year) => {
  const toastId = toast.loading("Processing payment...");

  try {
    const res = await fetch(`http://localhost:4000/api/payment?year=${year}`,{
         method: "POST",
         headers: {
        "Content-Type": "application/json",
      }
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Login failed");
    }

    toast.success("Month sccessful!", { id: toastId });

    return result; // return the successful response (user/token/etc.)

  } catch (err) {
    toast.error(err.message || "Login failed", { id: toastId });
    throw err; // re-throw so caller can handle if needed
  }
};