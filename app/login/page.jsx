"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/services/login"; 
import { useDispatch } from "react-redux";
import {setUser} from "@/redux/userSlice";
const LoginPage = () => {
  //for routers
  const router = useRouter();
  //for redux state
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // nice UX addition

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!phone.trim()) {
      setError("Please provide phone number");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      setIsLoading(false);
      return;
    }

    // Choose identifier: prefer email if both are filled (or change logic as needed)
    const identifier = phone.trim();

    const payload = {
      identifier,
      password,
    };

    try {
  const result = await Login(payload);
  if (result.status) {

    const userData = result.user;

    dispatch(setUser({
      firstName: userData.firstName || "",
      lastName: userData.lastName  || "",
      phone:    userData.phone     || "",
      userId:   userData._id    || "",
      createdAt: userData.createdAt || ""
    }));

    if (userData.phone === "0987654321") {
      router.push("/admin");
    } else {
      router.push("/user");
    }
  }
} catch (err) {
  console.error("Login fetch / parse error:", err);
  setError("Login failed — check console for details");
} finally {
  setIsLoading(false);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xs w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4 text-gray-800 placeholder:text-gray-500 placeholder:opacity-100 focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-3 rounded-lg mb-4 text-gray-800 placeholder:text-gray-500 placeholder:opacity-100 focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 text-white rounded-md transition ${
              isLoading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* <button
            type="button"
            onClick={() => router.push("/forget-password")}
            className="w-full mt-3 underline text-gray-500 hover:text-gray-700"
          >
            Forget Password
          </button> */}

          <button
            type="button"
            onClick={() => router.push("/register")}
            className="w-full mt-3 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;