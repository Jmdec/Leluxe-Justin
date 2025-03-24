import * as Yup from "yup";

const rules = {
  title: Yup.string().required("Title is a required field"),
  videoPath: Yup.string()
    .required("Video path is a required field"),
};

export const create = Yup.object().shape({
  ...rules,
});

export const update = Yup.object().shape({
  ...rules,
  id: Yup.number().required("ID is a required field").positive("ID must be a valid number"),
});
