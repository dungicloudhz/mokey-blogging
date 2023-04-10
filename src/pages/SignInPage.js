import { useAuth } from "contexts/authContext";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import { Field } from "components/field";
import Label from "components/label/Label";
import { Input } from "components/input";
import { Button } from "components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/config-firebase";

const schema = yup.object({
    email: yup
        .string()
        .email("Please enter valid email address")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your password must be as least 8 characters or greater")
        .required("Please enter your password"),
});

const SignInPage = () => {
    const [togglePassword, setTogglePassword] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { isValid, isSubmitting, errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const arrErroes = Object.values(errors);
        if (arrErroes.length > 0) {
            toast.error(arrErroes[0]?.message, {
                pauseOnHover: false,
            });
        }
    }, [errors]);
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Login Page";
        if (userInfo?.email) navigate("/");
    }, [userInfo]);

    const handleSignIn = async (values) => {
        if (!isValid) return;
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigator("/");
    };
    // const { userInfo } = useAuth();
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!userInfo.email) navigate("/sign-up");
    //     else navigate("/");
    // }, []);

    return (
        <AuthenticationPage>
            <form className="form" onSubmit={handleSubmit(handleSignIn)}>
                <Field>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email address."
                        control={control}
                    ></Input>
                </Field>
                <Field>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type={togglePassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password."
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
                    You have not an account?{" "}
                    <NavLink to={"/sign-up"}>Register an account</NavLink>{" "}
                </div>
                <Button
                    style={{ maxWidth: 300, margin: "0 auto" }}
                    type="submit"
                >
                    Sign In
                </Button>
            </form>
        </AuthenticationPage>
    );
};

export default SignInPage;
