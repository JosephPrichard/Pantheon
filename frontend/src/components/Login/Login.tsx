import { Center, Divider } from "@mantine/core";
import React from "react";
import styles from "./Login.module.css";
import LoginPanel from "./LoginPanel/LoginPanel";
import SignUpPanel from "./SignUpPanel/SignUpPanel";

const Login = () => {
    return (
        <Center className={styles.Login}>
            <SignUpPanel />
            <Divider orientation="vertical" />
            <LoginPanel />
        </Center>
    );
};

export default Login;
