import React from "react";
import * as Yup from "yup";
import { FormikHelpers } from "formik";
import { Modal } from "../model/Modal";
import { AuthInput } from "../shared/Input";
import { AuthButton } from "@/components/auth/common/AuthButton";
import { AuthForm } from "@/components/auth/formick/AuthForm";
import { GoogleButton } from "@/components/auth/common/GoogleButton";
import { OrDivider } from "@/components/auth/common/OrDivider";
import reviewsData from "../../Data/reviews/review.json";
import { Field, Formik } from "formik";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ReviewFormValues {
  title: string;
  text: string;
  name: string;
  email: string;
  photos: FileList | null;
}

export const ReviewModal = ({ isOpen, onClose }: ReviewModalProps) => {
  const handleReviewSubmit = (values: ReviewFormValues, actions: FormikHelpers<ReviewFormValues>) => {
    console.log("Review Submitted:", values);
    actions.setSubmitting(false);
    onClose();
  };

  const review = reviewsData.reviews[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-[26px] font-semibold leading-[39px] text-[#383838] mb-4 text-center">
        Write a Review
      </h2>

      <div>
        <div className="flex items-start gap-3 mb-[30px]">
          <div className="max-w-[80px] w-full rounded-full flex items-center">
            <img src="/reviews/reviewsection.png" alt="Reviewer" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-[16px] leading-[20px]">
                {review.name}
              </p>
            </div>

            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src="/svgs/Review/emptyStar.svg"
                  alt="star"
                  className="w-[28px]"
                />
              ))}
            </div>
          </div>
        </div>

        <Formik
          initialValues={{ title: "", text: "", name: "", email: "", photos: null }}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            text: Yup.string().required("Review is required"),
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
          })}
          onSubmit={handleReviewSubmit}
        >
          {({ setFieldValue }) => (
            <AuthForm initialValues={{ title: "", text: "", name: "", email: "", photos: null }}
              validationSchema={Yup.object({
                title: Yup.string().required("Title is required"),
                text: Yup.string().required("Review is required"),
                name: Yup.string().required("Name is required"),
                email: Yup.string().email("Invalid email").required("Email is required"),
              })}
              onSubmit={handleReviewSubmit}
            >
              <AuthInput type="text" name="title" placeholder="Review Title" required />

              <Field
                as="textarea"
                name="text"
                placeholder="What did you think about Floral Essence Masks Sets"
                className="border rounded-md w-full p-2 min-h-[100px] outline-none "
                required
              />

              <label className="border p-2 rounded-md w-full flex items-center gap-2 cursor-pointer outline-none">
                <input
                  type="file"
                  name="photos"
                  className="hidden outline-none"
                  onChange={(event) => {
                    setFieldValue("photos", event.currentTarget.files);
                  }}
                  multiple
                />
                <img src="/svgs/Review/file.svg" alt="Upload" className="w-5 h-5" />
                Add Photos
              </label>

              <div className="mt-4 flex flex-col gap-[20px]">
                <p className="font-medium">Your Profile</p>
                <AuthInput type="text" name="name" placeholder="Name" required />
                <AuthInput type="email" name="email" placeholder="Email Address" required />
         

              <OrDivider />
              <AuthButton   type="button">Sign In</AuthButton>
              <GoogleButton />
              </div>
              <p className="text-center text-sm mt-4">
                By continuing you agree to our{" "}
                <a href="#" className="underline">Privacy Policy</a>
              </p>
              <AuthButton type="submit" className="w-full bg-pink-500 mt-2">
                Agree & Submit
              </AuthButton>
            </AuthForm>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
