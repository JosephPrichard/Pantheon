import { InputWrapper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import axios from "axios";
import request from "axios";
import React, { useCallback, useState } from "react";
import { config } from "../../../api/config";
import { SignInBody, SignInRes } from "../../../api/interfaces/auth";
import { ErrorRes } from "../../../api/interfaces/common";
import { setCookie } from "../../cookie";
import FormButton from "../../Util/Widget/FormButton/FormButton";
import styles from "./LoginPanel.module.css";

function login(body: SignInBody) {
    return axios.post<SignInRes>("/api/auth", body, config);
}

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
                .then((res) => {
                    setCookie(res.data);
                    document.location.href = "/";
                })
                .catch((err) => {
                    if (request.isAxiosError(err) && err.response) {
                        const errData = err.response.data as ErrorRes;
                        setError(errData.msg ?? "");
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
