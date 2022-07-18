/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NotificationEntity } from "../../../client/models/notification";
import { Card } from "@mantine/core";
import { removeAllHTMLFromString } from "../../../utils/sanitize";
import styles from "./NotificationPanel.module.css";
import { getDateDisplay } from "../../../utils/date";
import Link from "next/link";
import { commentNotificationUrl } from "../../../utils/url";
import { useCallback } from "react";
import { markAsRead } from "../../../client/api/notifications";

interface Props {
    notification: NotificationEntity;
    lighter: boolean;
}

const NotificationPanel = ({ notification, lighter }: Props) => {

    const name = notification.comment.commenter?.name;
    const forum = notification.comment.post.forum;
    const date = getDateDisplay(new Date(notification.comment.createdAt));

    const onClick = useCallback(() => {
        markAsRead(notification.id);
    }, []);

    return (
        <Card
            className={styles.NotificationPanel}
            style={{
                backgroundColor: lighter ? undefined : "rgb(24, 25, 28)"
            }}
        >
            <div className={styles.Notification}>
                <div
                    className={styles.Dot}
                    style={{
                        color: notification.read ? "transparent" : undefined
                    }}
                >
                    {" • "}
                </div>
                <Link href={commentNotificationUrl(notification.comment)}>
                    <div onClick={onClick}>
                        <div className={styles.NotificationTitle}>
                            <span className={styles.NotificationInnerTitle}>
                                <span className={styles.HeaderTitle}>{ name ? name : "[deleted]" }</span>
                                <span> replied to your comment in </span>
                                <span className={styles.HeaderTitle}>{ forum }</span>
                            </span>
                            <span className={styles.NotificationText}> {" • "}  { date }</span>
                        </div>
                        <div className={styles.NotificationText}>
                            { name ? removeAllHTMLFromString(notification.comment.content) : "[deleted]" }
                        </div>
                    </div>
                </Link>
            </div>
        </Card>
    );
}

export default NotificationPanel;