import React, { useEffect } from "react";
import styled from "styled-components";
import { Label } from "components/label";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import { Field } from "components/field";
import { useState } from "react";
import { Button } from "components/button";
import { toast } from "react-toastify";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/config-firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";

const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your password must be as least 8 characters or greater")
        .required("Please enter your password"),
});

const SignUpPageStyles = styled.div``;

const SignUpPage = () => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch,
        reset,
    } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
    const handleSignUp = async (values) => {
        if (!isValid) return;
        const user = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        await updateProfile(auth.currentUser, {
            displayName: values.fullname,
        });
        const colRef = collection(db, "users");
        await addDoc(colRef, {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
        });

        toast.success("Create user successfully");
        navigate("/");
    };

    const [togglePassword, setTogglePassword] = useState(false);

    useEffect(() => {
        const arrErroes = Object.values(errors);
        if (arrErroes.length > 0) {
            toast.error(arrErroes[0]?.message, {
                pauseOnHover: false,
            });
        }
    }, [errors]);

    useEffect(() => {
        document.title = "Register Page";
    }, []);

    return (
        <SignUpPageStyles>
            <AuthenticationPage>
                <form className="form" onSubmit={handleSubmit(handleSignUp)}>
                    <Field>
                        <Label htmlFor="fullname" className="label">
                            Fullname
                        </Label>
                        <Input
                            type="text"
                            placeholder="Enter your fullname ..."
                            name="fullname"
                            className="input"
                            control={control}
                        ></Input>
                    </Field>
                    <Field>
                        <Label htmlFor="email" className="label">
                            Email address
                        </Label>
                        <Input
                            type="email"
                            placeholder="Enter your email ..."
                            name="email"
                            className="input"
                            control={control}
                        ></Input>
                    </Field>
                    <Field>
                        <Label htmlFor="password" className="label">
                            Password
                        </Label>
                        <Input
                            type={togglePassword ? "text" : "password"}
                            placeholder="Enter your password ..."
                            name="password"
                            className="input"
                            control={control}
                        >
                            {togglePassword ? (
                                <IconEyeClose
                                    onClick={() =>
                                        setTogglePassword(!togglePassword)
                                    }
                                ></IconEyeClose>
                            ) : (
                                <IconEyeOpen
                                    onClick={() =>
                                        setTogglePassword(!togglePassword)
                                    }
                                ></IconEyeOpen>
                            )}
                        </Input>
                    </Field>
                    <div className="have-account">
                        You already have an account?{" "}
                        <NavLink to={"/sign-in"}>Login</NavLink>{" "}
                    </div>
                    <Button
                        style={{ maxWidth: 300, margin: "0 auto" }}
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </form>
            </AuthenticationPage>
        </SignUpPageStyles>
    );
};

export default SignUpPage;
