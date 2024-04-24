import {object, string, ref} from "yup";

export const createWorkerSchema = object({
    body: object({
        firstName: string().required("First Name is required"),
        lastName: string().required("Last Name is required"),
        password: string()
            .required("Password is required")
            .min(8, "Password is too short (should be min 8 characters)")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password must contain Latin characters"),

         // Add Password Confirmation

        email: string()
            .required("Email is required")
            .email("Must be a valid email"),
    }),
});

export const workerSessionSchema = object({
    body: object({
        password: string()
            .required("Password is required")
            .min(8, "Password is too short (should be min 8 characters)")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password must contain Latin characters"),
        email: string()
            .required("Email is required")
            .email("Must be a valid email"),
    }),
});