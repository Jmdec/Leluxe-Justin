import * as Yup from "yup";

const rules = {
  name: Yup.string().required("Name is a required field"),
  message: Yup.string().required("message is a required field"),
  imageUrl: Yup.string().required("Image is required"),
  

};

export const create = Yup.object().shape({
  ...rules,
});

export const update = Yup.object().shape({
  ...rules,
  id: Yup.number().required("ID is a required field").positive("ID must be a valid number"),
});
