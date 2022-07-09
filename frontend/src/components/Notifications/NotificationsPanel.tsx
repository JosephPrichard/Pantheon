/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Space, Title } from "@mantine/core";
import { markAllAsRead, NotificationsRes } from "../../client/api/notifications";
import NotificationPanel from "./NotificationPanel/NotificationPanel";
import styles from "./NotificationsPanel.module.css";
import AppSkeleton from "../Util/Loading/AppSkeleton/AppSkeleton";
import React, { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";

const NotificationsPanel = () => {

    const { data } = useFetch<NotificationsRes>("/api/notifications");

    useEffect(() => {
        markAllAsRead().then(() => {});
    }, [])

    return (
        <div className={styles.Wrapper}>
            <div className={styles.Left}>
                <Title order={3}>
                    Inbox
                </Title>
            </div>
            <Space h={20}/>
            <div className={styles.Notifications}>
                {data?.notifications ?
                    (data.notifications.length != 0) ?
                        <>
                            {data.notifications.map((notification, i) => (
                                <NotificationPanel
                                    key={i}
                                    notification={notification}
                                    separator={i != data.notifications.length - 1}
                                />
                            ))}
                        </>
                        :
                        <div>
                            Your inbox is empty.
                        </div>
                    :
                    <>
                        {Array(8).fill(0).map((n, i) => (
                            <AppSkeleton key={i} lighter={true} />
                        ))}
                    </>
                }
            </div>
        </div>
    );
}

export default NotificationsPanel;