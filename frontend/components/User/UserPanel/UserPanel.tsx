import React from "react";
import styles from "./UserPanel.module.css";
import { Text, Title } from "@mantine/core";
import { Calendar, Heart } from "react-feather";
import { UserData } from "../User";
import AppAvatar from "../../Util/Widget/AppAvatar/AppAvatar";

interface Props {
    userData: UserData;
}

const UserPanel = ({ userData }: Props) => (
    <div className={styles.DataPanel}>
        <AppAvatar width={80} height={80} />
        <div className={styles.UserText}>
            <Title order={3} className={styles.UserTitle}>
                {userData.name}
            </Title>
            <div>{userData.description}</div>
            <div className={styles.DataBox}>
                <Title order={5}>Joined</Title>
                <span className={styles.IconWrapper}>
                    <Calendar size={15} className={styles.Icon} />
                    <Text className={styles.DataText}>{userData.joined}</Text>
                </span>
            </div>
            <div className={styles.DataBox}>
                <Title order={5}>Karma</Title>
                <span className={styles.IconWrapper}>
                    <Heart size={15} className={styles.Icon} />
                    <Text className={styles.DataText}>0</Text>
                </span>
            </div>
        </div>
    </div>
);

export default UserPanel;
