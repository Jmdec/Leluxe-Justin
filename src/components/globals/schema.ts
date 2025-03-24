import * as Yup from "yup";

export const destroy = Yup.object().shape({
    id: Yup.string().required("ID is a required field"),
});