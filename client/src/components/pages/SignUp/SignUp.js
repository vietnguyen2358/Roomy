import React from "react";

// Schemas
import { SignUpSchema } from "../../../schemas/UserSchemas";

// Context
import { useGlobal } from "../../../context/Global/Global.context";

// Components
import AuthForm from "../../layout/auth/AuthForm";
import AuthContainer from "../../layout/auth/AuthContainer";

function SignUp() {
  const { showLoading } = useGlobal();

  return (
    <AuthContainer>
      <AuthForm
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        isSignUp={true}
        schema={SignUpSchema}
        onSubmit={(values, { errors, resetForm }) => {
          showLoading("Creating your new account...");
          console.log(values);
        }}
      />
    </AuthContainer>
  );
}

export default SignUp;
