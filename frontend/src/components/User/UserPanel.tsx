import React from "react";
import styles from "./UserPanel.module.css";
import { Card, Text, Title } from "@mantine/core";
import { Calendar, Heart } from "react-feather";
import { UserEntity } from "../../client/models/user";
import { formatCreatedAt } from "../../utils/date";

interface Props {
    user: UserEntity;
}

const UserPanel = ({ user }: Props) => (
    <Card className={styles.UserPanel}>
        <Title order={3} className={styles.UserTitle}>
                {user.name}
        </Title>
        <div>{user.description}</div>
        <div className={styles.DataBox}>
            <Title order={5}>Joined</Title>
            <span className={styles.IconWrapper}>
                <Calendar size={15} className={styles.Icon} />
                <Text className={styles.DataText}>
                    { formatCreatedAt(user.createdAt) }
                </Text>
            </span>
        </div>
        <div className={styles.DataBox}>
            <Title order={5}>Karma</Title>
            <span className={styles.IconWrapper}>
                <Heart size={15} className={styles.Icon} />
                <Text className={styles.DataText}>0</Text>
            </span>
        </div>
    </Card>
);

export default UserPanel;
