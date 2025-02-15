import React from "react";

function FormInput(props) {
  const {
    formik: { handleChange, values, touched, errors },
    name,
    label,
    type,
    placeholder,
    setShowPassword,
    showPassword,
  } = props;
  const isError = touched[name] && errors[name];
  const isValid = touched[name] && !errors[name];
  const isPassword = name === "password";

  return (
    <div
      className={`auth-form__input-box ${
        isError ? "auth-form__error-box" : isValid ? "auth-form__valid-box" : ""
      }`}
    >
      <label htmlFor={name}>{label}</label>
      <input
        className="auth-form__input"
        name={name}
        type={type}
        onChange={handleChange}
        value={values[name]}
        placeholder={placeholder}
      />
      {/* Show Password Btn */}
      {isPassword && (
        <>
          {showPassword ? (
            <button
              className="auth-form__show"
              onClick={() => setShowPassword(false)}
            >
              Hide Password
            </button>
          ) : (
            <button
              className="auth-form__show"
              onClick={() => setShowPassword(true)}
            >
              Show Password
            </button>
          )}
        </>
      )}

      {isError && <p className="auth-form__error">{errors[name]}</p>}
    </div>
  );
}

export default FormInput;
