import { InputWrapper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { findError, ErrorRes } from "../../../client/response";
import FormButton from "../../Util/Widget/FormButton/FormButton";
import styles from "./SignUpPanel.module.css";
import { createUser, login } from "../Login.client";
import { isValidError } from "../../../client/util";

const SignUpPanel = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const clearErrors = useCallback(
        () => {
            setEmailError("");
            setNameError("");
            setPasswordError("");
        },
        []
    );

    const submit = useCallback(
        (e) => {
            e.preventDefault();

            setLoading(true);
            createUser({
                email,
                name,
                password
            })
                .then(() => {
                    login({
                        email,
                        password
                    })
                        .then(() => {
                            document.location.href = "/";
                        })
                        .catch(() => {
                            setNameError("Unexpected Error occurred");
                            setLoading(false);
                        });
                })
                .catch((err) => {
                    if (isValidError(err)) {
                        const errData = err.response.data as ErrorRes;
                        setEmailError(findError(errData, "email"));
                        setNameError(findError(errData, "name"));
                        setPasswordError(findError(errData, "password"));
                    }
                    setLoading(false);
                });
        },
        [email, name, password]
    );

    return (
        <div className={styles.SignUpPanel}>
            <Title className={styles.Title} order={2}>
                Sign Up
            </Title>
            <Text className={styles.Text}>Don't have an account? Signing up is free!</Text>
            <form onSubmit={submit}>
                <InputWrapper className={styles.InputWrapper} required label="Email Address">
                    <TextInput
                        placeholder="Email"
                        value={email}
                        error={emailError}
                        onChange={(event) => {
                            setEmail(event.currentTarget.value);
                            clearErrors();
                        }}
                        autoComplete="email"
                    />
                </InputWrapper>
                <InputWrapper className={styles.InputWrapper} required label="User Name">
                    <TextInput
                        placeholder="Username"
                        value={name}
                        error={nameError}
                        onChange={(event) => {
                            setName(event.currentTarget.value);
                            clearErrors();
                        }}
                        autoComplete="username"
                    />
                </InputWrapper>
                <InputWrapper className={styles.InputWrapper} required label="Password">
                    <PasswordInput
                        placeholder="Password"
                        value={password}
                        error={passwordError}
                        onChange={(event) => {
                            setPassword(event.currentTarget.value);
                            clearErrors();
                        }}
                        autoComplete="new-password"
                    />
                </InputWrapper>
                <FormButton text="Create Account" loading={loading} />
            </form>
        </div>
    );
};

export default SignUpPanel;
