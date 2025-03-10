import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../shared/Button";
import { AuthInput } from "../shared/Input";

const ChangePasswordForm = () => {
  return (
    <Formik
      initialValues={{ oldPassword: "", newPassword: "", confirmPassword: "" }}
      validationSchema={Yup.object({
        oldPassword: Yup.string().required("Old password is required"),
        newPassword: Yup.string()
          .min(6, "At least 6 characters")
          .required("New password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("newPassword")], "Passwords must match")
          .required("Confirm password is required"),
      })}
      onSubmit={(values) => {
        console.log("Password update:", values);
      }}
    >
      {() => (
        <Form className="space-y-4 ">
          <h2 className="text-xl font-semibold">Change Password</h2>

          <AuthInput
            name="oldPassword"
            type="password"
            placeholder="Old Password"
            required
          />

          <div className="flex gap-4">
            <AuthInput
              name="newPassword"
              type="password"
              placeholder="New Password"
              required
            />
            <AuthInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
            />
          </div>

          

          <Button type="submit" className="px-4 py-2 max-w-[362px]">
            Update Password
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
