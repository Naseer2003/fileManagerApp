import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const LoginPage: React.FC = () => {
  const userContext = useContext(UserDataContext);

  if (!userContext) {
    throw new Error("LoginPage must be used within a UserContext provider");
  }

  const { serverUrl } = userContext;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${serverUrl}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      navigate("/home");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full bg-white flex justify-center items-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="bg-gradient-to-t from-[#f3e7e9] via-[#e3eeff] to-[#e3eeff] p-6 rounded-xl shadow-lg w-full max-w-md relative z-10"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {!showPassword && (
            <FaRegEye
              className="absolute right-[20px] top-[15px] text-gray-600 w-[25px] h-[25px] cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
          {showPassword && (
            <FaRegEyeSlash
              className="absolute right-[20px] top-[15px] text-gray-600 w-[25px] h-[25px] cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition mb-15"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className='text-black text-[15px] cursor-pointer ml-20 mt-5'>Hey are you New here ? <span className='text-blue-400' onClick={() => navigate("/signup")}>Sign Up</span></p>
      </form>
    </div>
  );
};

export default LoginPage;
