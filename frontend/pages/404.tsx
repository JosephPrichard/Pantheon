import { Title } from "@mantine/core";
import { NextPage } from "next";
import React from "react";
import Banner from "../components/Banner/Banner";

const Error404Page: NextPage = () => (
    <>
        <Banner />
        <div
            style={{
                width: "50%",
                height: "50%",
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
                        display: "block"
                    }}
                >
                    404
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
                    We couldn't find the page you were looking for.
                </Title>
            </div>
        </div>
    </>
);

export default Error404Page;
