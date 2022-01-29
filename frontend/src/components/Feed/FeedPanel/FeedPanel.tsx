import { Card, Space, Title } from "@mantine/core";
import React, { FunctionComponent } from "react";
import styles from "./FeedPanel.module.css";

interface Props {
    title: string;
    description: string;
    children: React.ReactNode;
}

const FeedPanel: FunctionComponent<Props> = ({ title, description, children }: Props) => (
    <Card className={styles.FeedPanel}>
        <Title order={3} className={styles.Title}>
            { title }
        </Title>
        <div>
            { description }
        </div>
        <Space h={20}/>
        { children }
    </Card>
);

export default FeedPanel;