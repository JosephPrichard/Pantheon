/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Title } from "@mantine/core";
import React, { FunctionComponent } from "react";
import TopBanner from "../Banner/TopBanner/TopBanner";
import styles from "./Error.module.css";

interface Props {
    code?: number;
    message?: string;
}

const Error: FunctionComponent<Props> = ({ code, message }: Props) => (
    <>
        <TopBanner />
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

Error.defaultProps = {
    code: 404,
    message: "We couldn't find the page you were looking for."
}

export default Error;
