import * as Yup from "yup";

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

export const QuerySchema = Yup.object().shape({
  "address-1": Yup.string()
    .min(1, "A valid address is required.")
    .max(500, "Your address exceeds the character limit (500).")
    .required("A valid address is required."),
});
