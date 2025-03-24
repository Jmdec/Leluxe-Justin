import * as Yup from "yup";

const rules = {
    question: Yup.string().required("Question is a required field"),
    answer: Yup.string().required("Answer is a required field"),
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