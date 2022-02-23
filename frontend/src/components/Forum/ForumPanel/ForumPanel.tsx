import { Card, Space, Title } from "@mantine/core";
import { FunctionComponent } from "react";
import { Calendar } from "react-feather";
import { ForumEntity } from "../../../client/models/forum";
import { formatCreatedAt } from "../../../utils/date";
import ModList from "../../Moderator/ModList/ModList";
import styles from "./ForumPanel.module.css";
import SubmitButton from "../../Submit/SubmitButton/SubmitButton";
import SubscriptionButton from "../../Subscription/SubscriptionButton";

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
            <Space h={5}/>
            <Title order={4} className={styles.Title}>
                { forum.id }
            </Title>
            {forum.description === "" ||
                <>
                    <Space h={10}/>
                    <div className={styles.Content}>
                        { forum.description }
                    </div>
                </>
            }
            <Space h={20}/>
            <div>
                { formatSubscribers(forum.subscriptions) } subscribers
            </div>
            <Space h={5}/>
            <div className={styles.IconWrapper}>
                <Calendar size={15} className={styles.Icon} />
                <span className={styles.AlignedText}>
                    Created { formatCreatedAt(forum.createdAt) }
                </span>
            </div>
            <Space h={20}/>
            <SubmitButton forumId={forum.id}/>
            <SubscriptionButton forumId={forum.id}/>
            <Space h={20}/>
            <ModList forumId={forum.id}/>
        </Card>
    );
}

export default ForumPanel;