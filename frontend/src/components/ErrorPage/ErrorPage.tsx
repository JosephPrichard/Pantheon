/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Title } from "@mantine/core";
import React, { FunctionComponent } from "react";
import Banner from "../Banner/Banner";
import styles from "./ErrorPage.module.css";

interface Props {
    code?: number;
    message?: string;
}

const ErrorPage: FunctionComponent<Props> = ({ code, message }: Props) => (
    <>
        <Banner />
        <div className={styles.Wrapper}>
            <div className={styles.Error}>
                <div>
                    <Title className={styles.Code} order={1}>
                        { code }
                    </Title>
                </div>
                <div>
                    <Title className={styles.Message} order={3}>
                        { message }
                    </Title>
                </div>
            </div>
        </div>
    </>
);

ErrorPage.defaultProps = {
    code: 404,
    message: "We couldn't find the page you were looking for."
}

export default ErrorPage;
