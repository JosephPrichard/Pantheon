/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NextPage } from "next";
import ErrorPage from "../src/components/ErrorPage/ErrorPage";

const Error404Page: NextPage = () => {
    return (
        <ErrorPage/>
    );
};

export default Error404Page;