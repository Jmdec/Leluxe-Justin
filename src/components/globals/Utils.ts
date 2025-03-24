import * as Yup from "yup";
import toast from "react-hot-toast";
import { ActionResponse } from "@/components/globals/types";

export const onPostSubmit = (
  response: ActionResponse,
  actions: { resetForm: () => void },
  onClose: () => void
) => {
  if (response.code == 200) {
    actions.resetForm();
    toast.success(response.message);
    onClose();
  } else {
    if (response.code == 429) {
      console.log(response.errors);
    } else {
      console.log(response.error);
    }
    toast.error(response.message);
  }
};

export const capitalize = (ufString: string) => {
  const string = ufString.charAt(0).toUpperCase() + ufString.slice(1);
  return string;
};

export const formatNumber = (ufNumber: number) => {
  const number = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(ufNumber);
  return number;
};

export const formatDate = (ufDate: Date) => {
  let date;

  if (ufDate) {
    date = ufDate.toLocaleDateString("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return date;
};

export const formatToDate = (date: Date) => {
  if (!date) return "No Date";

  return new Date(date)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric", 
    })
    .replace(/\s/g, "-"); 
};

export const formatTime = (ufTime: Date) => {
  let time;

  if (ufTime) {
    time = ufTime.toLocaleTimeString("default", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  return time;
};


export const formatErrors = (ufErrors: Yup.ValidationError) => {
  const errors: { [key: string]: string } = {};

  if (ufErrors) {
    ufErrors.inner.forEach((ufError) => {
      if (ufError.path) {
        errors[ufError.path] = ufError.message;
      }
    });
  }

  return errors;
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  
  return text.slice(0, maxLength).trim() + "...";
};


