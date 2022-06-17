/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Card, Space, Title } from "@mantine/core";
import React, { FunctionComponent } from "react";
import styles from "./FeedPanel.module.css";

interface Props {
    title: string;
    description: React.ReactNode;
    children: React.ReactNode;
}

const FeedPanel: FunctionComponent<Props> = ({ title, description, children }: Props) => (
    <Card className={styles.FeedPanel}>
        <Title order={4} className={styles.Title}>
            { title }
        </Title>
        <div className={styles.FeedDesc}>
            { description }
        </div>
        <Space h={10} w={1}/>
        { children }
    </Card>
);

export default FeedPanel;