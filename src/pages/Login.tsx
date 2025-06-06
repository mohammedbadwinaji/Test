import React, { useContext, useState } from "react";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { isEmailValid, isPasswordValid } from "../utils/formValidation";
import Button from "../components/core/Button";
import { UserContext } from "../contexts/UserContextProvider";
import { Navigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email: string | null;
    password: string | null;
  }>({ email: null, password: null });

  const [showPassword, setShowPassword] = useState(false);

  const { token, setToken } = useContext(UserContext);

  if (token) {
    return <Navigate to={"/admin/dashboard"} />;
  } else {
    setToken("TOKEN");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors: { email: string | null; password: string | null } = {
      email: "",
      password: "",
    };
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isEmailValid(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!isPasswordValid(formData.password)) {
      newErrors.password =
        "Password must be at least 8 character,contains numbers, lower and capital letter";
    }
    setErrors(newErrors);
    const result = newErrors.email === "" && newErrors.password === "";
    return result;
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log(formData?.email);
    // console.log(isEmailValid(formData.email))
    e.preventDefault();
    if (validate()) {
      // Submit form data
      console.log("Login form submitted:", formData);
      // Reset form or show success message as needed
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0   flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-xl  shadow-black/30 w-full max-w-md tablet:max-w-lg ">
        <h2 className="text-center font-bold text-3xl mb-6">Login</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400
                 ${
                   errors?.email
                     ? "border-red-500 focus:ring-1 focus:ring-red-400"
                     : "border-gray-300"
                 }
                 ${
                   errors.email === ""
                     ? "border-green-500 focus:ring-1 focus:ring-green-400"
                     : "border-gray-300"
                 }`}
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email Address"
              name="email"
              id="email"
            />
            {errors?.email && (
              <p className="text-red-600 text-sm mt-1 font-semibold">
                {errors.email}
              </p>
            )}
            {errors.email === "" && (
              <p className="text-green-600 text-sm mt-1 font-semibold">
                Valid email
              </p>
            )}
          </div>

          <div className="mb-6 relative">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`border rounded w-full p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-400 
                ${
                  errors?.password
                    ? "border-red-500 focus:ring-1 focus:ring-red-400"
                    : "border-gray-300"
                }
                 ${
                   errors.password === ""
                     ? "border-green-500 focus:ring-1 focus:ring-green-400"
                     : "border-gray-300"
                 }
              }`}
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Complex Password"
              name="password"
              id="password"
            />
            <Button
              type="icon"
              onClick={toggleShowPassword}
              className="absolute right-2 top-8 text-black/70 transition  hover:text-black focus:outline-none"
              icon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            />

            {errors?.password && (
              <p className="text-red-600 text-sm mt-1 font-semibold">
                {errors.password}
              </p>
            )}
            {errors.password === "" && (
              <p className="text-green-600 text-sm mt-1 font-semibold">
                Valid password
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black/90 hover:bg-black cursor-pointer text-white font-semibold py-2 rounded transition-colors duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
