import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email.")
    .max(300, "Your email exceeds the character limit (300).")
    .required("A valid email is required."),
  username: Yup.string()
    .min(2, "Your username must be atleast 2 characters.")
    .max(300, "Your username exceeds the character limit (300).")
    .required("A username is required."),
  password: Yup.string()
    .trim()
    .min(8, "Your password must be atleast 8 characters.")
    .max(300, "Your password exceeds the character limit (300).")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Must contain atleast 1 upper and lower case letter, 1 number, and 1 special symbol."
    )
    .required("Must create a password."),
  confirmPassword: Yup.string()
    .trim()
    .min(1, "You must confirm your password.")
    .max(300, "Your confirmation password exceeds the character limit (300).")
    .oneOf(
      [Yup.ref("password"), null],
      "You confirmation password does NOT match."
    )
    .required("You must confirm your password."),
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email.")
    .max(300, "Your email exceeds the character limit (300).")
    .required("A valid email is required."),
  password: Yup.string()
    .trim()
    .min(8, "Your password must be atleast 8 characters.")
    .max(300, "Your password exceeds the character limit (300).")
    .required("Must enter a password."),
});

export const ZillowLinkSchema = Yup.object().shape({
  zillowLink: Yup.string()
    .min(1, "A valid Zillow URL is required.")
    .max(500, "Your Zillow URL exceeds the character limit (500).")
    .matches(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please enter a valid URL."
    )
    .required("A valid Zillow URL is required."),
});
