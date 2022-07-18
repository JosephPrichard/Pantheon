/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { InputWrapper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { ErrorRes } from "../../../client/types";
import FormButton from "../../Util/Widget/FormButton/FormButton";
import styles from "./SignUpPanel.module.css";
import { createUser, signIn } from "../../../client/api/login";
import { isValidError } from "../../../client/util";
import Message from "../../Util/Widget/Message/Message/Message";
import { useRouter } from "next/router";

const SignUpPanel = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const clearError = useCallback(
        () => {
            setError(false);
            setMessage("");
        },
        []
    );

    const submit = useCallback(
        (e) => {
            e.preventDefault();

            setLoading(true);
            createUser({ name, password })
                .then(() => {
                    signIn({ name, password })
                        .then(() => {
                            router.push("/");
                        })
                        .catch(() => {
                            setError(true);
                            setMessage("Unexpected Error occurred");
                            setLoading(false);
                        });
                })
                .catch((err) => {
                    if (isValidError(err)) {
                        const errData = err.response.data as ErrorRes;
                        setError(true);
                        setMessage(errData.message);
                    }
                    setLoading(false);
                });
        },
        [name, password]
    );

    return (
        <div className={styles.SignUpPanel}>
            <Title className={styles.Title} order={2}>
                Sign Up
            </Title>
            <Text className={styles.Text}>Don't have an account? Signing up is free!</Text>
            <form onSubmit={submit}>
                <InputWrapper className={styles.InputWrapper} required label="User Name">
                    <TextInput
                        placeholder="Username"
                        value={name}
                        error={error}
                        onChange={(event) => {
                            setName(event.currentTarget.value);
                            clearError();
                        }}
                        autoComplete="username"
                    />
                </InputWrapper>
                <InputWrapper className={styles.InputWrapper} required label="Password">
                    <PasswordInput
                        placeholder="Password"
                        value={password}
                        error={error}
                        onChange={(event) => {
                            setPassword(event.currentTarget.value);
                            clearError();
                        }}
                        autoComplete="new-password"
                    />
                </InputWrapper>
                <Message message={message} />
                <FormButton text="Create Account" loading={loading} />
            </form>
        </div>
    );
};

export default SignUpPanel;
