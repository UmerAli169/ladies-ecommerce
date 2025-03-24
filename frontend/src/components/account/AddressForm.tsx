"use client";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../shared/Button";
import { AuthInput } from "../shared/Input";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { useState } from "react";

const AddressForm = () => {
  const [showForm, setShowForm] = useState(false);
  const { user, setUser } = useAuthStore();

  const validationSchema = Yup.object({
    country: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    postalCode: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
  });

  return (
    <div className="space-y-[20px] rounded-lg w-full">
      <p className="text-xl font-semibold">Your Addresses</p>
      <div className="flex justify-between items-center pb-2">
        <div className="w-full flex justify-between p-[10px] border">
          <div>
            <span className="pr-[30px]">Default</span>
            <span>
              {user?.address
                ? `${user.address.address}, ${user.address.city}, ${user.address.country}, ${user.address.postalCode}`
                : "No address saved"}
            </span>
          </div>
          <button className="text-blue-500" onClick={() => setShowForm(true)}>
            Change
          </button>
        </div>
      </div>
      {!showForm && (
        <Button
          className="lg:p-[10px] px-[10px] py-[8px] bg-white text-black border border-black hover:bg-black hover:text-white"
          onClick={() => setShowForm(true)}
        >
          Add A New Address
        </Button>
      )}
      {showForm && (
        <Formik
          initialValues={{
            country: "",
            address: "",
            city: "",
            postalCode: "",
            phone: "",
            setAsDefault: false,
            recipientNotMe: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            try {
              setUser({ ...user, address: values });
              toast.success("Address saved successfully!");
              setShowForm(false);
            } catch (error) {
              toast.error("Failed to save address!");
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <AuthInput name="country" type="text" placeholder="Enter Country" label="Country" />
              <AuthInput name="address" type="text" placeholder="Enter Address" label="Address" />
              <div className="grid grid-cols-2 gap-2">
                <AuthInput name="city" type="text" placeholder="Enter City" label="City" />
                <AuthInput name="postalCode" type="text" placeholder="Enter Postal Code" label="Postal Code" />
              </div>
              <AuthInput name="phone" type="text" placeholder="Enter Phone Number" label="Phone Number" />
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <Field type="checkbox" name="setAsDefault" />
                  Set as default
                </label>
                <label className="flex items-center gap-2">
                  <Field type="checkbox" name="recipientNotMe" />
                  The recipient is not me
                </label>
              </div>
              <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AddressForm;