import React, { useState } from "react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";

// Components
import FormInput from "./FormInput";

function AuthForm(props) {
  const { isSignUp, initialValues, schema, onSubmit } = props;
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit,
  });

  return (
    <div className="auth-form">
      <form onSubmit={formik.handleSubmit}>
        <h1 className="auth-form__title">{isSignUp ? "Sign Up" : "Sign In"}</h1>

        {/* Email */}
        <FormInput
          name="email"
          placeholder="example@gmail.com"
          type="email"
          label="Email"
          formik={formik}
        />

        {/* Username */}
        {isSignUp ? (
          <>
            <FormInput
              name="username"
              placeholder="Create a username..."
              type="text"
              label="Username"
              formik={formik}
            />
            <FormInput
              name="password"
              placeholder="Create a password..."
              type={showPassword ? "text" : "password"}
              label="Password"
              formik={formik}
              setShowPassword={setShowPassword}
              showPassword={showPassword}
            />
            <FormInput
              name="confirmPassword"
              placeholder="Confirm your password..."
              type={showPassword ? "text" : "password"}
              label="Confirm Password"
              formik={formik}
            />
          </>
        ) : (
          <FormInput
            name="password"
            placeholder="Enter your password..."
            type={showPassword ? "text" : "password"}
            label="Password"
            formik={formik}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />
        )}

        <button type="submit" className="auth-form__submit">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        {isSignUp ? (
          <NavLink to="/signin" className="auth-form__link">
            Already have an account? <span>Sign In</span>
          </NavLink>
        ) : (
          <NavLink to="/signup" className="auth-form__link">
            Don't have an account yet? <span>Sign Up</span>
          </NavLink>
        )}
      </form>
    </div>
  );
}

export default AuthForm;
