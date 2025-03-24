import * as Yup from "yup";

const rules = {
  title: Yup.string().required("Title is a required field"),
  link: Yup.string().url("Invalid URL").required("Link is a required field"),
  imageUrl: Yup.mixed().required("Image is a required field"),
  description: Yup.string().required("Description is a required field"),
  date: Yup.string().required("Date is a required field"),
};

export const create = Yup.object().shape(rules);

export const update = Yup.object().shape({
  ...rules,
  id: Yup.number().required("ID is a required field").positive("ID must be a valid number"),
});
