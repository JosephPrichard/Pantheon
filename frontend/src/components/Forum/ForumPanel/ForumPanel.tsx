/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Card, Space, Title } from "@mantine/core";
import { FunctionComponent } from "react";
import { Calendar } from "react-feather";
import { ForumEntity } from "../../../client/models/forum";
import { formatCreatedAt } from "../../../utils/date";
import styles from "./ForumPanel.module.css";
import PostSubmitButton from "../../Submit/PostSubmitButton/PostSubmitButton";
import SubscriptionButton from "../../Subscription/SubscriptionButton/SubscriptionButton";

interface Props {
    forum: ForumEntity;
}

function formatSubscribers(subs: number) {
    if (subs >= 1_000_000) {
        return (subs / 1_000_000).toFixed(1) + "m";
    }
    if(subs >= 1_000) {
        return (subs / 1_000).toFixed(1) + "k";
    }
    return subs;
}

const ForumPanel: FunctionComponent<Props> = ({ forum }: Props) => {
    return (
        <Card className={styles.ForumPanel}>
            <Title order={4} className={styles.Title}>
                { forum.id }
            </Title>
            {forum.description === "" ||
                <div className={styles.Content}>
                    { forum.description }
                </div>
            }
            <Space h={15} w={5}/>
            <div>
                { formatSubscribers(forum.subscriptions) } subscribers
            </div>
            <Space h={2} w={5}/>
            <div className={styles.IconWrapper}>
                <Calendar size={15} className={styles.Icon} />
                <span className={styles.AlignedText}>
                    Created { formatCreatedAt(forum.createdAt) }
                </span>
            </div>
            <Space h={15} w={5}/>
            <PostSubmitButton forumId={forum.id}/>
            <SubscriptionButton forumId={forum.id}/>
            <Space h={15} w={5}/>
        </Card>
    );
}

export default ForumPanel;