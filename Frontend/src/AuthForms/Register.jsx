import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userExist, setUserExist] = useState(false);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be at most 15 characters"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required()
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password must be at most 15 characters"),
    role: yup.string().required("Role is required"),
    companyname: yup.string().required("Company name is required."),
    age: yup.number().required().typeError("Age must be number"),
  });

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleNext = async () => {
    let isValid;

    if (currentStep === 1) {
      isValid = await trigger(["name", "email", "password"]);
    } else if (currentStep === 2) {
      isValid = await trigger(["companyname", "role"]);
    }

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res.status);

      if (res.status === 400) {
        const result = await res.json();
        if (result.error === "User already exists") {
          setUserExist(true);
        }
      }

      if (res.ok === true) {
        const result = await res.json();
        console.log("Result are: ", result);
        localStorage.setItem("token", result.token);
        dispatch(registerUser(data));
        navigate(result.user.role === "admin" ? "/admin" : "/");
      }
    } catch (error) {
      console.log("Error occurred during registration:", error);
    }
  };

  const watchedValues = watch();
  return (
    <>
      <div className="relative flex w-full h-screen flex-row bg-white text-white">
        <div className="relative bg-[#005BD2] w-[80%] mx-2 my-2 rounded-lg hidden lg:block">
          <h1 className="text-3xl absolute top-12 left-5 font-medium">
            HiPaaS
          </h1>

          <div className="absolute top-1/3 left-5">
            <h2 className="text-5xl font-semibold">Start Your</h2>
            <h2 className="text-5xl font-semibold">Journey with us</h2>
            <div className="w-[80%]">
              <p className="text-xl font-normal text-[#E3E3E3]/80">
                All in one solution to your business
              </p>
              <p className="text-xl font-normal text-[#E3E3E3]/80">
                Form a new company from a scratch or onboard your existing
                company
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 z-10 bg-[#005BD2] h-40 w-full lg:hidden">
          <h2 className="absolute top-2 left-4 text-xl font-medium text-white">
            HiPaaS
          </h2>
          <h2 className="absolute text-2xl top-12 left-4 font-semibold text-white">
            Start Your Journey with us
          </h2>
          <div className="w-[80%] absolute top-24 left-4">
            <p className="text-sm font-normal text-[#E3E3E3]/70">
              All in one solution to your business
            </p>
            <p className="text-sm font-normal text-[#E3E3E3]/70">
              Form a new company from a scratch or onboard your existing company
            </p>
          </div>
        </div>

        <div className="relative top-10 sm:top-0 bg-white w-full mx-2 my-2 flex justify-center items-center">
          <div className="w-full md:w-[80%] lg:w-[60%] px-10 flex justify-center items-center flex-col">
            <h1 className="text-black text-xl text-start">Let's get started</h1>
            <div className="my-4 w-full">
              <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                  {currentStep === 1 && (
                    <>
                      <div className="w-full flex justify-between flex-col sm:flex-row mb-5 gap-4">
                        <div className="flex flex-col gap-1 w-full">
                          <label className="text-[14px] text-[#8D8D8D] hidden sm:block">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="text-sm w-full bg-transparent border border-[#4454FF]/40 rounded-md text-black px-2 focus:outline-none py-3 shadow-md"
                            {...register("name", {
                              required: true,
                              minLength: 4,
                              maxLength: 20,
                            })}
                          />
                          <p className="text-sm text-red-600">
                            {errors.name?.message}
                          </p>
                        </div>
                      </div>

                      <div className="w-full flex justify-between mb-5  gap-4">
                        <div className="flex w-full flex-col gap-1">
                          <label className="text-[14px] text-[#8D8D8D] hidden sm:block">
                            Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            placeholder="email"
                            className="text-sm w-full bg-transparent border border-[#4454FF]/40 rounded-md text-black px-2 focus:outline-none py-3 shadow-md"
                            {...register("email", { required: true })}
                          />
                          {userExist ? (
                            <p className="text-sm text-red-600">
                              Email already exists.
                            </p>
                          ) : (
                            <p className="text-sm text-red-600">
                              {errors.email?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="w-full flex flex-col sm:flex-row  justify-between mb-5  gap-4">
                        <div className="flex w-full flex-col gap-1">
                          <label className="text-[14px] text-[#8D8D8D] hidden sm:block">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            placeholder="password"
                            className="text-sm w-full bg-transparent border border-[#4454FF]/40 rounded-md text-black px-2 focus:outline-none py-3 shadow-md"
                            {...register("password", { required: true })}
                          />
                          <p className="text-sm text-red-600">
                            {errors.password?.message}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <div className="w-full flex flex-col sm:flex-row  justify-between mb-5  gap-4">
                        <div className="flex w-full flex-col gap-1">
                          <label className="text-[14px] text-[#8D8D8D] hidden sm:block">
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="text"
                            placeholder="Company Name"
                            className="text-sm w-full bg-transparent border border-[#4454FF]/40 rounded-md text-black px-2 focus:outline-none py-3 shadow-md"
                            {...register("companyname", { required: true })}
                          />
                          <p className="text-sm text-red-600">
                            {errors.companyname?.message}
                          </p>
                        </div>

                        <div className="flex w-full flex-col gap-1">
                          <label className="text-[14px] text-[#8D8D8D] hidden sm:block">
                            Age
                          </label>
                          <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            className="text-sm w-full bg-transparent border border-[#4454FF]/40 rounded-md text-black px-2 focus:outline-none py-3 shadow-md"
                            {...register("age", { required: true })}
                          />
                          <p className="text-sm text-red-600">
                            {errors.age?.message}
                          </p>
                        </div>
                      </div>

                      <div className="w-full flex flex-col sm:flex-row  justify-between mb-5  gap-4">
                        <div className="flex w-full flex-col gap-1">
                          <label className="text-[14px] text-[#8D8D8D] hidden sm:block">
                            Role
                          </label>
                          <select
                            {...register("role", { required: true })}
                            className="text-sm w-full bg-transparent border border-[#4454FF]/40 rounded-md text-black px-2 focus:outline-none py-3 shadow-md"
                            placeholder="Enter your role"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select your role
                            </option>
                            <option
                              className="w-full p-2 border border-[#E9E9E9]"
                              value="user"
                            >
                              User
                            </option>
                            <option
                              className="w-full p-2 border border-[#E9E9E9]"
                              value="admin"
                            >
                              Admin
                            </option>
                          </select>
                          <p className="text-sm text-red-600">
                            {errors.role?.message}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      {/* Form Submit button */}
                      <h2 className="text-lg font-medium text-center text-red-500">
                        Please Review your information
                      </h2>

                      <div className="text-black my-6">
                        <p className="text-gray-700">
                          <span className="text-[#005BD2] font-medium">
                            Name:
                          </span>{" "}
                          {watchedValues.name}
                        </p>
                        <p className="text-gray-700">
                          <span className="text-[#005BD2] font-medium">
                            Email:
                          </span>{" "}
                          {watchedValues.email}
                        </p>
                        <p className="text-gray-700">
                          <span className="text-[#005BD2] font-medium">
                            Password:
                          </span>{" "}
                          {watchedValues.password}
                        </p>{" "}
                        {/* Consider hiding this for security */}
                        <p className="text-gray-700">
                          <span className="text-[#005BD2] font-medium">
                            Company Name:
                          </span>{" "}
                          {watchedValues.companyname}
                        </p>
                        <p className="text-gray-700">
                          <span className="text-[#005BD2] font-medium">
                            Age:
                          </span>{" "}
                          {watchedValues.age}
                        </p>
                        <p className="text-gray-700">
                          <span className="text-[#005BD2] font-medium">
                            Role:
                          </span>{" "}
                          {watchedValues.role}
                        </p>
                      </div>
                    </>
                  )}

                  {userExist && (
                    <div className="text-xl text-red-600 mb-4 text-center">Email already exists please use different email</div>
                  )}

                  <div className="w-full flex justify-between items-center">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        className="bg-gray-400 text-white py-2 px-4 rounded"
                        onClick={handlePrev}
                      >
                        Prev
                      </button>
                    )}

                    {currentStep < 3 && (
                      <button
                        type="button"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    )}

                    {currentStep === 3 && (
                      <button
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        type="submit"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="w-full text-center">
                <Link to="/login" className="my-4 text-[#005BD2]">
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
