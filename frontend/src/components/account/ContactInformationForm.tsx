import Button from "../shared/Button";
import { useFormik, Formik, Form } from "formik";
import * as Yup from "yup";
import { AuthInput } from "../shared/Input"; 
const ContactInformationForm = () => {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
      })}
      onSubmit={(values) => {
        console.log("Form values:", values);
      }}
    >
      {() => (
        <Form className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          
          <AuthInput
            name="email"
            type="email"
            label="Mail"
            placeholder="Enter your email"
            required
          />

          <div className="flex gap-4">
            <div className="w-1/2">
              <AuthInput
                name="firstName"
                type="text"
                label="First Name"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="w-1/2">
              <AuthInput
                name="lastName"
                type="text"
                label="Last Name"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <Button type="submit" className="px-4 py-2 max-w-[362px]">Save</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactInformationForm;
