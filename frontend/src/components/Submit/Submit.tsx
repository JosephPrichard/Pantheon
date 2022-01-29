import { Card, Space, Tab, Tabs, Title } from "@mantine/core";
import { Image, Link, Type } from "react-feather";
import React, { useState } from "react";
import SubmitImage from "./SubmitImage/SubmitImage";
import SubmitText from "./SubmitText/SubmitText";
import styles from "./Submit.module.css";
import SubmitLink from "./SubmitLink/SubmitLink";
import { ForumEntity } from "../../client/models/forum";

interface Props {
    initialForum?: ForumEntity;
}

const Submit = ({ initialForum }: Props) => {

    const [forum, setForum] = useState(initialForum);
    const [active, setActive] = useState(0);

    return (
        <div className={styles.SubmitPost}>
            <Title order={3} className={styles.SubmitTitle}>
                Create Post
            </Title>
            <div className={styles.Hr}/>
            <Card className={styles.SubmitPanel}>
                <Space h="md"/>
                <Tabs className={styles.Tabs} active={active}>
                    <Tab 
                        label="Text" 
                        icon={<Type/>}
                        className={styles.Tab}
                        onClick={() => setActive(0)}
                    />
                    <Tab 
                        label="Images" 
                        icon={<Image/>}
                        className={styles.Tab}
                        onClick={() => setActive(1)}
                    />
                    <Tab 
                        label="Link" 
                        icon={<Link/>}
                        className={styles.Tab}
                        onClick={() => setActive(2)}
                    />
                </Tabs>
                <Space h="md"/>
                <SubmitText forum={forum} show={active === 0}/>
                <SubmitImage forum={forum} show={active === 1}/>
                <SubmitLink forum={forum} show={active === 2}/>
            </Card>
        </div>
    );
};

export default Submit;