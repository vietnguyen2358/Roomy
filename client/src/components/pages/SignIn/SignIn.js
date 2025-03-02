import React from "react";
import { useNavigate } from "react-router-dom";

// Schemas
import { SignInSchema } from "../../../schemas/UserSchemas";

// Contexts
import { useGlobal } from "../../../context/Global/Global.context";
import { useUser } from "../../../context/User/User.context";
import { useAPI } from "../../../context/API/API.context";

// Components
import AuthForm from "../../layout/auth/AuthForm";
import AuthContainer from "../../layout/auth/AuthContainer";

function SignIn() {
  const { showLoading, closeLoading } = useGlobal();
  const { signInUser } = useAPI();
  const { updateUser, signUserIn } = useUser();
  const navigate = useNavigate();

  return (
    <AuthContainer>
      <AuthForm
        initialValues={{
          email: "",
          password: "",
        }}
        isSignUp={false}
        schema={SignInSchema}
        onSubmit={(values, { setErrors, resetForm }) => {
          showLoading("Signing in to your account...");
          signInUser(values, (data, err) => {
            if (err) return console.log(err);
            if (!data.Success) {
              setErrors({
                password: "Incorrect email or password.",
              });

              closeLoading();
            } else {
              const { Success } = data;
              const uid = Success[0];
              const firstName = Success[1];
              const lastName = Success[2];
              updateUser({ email: values.email, firstName, lastName, uid });
              signUserIn();
              closeLoading();
              resetForm();
              navigate("/");
            }
          });
        }}
      />
    </AuthContainer>
  );
}

export default SignIn;
