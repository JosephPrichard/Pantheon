import { InputWrapper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { ErrorRes } from "../../../client/response";
import FormButton from "../../Util/Widget/FormButton/FormButton";
import styles from "./LoginPanel.module.css";
import { login } from "../Login.client";
import { isValidError } from "../../../client/util";

const LoginPanel = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const submit = useCallback(
        (e) => {
            e.preventDefault();

            setLoading(true);
            login({
                email: email,
                password: password
            })
                .then(() => {
                    document.location.href = "/";
                })
                .catch((err) => {
                    if (isValidError(err)) {
                        const errData = err.response.data as ErrorRes;
                        setError(errData.message);
                    }
                    setLoading(false);
                });
        },
        [email, password]
    );

    return (
        <div className={styles.LoginPanel}>
            <Title className={styles.Title} order={2}>
                Log In
            </Title>
            <Text className={styles.Text}>Already have an account? Login here.</Text>
            <form onSubmit={submit}>
                <InputWrapper className={styles.InputWrapper} required label="Email Address">
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.currentTarget.value);
                            setError("");
                        }}
                        error={error}
                        autoComplete="email"
                    />
                </InputWrapper>
                <InputWrapper className={styles.InputWrapper} required label="Password">
                    <PasswordInput
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.currentTarget.value);
                            setError("");
                        }}
                        autoComplete="current-password"
                    />
                </InputWrapper>
                <FormButton text="Log In" loading={loading} />
            </form>
        </div>
    );
};

export default LoginPanel;
