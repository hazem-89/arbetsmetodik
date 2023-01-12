import { Typography, Box, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Assets/FormStyle.css";
import { useAuth } from "../Contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object({
    email: yup.string().required("Please enter your email address"),
    displayName: yup.string().required("Display name is required"),
    password: yup
        .string()
        .min(6, "The password must be atleast 6 characters")
        .required("Please enter a password"),
    confirmPassword: yup
        .string()
        .min(6, "The password must be atleast 6 characters")
        .required("Please confirm your password"),
});

function SignUpPage() {
    const { signup, errorMessage } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmationPassword, setConfirmationPassword] =
        useState<string>("");
    const [displayName, setDisplayedName] = useState<string>("");

    const handleSignUp = async () => {
        if (password !== confirmationPassword) {
            return alert("Passwords do not match");
        }

        try {
            await signup(email, password, displayName);
        } catch (error) {
            console.log(error);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            displayName: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        // eslint-disable-next-line
        onSubmit: (values) => {
            handleSignUp();
        },
    });

    return (
        <Box
            sx={{
                mt: { xs: 4, md: 10, lg: 10, xl: 10 },
            }}
        >
            <ToastContainer />
            <Typography variant="h4" align="center" mb={5}>
                New to Chubby Dog?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "15rem",
                        gap: "1rem",
                    }}
                >
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={formik.values.email}
                        onChange={(e) => {
                            formik.handleChange(e);
                            setEmail(e.target.value);
                        }}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        id="displayName"
                        label="Username"
                        name="displayName"
                        type="text"
                        onChange={(e) => {
                            formik.handleChange(e);
                            setDisplayedName(e.target.value);
                        }}
                        value={formik.values.displayName}
                        error={
                            formik.touched.displayName &&
                            Boolean(formik.errors.displayName)
                        }
                        helperText={
                            formik.touched.displayName &&
                            formik.errors.displayName
                        }
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={(e) => {
                            formik.handleChange(e);
                            setPassword(e.target.value);
                        }}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                    />

                    <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={(e) => {
                            formik.handleChange(e);
                            setConfirmationPassword(e.target.value);
                        }}
                        error={
                            formik.touched.confirmPassword &&
                            Boolean(formik.errors.confirmPassword)
                        }
                        helperText={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                        }
                    />
                    {errorMessage ? (
                        <Typography color="red" align="center">
                            Something went wrong, please try again
                        </Typography>
                    ) : null}
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ background: "#00C4BA", color: "white" }}
                        className="buttonStyle"
                    >
                        Sign up
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default SignUpPage;
