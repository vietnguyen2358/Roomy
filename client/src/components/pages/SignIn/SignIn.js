import React from "react";

// Schemas
import { SignInSchema } from "../../../schemas/UserSchemas";

// Contexts
import { useGlobal } from "../../../context/Global/Global.context";

// Components
import AuthForm from "../../layout/auth/AuthForm";
import AuthContainer from "../../layout/auth/AuthContainer";

function SignIn() {
  const { showLoading } = useGlobal();

  return (
    <AuthContainer>
      <AuthForm
        initialValues={{
          email: "",
          password: "",
        }}
        isSignUp={false}
        schema={SignInSchema}
        onSubmit={(values, { errors, resetForm }) => {
          showLoading("Signing in to your account...");
          console.log(values);
        }}
      />
    </AuthContainer>
  );
}

export default SignIn;
