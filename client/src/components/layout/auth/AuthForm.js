import React from "react";
import { useFormik } from "formik";

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
        <h1 className="auth-form__title">
          Sign Up
        </h1>
      </form>
    </div>
  );
}

export default AuthForm;
