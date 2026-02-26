// services/login.ts
import { toast } from "sonner";

export const paymentAll = async () => {
  const toastId = toast.loading("Processing payment...");

  try {
    const res = await fetch(`http://localhost:4000/api/auth/`);

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Login failed");
    }

    toast.success("Month sccessful!", { id: toastId });

    return result.users; // return the successful response (user/token/etc.)

  } catch (err) {
    toast.error(err.message || "Login failed", { id: toastId });
    throw err; // re-throw so caller can handle if needed
  }
};