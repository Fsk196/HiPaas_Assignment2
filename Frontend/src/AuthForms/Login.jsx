import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .min(3, "Email must be at least 3 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password must be at most 15 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.status === 400) {
        setIsInvalid(true);
      }
      if (res.ok && result.user) {
        localStorage.setItem("token", result.token);
        if (result.user.role === "user") {
          dispatch(loginUser(result.user));
          navigate("/");
        } else if (result.user.role === "admin") {
          dispatch(loginUser(result.user));
          navigate("/admin");
        }
      } else {
        console.log("Invalid credentials");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error occurred during login: ", error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="text-white w-full flex  h-screen bg-white">
        <div className="relative bg-[#005BD2] md:w-[80%] sm:w-[80%]  mx-2 my-2 rounded-lg hidden sm:block px-4">
          <h1 className="text-3xl absolute top-12 left-5 font-medium">
            HiPaaS
          </h1>

          <div className="absolute top-1/3 left-5">
            <h2 className="text-5xl font-semibold">Welcome back</h2>
            <h2 className="text-5xl font-semibold"></h2>
            <div className="w-[80%]">
              <p className="text-lg font-normal text-[#E3E3E3]/70">
                All in one solution to your business
              </p>
              <p className="text-lg font-normal text-[#E3E3E3]/70">
                Form a new company from a scratch or onboard your existing
                company
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-full flex justify-center sm:items-center items-start ">
          <div className=" absolute top-0 left-0 sm:hidden bg-[#005BD2] w-full h-40">
            <h2 className="absolute top-4 left-4 text-xl font-medium text-white">
              HiPaaS
            </h2>
            <h2 className="absolute text-2xl top-14 left-4  font-semibold text-white">
              Welcome back
            </h2>
            <p className="absolute top-24 left-4 text-sm font-normal text-[#E3E3E3]/80 pr-3 my-1">
              Form a new company from a scratch or onboard your existing company
            </p>
          </div>

          <div className="sm:w-[60%] w-[80%] absolute top-1/4 sm:top-1/3">
            <h2 className="text-black mb-5 text-xl text-center">
              Login to continue
            </h2>
            <div></div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="text-[14px] text-[#8D8D8D]">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="text-sm bg-transparent border border-[#4454FF]/40 rounded-md text-black px-2 focus:outline-none py-3 shadow-md"
                  {...register("email", {
                    required: true,
                  })}
                />
                {isInvalid ? (
                  <p className="text-sm text-red-600">Invalid credentials</p>
                ) : (
                  <p className="text-sm text-red-600">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[14px] text-[#8D8D8D]">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="text-sm bg-transparent border border-[#4454FF]/40 rounded-md text-black px-2 focus:outline-none py-3 shadow-md"
                  {...register("password", {
                    required: true,
                  })}
                />
                <p className="text-sm text-red-600">
                  {errors.password?.message}
                </p>
              </div>
              {loading ? (
                <button className="bg-[#005BD2] text-xl py-2 px-4 rounded-md w-full hover:bg-[#005BD2]/90 shadow-lg flex gap-2 justify-center items-center">
                  <h2>Login</h2>
                  <div className="animate-spin w-5 h-5 border-2 rounded-full border-r-gray-300 border-b-gray-400 border-l-gray-600 border-t-gray-900 "></div>
                </button>
              ) : (
                <button className="bg-[#005BD2] text-xl py-2 px-4 rounded-md w-full hover:bg-[#005BD2]/90 shadow-lg">
                  Login
                </button>
              )}
            </form>
            <div className="w-full text-center my-4">
              <Link to="/register" className="text-[#005BD2] ">
                Don't have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
