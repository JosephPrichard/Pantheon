/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { InputWrapper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { ErrorRes } from "../../../client/types";
import FormButton from "../../Util/Widget/FormButton/FormButton";
import styles from "./LoginPanel.module.css";
import { signIn } from "../../../client/api/login";
import { isValidError } from "../../../client/util";
import Message from "../../Util/Widget/Message/Message/Message";
import { useRouter } from "next/router";

const LoginPanel = () => {
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
            signIn({ name, password })
                .then(() => {
                    router.push("/")
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
        <div className={styles.LoginPanel}>
            <Title className={styles.Title} order={2}>
                Log In
            </Title>
            <Text className={styles.Text}>Already have an account? Login here.</Text>
            <form onSubmit={submit}>
                <InputWrapper className={styles.InputWrapper} required label="User Name">
                    <TextInput
                        placeholder="Username"
                        value={name}
                        onChange={(event) => {
                            setName(event.currentTarget.value);
                            clearError();
                        }}
                        error={error}
                        autoComplete="username"
                    />
                </InputWrapper>
                <InputWrapper className={styles.InputWrapper} required label="Password">
                    <PasswordInput
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.currentTarget.value);
                            clearError();
                        }}
                        error={error}
                        autoComplete="current-password"
                    />
                </InputWrapper>
                <Message message={message} />
                <FormButton text="Log In" loading={loading} />
            </form>
        </div>
    );
};

export default LoginPanel;
