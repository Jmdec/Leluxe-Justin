import * as Yup from "yup";

const rules = {
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  date: Yup.date().required('Date is required'),
  time: Yup.string().required('Time is required'),
  serviceId: Yup.number().required('ServiceId is required').positive('Service ID must be a positive number').integer('Service ID must be an integer'),
  message: Yup.string(),
};

export const create = Yup.object().shape({
  ...rules,
});
