"use client";
import { signUpForm } from "@/types/types";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { signupUser } from "../actions/user.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [formData, setformData] = useState<signUpForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client side validation
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      return toast.error("All fields are require");
    }
    if (formData.confirmPassword != formData.password) {
      return toast.error("Password and confirm password does't match");
    }
    const response = await signupUser(formData);
    if (response.success) {
      toast.success(response.message);
      setformData({ name: "", password: "", email: "", confirmPassword: "" });
      router.push("/login");
    } else {
      toast.error(
        response?.response?.data?.message || "Error while creating user account"
      );
    }
  };
  return (
    <div className="absolute top-0 z-[-2] w-full bg-[rgb(0,0,0)] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] h-screen">
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Create Your Account
        </div>
        <form className="py-4 px-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleInputChange}
              value={formData.confirmPassword}
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
