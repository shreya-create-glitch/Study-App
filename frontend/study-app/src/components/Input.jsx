import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Input = ({ onClose }) => {
  const [signup, setsignup] = useState(false);

  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    targetRole: "",
    topics: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const endpoint = signup ? "signup" : "login";

    try {
      let payload = data;

      // Signup ke time topics string -> array
      if (signup) {
        payload = {
          ...data,
          topics: data.topics
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        };
      }

      const res = await axios.post(
        `https://study-app-2-82ch.onrender.com/user/${endpoint}`,
        payload
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);

      toast.success(
        signup ? "Signup successful!" : "Login successful!"
      );

      onClose();

    } catch (error) {
      if (error.response) {
        setError(error.response.data?.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handlesubmit} className="flex flex-col gap-4">
      <Toaster />

      <h2 className="text-xl font-bold text-center">
        {signup ? "Signup" : "Login"}
      </h2>

      {signup && (
        <>
          <div className="flex flex-col">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>

          <div className="flex flex-col">
            <label>Target Role</label>
            <input
              type="text"
              name="targetRole"
              placeholder="SDE / Frontend Developer"
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>

          <div className="flex flex-col">
            <label>Topics</label>
            <input
              type="text"
              name="topics"
              placeholder="DSA, DBMS, React"
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>
        </>
      )}

      <div className="flex flex-col">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />
      </div>

      <div className="flex flex-col">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />
      </div>

      <p
        className="cursor-pointer text-blue-400"
        onClick={() => {
          setsignup((prev) => !prev);
          setError(null);
        }}
      >
        {signup
          ? "Already have an account?"
          : "Create New Account"}
      </p>

      {error && (
        <p className="bg-red-700 text-white p-2 rounded">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
      >
        {signup ? "Signup" : "Login"}
      </button>
    </form>
  );
};

export default Input;