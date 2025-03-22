import * as Yup from "yup";

export interface TodoFormValues {
  title: string;
  description: string;
  completed: boolean;
  user: string;
}

export const initialValues: TodoFormValues = {
  title: "",
  description: "",
  completed: false,
  user: "", 
};

export const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .trim()
    .max(300, "Description cannot exceed 300 characters"),
  completed: Yup.boolean(),
  user: Yup.string().required("User ID is required"),
});
