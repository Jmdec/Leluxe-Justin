import * as Yup from "yup";

const rules = {
    name: Yup.string().required("Name is a required field"),
  };
export const create = Yup.object().shape({
  ...rules,
});

export const update = Yup.object().shape({
  ...rules,
  id: Yup.string().required("ID is a required field"),
});

export const markAsPaid = Yup.object().shape({
  id: Yup.string().required("ID is a required field"),
});