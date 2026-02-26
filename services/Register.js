import { toast } from "sonner";

export const Register = async (data) => {
  try {
    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log("registered data", result);

    if (result.message === "Email or Phone already registered") {
      toast.error("Email or Phone already registered");
      return null;
    }

    toast.success("Register successful!");

    return {
      id: result.user._id,
      createdAt: result.user.createdAt,
    };

  } catch (err) {
    console.error("Error:", err);
    toast.error("Something went wrong");
    return null;
  }
};