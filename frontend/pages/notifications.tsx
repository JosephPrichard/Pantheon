/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NextPage } from "next";
import TopBanner from "../src/components/Banner/TopBanner/TopBanner";
import React from "react";
import NotificationsPanel from "../src/components/Notifications/NotificationsPanel/NotificationsPanel";
import { Space } from "@mantine/core";
import { NextSeo } from "next-seo";
import SingleColumn from "../src/components/Util/Layout/SingleColumn/SingleColumn";

const NotificationsPage: NextPage = () => {
    return (
        <>
            <NextSeo title="Pantheon Notifications"/>
            <TopBanner />
            <SingleColumn
                column={<NotificationsPanel/>}
                columnWidth="50%"
                columnMargin="25%"
            />
        </>
    );
};

export default NotificationsPage;