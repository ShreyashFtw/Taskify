import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Loading from "./Loader";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Password does not match");
      return;
    }
    try {
      const result = await changePassword(data).unwrap();
      toast.success("Password changed successfully");
      setOpen(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900">
            Change Password
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-4">
            <Textbox
              label="New Password"
              type="password"
              name="password"
              register={register("password", {
                required: "New Password is required",
              })}
              errors={errors.password ? errors.password.message : ""}
            />
            <Textbox
              label="Confirm Password"
              type="password"
              name="cpass"
              register={register("cpass", {
                required: "Confirm Password is required",
              })}
              errors={errors.cpass ? errors.cpass.message : ""}
            />

            {isLoading ? (
              <div className="py-5">
                <Loading />
              </div>
            ) : (
              <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
                <Button
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-500"
                  label="Save"
                />
                <Button
                  type="button"
                  className="bg-white px-5 text-sm font-semibold text-gray-900 sw:w-auto"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default ChangePassword;
