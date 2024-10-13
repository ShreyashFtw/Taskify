import React, { useEffect, useState } from "react"; // Import useState
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import SelectList from "../components/SelectList";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";

const ROLES = [
  "Admin",
  "User",
  "Manager",
  "Analyst",
  "Designer",
  "Developer",
  "Support",
]; // Available roles

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  // State for the selected role
  const [selectedRole, setSelectedRole] = useState(ROLES[0]); // Default role

  const submitHandler = async (data) => {
    try {
      const result = await registerUser({ ...data, role: selectedRole }).unwrap(); // Include selected role in data
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col bg-[#f3f4f6]">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white p-10"
      >
        <p className="text-blue-400 text-3xl font-bold text-center">
          Create an Account
        </p>

        {/* Title Field */}
        <Textbox
          placeholder="Software Engineer"
          label="Title"
          name="title"
          register={register("title", { required: "Title is required!" })}
          errors={errors.title?.message}
        />

        {/* Role Dropdown */}
        <SelectList
          label="Role"
          lists={ROLES} // List of available roles
          selected={selectedRole} // Use state for selected role
          setSelected={(role) => {
            setSelectedRole(role); // Update the selected role
            register("role").onChange({ target: { value: role } }); // Handle role selection
          }}
        />

        {/* Name Field */}
        <Textbox
          placeholder="John Doe"
          label="Name"
          name="name"
          register={register("name", { required: "Name is required!" })}
          errors={errors.name?.message}
        />

        {/* Email Field */}
        <Textbox
          placeholder="email@example.com"
          type="email"
          label="Email Address"
          name="email"
          register={register("email", { required: "Email is required!" })}
          errors={errors.email?.message}
        />

        {/* Password Field */}
        <Textbox
          placeholder="your password"
          type="password"
          label="Password"
          name="password"
          register={register("password", { required: "Password is required!" })}
          errors={errors.password?.message}
        />

        {/* Is Admin Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAdmin"
            {...register("isAdmin")}
            className="mr-2"
          />
          <label htmlFor="isAdmin" className="text-gray-700">
            Is Admin
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          label={isLoading ? "Creating..." : "Register"}
          className="w-full h-10 bg-blue-600 text-white rounded-full"
        />
      </form>
    </div>
  );
};

export default Register;
