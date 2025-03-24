import * as Yup from "yup";

const rules = {
    fullname: Yup.string().required("Name is a required field"),
    phonenumber: Yup.string().required("Phone Number is a required field"),
    email: Yup.string().required("Email is a required field"),
    message: Yup.string().required("Message is a required field"),
  };
export const create = Yup.object().shape({
  ...rules,
});



