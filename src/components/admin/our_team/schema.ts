import * as Yup from "yup";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const rules = {
  name: Yup.string().required("Name is a required field"),
  position: Yup.string().required("Position is a required field"),
  imageUrl: Yup.mixed()
    .nullable()
    .required("Image URL is a required field")
    .test("fileSize", "The image size is too large. Max size is 5MB.", (value) => {
      if (value && (value as File).size) {
        return (value as File).size <= MAX_IMAGE_SIZE;
      }
      return true;
    })
    .test("fileType", "Only the following image formats are allowed: png, jpeg, jpg, webp.", (value) => {
      if (value && (value as File).type) {
        return ALLOWED_IMAGE_TYPES.includes((value as File).type);
      }
      return true;
    }),
};

export const create = Yup.object().shape({
  ...rules,
});

export const update = Yup.object().shape({
  ...rules,
  id: Yup.number().required("ID is a required field").positive("ID must be a valid number"),
});
