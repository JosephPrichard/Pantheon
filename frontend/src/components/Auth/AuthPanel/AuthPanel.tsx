/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Center, Divider } from "@mantine/core";
import React from "react";
import styles from "./AuthPanel.module.css";
import LoginPanel from "../LoginPanel/LoginPanel";
import SignUpPanel from "../SignUpPanel/SignUpPanel";

const AuthPanel = () => {
    return (
        <Center className={styles.Login}>
            <SignUpPanel />
            <Divider orientation="vertical" />
            <LoginPanel />
        </Center>
    );
};

export default AuthPanel;
