import React from "react";
import { useNavigate } from "react-router-dom";

// Schemas
import { SignUpSchema } from "../../../schemas/UserSchemas";

// Context
import { useAPI } from "../../../context/API/API.context";
import { useGlobal } from "../../../context/Global/Global.context";
import { useUser } from "../../../context/User/User.context";

// Components
import AuthForm from "../../layout/auth/AuthForm";
import AuthContainer from "../../layout/auth/AuthContainer";

function SignUp() {
  const { showLoading, closeLoading } = useGlobal();
  const { addUser } = useAPI();
  const { updateUser, signUserIn } = useUser();
  const navigate = useNavigate();

  return (
    <AuthContainer>
      <AuthForm
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
        }}
        isSignUp={true}
        schema={SignUpSchema}
        onSubmit={(values, { errors, resetForm }) => {
          showLoading("Creating your new account...");
          const { email, firstName, lastName, password } = values;
          addUser({ email, firstName, lastName, password }, (data, err) => {
            if (err) return console.log(err);

            updateUser({ email, firstName, lastName });
            signUserIn();
            closeLoading();
            resetForm();
            navigate("/");
          });
        }}
      />
    </AuthContainer>
  );
}

export default SignUp;
