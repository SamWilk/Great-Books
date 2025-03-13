import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./signup.css";
import CustomButton from "../../components/customButton/customButton";
import useSignUp from "./signup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is Required"),

  userName: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than or equal to 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),

  password: Yup.string()
    .min(8)
    .max(32)
    .matches(/^[a-zA-Z0-9!@#$%^&*()_+=-]+$/)
    .matches(/[A-Z]/)
    .matches(/[a-z]/)
    .matches(/[0-9]/)
    .matches(/[!@#$%^&*()_+=-]/)
    .required("Password is required"),
});

const SignupForm = () => {
  const { signUpUser, error } = useSignUp();
  const redirect = useNavigate();
  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (authStatus) {
      redirect("/");
    }
  }, [authStatus, redirect]);

  return (
    <Formik
      initialValues={{ userName: "", password: "" }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await signUpUser(values.userName, values.password, values.email);
        setSubmitting(false);
        console.log(error);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="login-form">
          <div>
            <label>Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className="customError"
            />
          </div>

          <div>
            <label>Username:</label>
            <Field type="text" name="userName" />
            <ErrorMessage
              name="userName"
              component="div"
              className="customError"
            />
          </div>

          <div>
            <label>Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              className="customError"
            />
          </div>

          <div>
            <label>Confirm Password:</label>
            <Field type="password" name="confirm-password" />
            <ErrorMessage
              name="confirm-password"
              component="div"
              className="customError"
            />
          </div>

          {error && <div className="customError">{error}</div>}
          <CustomButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};

const Signup = () => {
  return (
    <>
      <div>Fill Out this form to Sign Up</div>
      <SignupForm />
    </>
  );
};

export default Signup;
