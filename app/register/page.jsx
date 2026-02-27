"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { Register } from "@/services/Register";

function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const result = await Register(formData);

    if (!result) return; // stop if registration failed

    dispatch(
      setUser({
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        phone: formData.phone || "",
        userId: result.id || "",
        createdAt: result.createdAt || "",
      })
    );

    router.push("/user");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
          />
        </div>

      
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-200"
        >
          Register
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="w-full mt-4 py-3 border border-black text-black rounded-lg font-medium hover:bg-black hover:text-white transition duration-200"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;