import { Card, Space, Tab, Tabs, Title } from "@mantine/core";
import { Image, Link, Type } from "react-feather";
import React, { useState } from "react";
import SubmitImage from "./SubmitImage/SubmitImage";
import SubmitText from "./SubmitText/SubmitText";
import styles from "./Submit.module.css";
import SubmitLink from "./SubmitLink/SubmitLink";
import { ForumEntity } from "../../client/models/forum";
import Divider from "../Util/Widget/Divider/Divider";

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
            <Divider/>
            <Card className={styles.SubmitPanel}>
                <Space h="md"/>
                <Tabs className={styles.Tabs} onTabChange={setActive}>
                    <Tab 
                        label="Text" 
                        icon={<Type/>}
                        className={styles.Tab}
                    />
                    <Tab 
                        label="Images" 
                        icon={<Image/>}
                        className={styles.Tab}
                    />
                    <Tab 
                        label="Link" 
                        icon={<Link/>}
                        className={styles.Tab}
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