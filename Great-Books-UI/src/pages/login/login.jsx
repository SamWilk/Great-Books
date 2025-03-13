import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useLogin from "./login";
import "./login.css";
import CustomButton from "../../components/customButton/customButton";

const validationSchema = Yup.object({
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

const LoginForm = () => {
  const { loginUser, error } = useLogin();
  return (
    <Formik
      initialValues={{ userName: "", password: "" }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await loginUser(values.userName, values.password);
        setSubmitting(false);
        console.log(error);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="login-form">
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

          {error && <div className="customError">{error}</div>}
          <CustomButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};

const Login = () => {
  return (
    <>
      <div>Fill Out this form to login</div>
      <LoginForm />
    </>
  );
};

export default Login;
