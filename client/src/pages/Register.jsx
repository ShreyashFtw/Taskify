import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import SelectList from "../components/SelectList";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import Loading from "../components/Loader";

const ROLES = [
  "Admin",
  "User",
  "Manager",
  "Analyst",
  "Designer",
  "Developer",
  "Support",
];

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
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);

  const submitHandler = async (data) => {
    try {
      const result = await registerUser({
        ...data,
        role: selectedRole,
      }).unwrap();
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
    <div
      className="w-full min-h-screen flex items-center
   justify-center flex-col lg:flex-row bg-[#f3f4f6]"
    >
      <div
        className="w-full md:w-auto flex gap-0 md:gap-40 flex-col
        md:flex-row
   items-center justify-center"
      >
        {/* left side */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div
            className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center
    gap-5 md:gap-y-10 2xl:-mt-20"
          >
            <span
              className="flex
      gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300"
            >
              Manage all your tasks in one place!
            </span>
            <p
              className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black
            text-center text-blue-400"
            >
              <span>Taskify : </span>
              <span>Task Manager</span>
            </p>
            <div>
              <div className="circle rotate-in-up-left "></div>
            </div>
          </div>
        </div>

        {/* Right side: registration form */}
        <div className="w-full md:w-1/3 p-4 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[500px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14 shadow-lg rounded-lg"
          >
            <div>
              <p className="text-blue-400 text-4xl font-bold text-center">
                Create an Account
              </p>
              <p className="text-center text-base text-gray-700">
                Join the Taskify community
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              <Textbox
                className="w-full rounded-full"
                placeholder="Software Engineer"
                label="Title"
                name="title"
                register={register("title", { required: "Title is required!" })}
                errors={errors.title?.message}
              />

              <SelectList
                label="Role"
                lists={ROLES}
                selected={selectedRole}
                setSelected={(role) => {
                  setSelectedRole(role);
                  register("role").onChange({ target: { value: role } });
                }}
              />

              <Textbox
                className="w-full rounded-full"
                placeholder="John Doe"
                label="Name"
                name="name"
                register={register("name", { required: "Name is required!" })}
                errors={errors.name?.message}
              />

              <Textbox
                className="w-full rounded-full"
                placeholder="email@example.com"
                type="email"
                label="Email Address"
                name="email"
                register={register("email", { required: "Email is required!" })}
                errors={errors.email?.message}
              />

              <Textbox
                className="w-full rounded-full"
                placeholder="your password"
                type="password"
                label="Password"
                name="password"
                register={register("password", {
                  required: "Password is required!",
                })}
                errors={errors.password?.message}
              />

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

              {isLoading ? (
                <Loading />
              ) : (
                <Button
                  type="submit"
                  label="Register"
                  className="w-full h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                />
              )}
            </div>
          </form>

          <span
            className="text-sm text-gray-500 hover:text-blue-400 hover:underline cursor-pointer mt-4"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login here.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
