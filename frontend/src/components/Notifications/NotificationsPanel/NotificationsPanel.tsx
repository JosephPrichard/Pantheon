/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Card, Space, Title } from "@mantine/core";
import { fetchNotifications, markAllAsRead, NotificationsRes } from "../../../client/api/notifications";
import NotificationPanel from "../NotificationPanel/NotificationPanel";
import styles from "./NotificationsPanel.module.css";
import AppSkeleton from "../../Util/Loading/AppSkeleton/AppSkeleton";
import React, { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../../client/hooks/fetch";
import WhiteButton from "../../Util/Widget/WhiteButton/WhiteButton";
import LoadingButton from "../../Util/Widget/LoadingButton/LoadingButton";
import { NotificationEntity } from "../../../client/models/notification";
import { findNotificationsCursor } from "../../../utils/cursor";

const NotificationsPanel = () => {

    const { data } = useFetch<NotificationsRes>("/api/notifications");

    const [notifications, setNotifications] = useState<NotificationEntity[]>();
    const [showLoadMore, setShowLoadMore] = useState<boolean>();

    useEffect(() => {
        setShowLoadMore(data?.nextPage);
        setNotifications(data?.notifications)
    }, [data]);

    const onMarkAsRead = useCallback(
        () => {
            if (notifications) {
                const newNotifications = notifications.map(notification => {
                    notification.read = true;
                    return notification;
                });
                markAllAsRead().then(() => setNotifications(newNotifications));
            }
        },
        [notifications]
    );

    const loadMore = useCallback(() => {
        if (notifications) {
            // find the last occurring comment for cursor
            const afterCursor = findNotificationsCursor(notifications);
            // fetch the new notifications and add them to the list of the old notifications
            if (afterCursor) {
                fetchNotifications(afterCursor)
                    .then((r) => {
                        const newNotifications = notifications.map(notification => notification);
                        newNotifications.push(...r.data.notifications);
                        setNotifications(newNotifications);
                        setShowLoadMore(r.data.nextPage);
                    });
            }
        }
    }, [notifications]);

    return (
        <Card className={styles.Notifications}>
            <div className={styles.NotificationsContainer}>
                <Space h={25}/>
                <div className={styles.TitleWrapper}>
                    <Title order={3}>
                        Inbox
                    </Title>
                    <div className={styles.MarkButton}>
                        <WhiteButton text="Mark as read" onClick={onMarkAsRead}/>
                    </div>
                </div>
                <Space h={20}/>
                {notifications ?
                    (notifications.length != 0) ?
                        <>
                            {notifications.map((notification, i) => (
                                <NotificationPanel
                                    key={i}
                                    notification={notification}
                                    lighter={i % 2 == 0}
                                />
                            ))}
                        </>
                        :
                        <div className={styles.BigText}>
                            Your inbox is empty.
                        </div>
                    :
                    <>
                        {Array(8).fill(0).map((n, i) => (
                            <AppSkeleton key={i} lighter={true} />
                        ))}
                    </>
                }
                {!showLoadMore ||
                    <LoadingButton loadMore={loadMore}/>
                }
            </div>
        </Card>
    );
}

export default NotificationsPanel;