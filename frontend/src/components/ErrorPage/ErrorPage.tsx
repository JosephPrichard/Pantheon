/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Title } from "@mantine/core";
import React, { FunctionComponent } from "react";
import Banner from "../Banner/Banner";

interface Props {
    code?: number;
    message?: string;
}

const ErrorPage: FunctionComponent<Props> = ({ code, message }: Props) => (
    <>
        <Banner />
        <div
            style={{
                width: "50%",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                margin: "auto",
                textAlign: "center"
            }}
        >
            <div>
                <Title
                    order={1}
                    style={{
                        fontSize: 200,
                        display: "block",
                        marginBottom: 0
                    }}
                >
                    { code }
                </Title>
            </div>
            <div>
                <Title
                    order={3}
                    style={{
                        fontSize: 20,
                        display: "block"
                    }}
                >
                    { message }
                </Title>
            </div>
        </div>
    </>
);

ErrorPage.defaultProps = {
    code: 404,
    message: "We couldn't find the page you were looking for."
}

export default ErrorPage;
