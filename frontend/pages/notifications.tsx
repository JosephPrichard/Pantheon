/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NextPage } from "next";
import Banner from "../src/components/Banner/Banner";
import React from "react";
import NotificationsPanel from "../src/components/Notifications/NotificationsPanel";
import { Space } from "@mantine/core";
import { NextSeo } from "next-seo";

const NotificationsPage: NextPage = () => {
    return (
        <>
            <NextSeo title="Pantheon Notifications"/>
            <Banner />
            <Space h={40} w={1}/>
            <NotificationsPanel/>
        </>
    );
};

export default NotificationsPage;