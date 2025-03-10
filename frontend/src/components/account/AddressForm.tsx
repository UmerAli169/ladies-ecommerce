'use client';
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../shared/Button";
import { AuthInput } from "../shared/Input";

const AddressForm = () => {
  const [showForm, setShowForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      country: '',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
      setAsDefault: false,
      recipientNotMe: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
      postalCode: Yup.string().required("Postal code is required"),
      phone: Yup.string().required("Phone is required"),
    }),
    onSubmit: (values) => {
      console.log("Address saved:", values);
    },
  });

  return (
    <div className="space-y-[20px]  rounded-lg w-full">
      <p className="text-xl font-semibold">Your Addresses</p>

      <div className="flex justify-between items-center pb-2">
        <div className="w-full flex justify-between p-[10px] border">
          <div>
            <span className="pr-[30px]">Default</span>
            <span>Maidan Nezalezhnosti 2, Kyiv, 01000, Ukraine</span>
          </div>
          <button className="text-blue-500">Change</button>
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
  <form onSubmit={formik.handleSubmit} className="space-y-4">
  <AuthInput
    type="text"
    placeholder="Enter Country"
    label="Country"
    name="country"
    // value={formik.values.country}
    // onChange={formik.handleChange}
    // onBlur={formik.handleBlur}
  />
  <AuthInput
    type="text"
    placeholder="Enter Address"
    label="Address"
    name="address"
    // value={formik.values.address}
    // onChange={formik.handleChange}
    // onBlur={formik.handleBlur}
  />
  <div className="grid grid-cols-2 gap-2">
    <AuthInput
      type="text"
      placeholder="Enter City"
      label="City"
      name="city"
      // value={formik.values.city}
      // onChange={formik.handleChange}
      // onBlur={formik.handleBlur}
    />
    <AuthInput
      type="text"
      placeholder="Enter Postal Code"
      label="Postal Code"
      name="postalCode"
      // value={formik.values.postalCode}
      // onChange={formik.handleChange}
      // onBlur={formik.handleBlur}
    />
  </div>
  <AuthInput
    type="text"
    placeholder="Enter Phone Number"
    label="Phone Number"
    name="phone"
    // value={formik.values.phone}
    // onChange={formik.handleChange}
    // onBlur={formik.handleBlur}
  />
  <div className="flex flex-col gap-2">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="setAsDefault"
        checked={formik.values.setAsDefault}
        onChange={formik.handleChange}
      />
      Set as default
    </label>
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="recipientNotMe"
        checked={formik.values.recipientNotMe}
        onChange={formik.handleChange}
      />
      The recipient is not me
    </label>
  </div>
  <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded">
    Save
  </button>
</form>

)}

    </div>
  );
};

export default AddressForm;
