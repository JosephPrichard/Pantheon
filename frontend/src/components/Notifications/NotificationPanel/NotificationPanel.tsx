/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NotificationEntity } from "../../../client/models/notification";
import { Title } from "@mantine/core";
import { removeAllHTMLFromString } from "../../../utils/sanitize";
import styles from "./Notification.module.css";
import { getDateDisplay } from "../../../utils/date";
import Link from "next/link";
import { commentUrl } from "../../../utils/url";

interface Props {
    notification: NotificationEntity;
    separator: boolean;
}

const NotificationPanel = ({ notification, separator }: Props) => {

    const name = notification.comment.commenter?.name;
    const forum = notification.comment.post.forum;
    const date = getDateDisplay(new Date(notification.comment.createdAt));

    const read = notification.read;

    return (
        <div
            className={styles.Wrapper}
            style={{
                borderBottom: separator ? "solid rgba(128,128,128,0.12) 1px" : undefined
            }}
        >
            <div
                className={styles.Dot}
                style={{
                    color: !read ? "rgb(51,105,212)" : "transparent"
                }}
            >
                {" • "}
            </div>
            <Link href={commentUrl(notification.comment)}>
                <div className={styles.Notification}>
                    <Title order={4}>
                        { name ? name : "[deleted]" } replied to your comment in { forum } { date }
                    </Title>
                    <div className={styles.NotificationText}>
                        { removeAllHTMLFromString(notification.comment.content) }
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default NotificationPanel;