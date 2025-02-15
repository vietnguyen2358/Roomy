import React from "react";
import { useFormik } from "formik";
import FormInput from "./FormInput";

function AuthForm(props) {
  const { isSignUp, initialValues } = props;

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="auth-form">
      <form onSubmit={formik.handleSubmit} className="">
        <h1 className="auth-form__title">{isSignUp ? "Sign Up" : "Sign In"}</h1>

        <FormInput />
      </form>
    </div>
  );
}

export default AuthForm;
