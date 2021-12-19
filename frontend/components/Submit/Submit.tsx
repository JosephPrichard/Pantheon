import { Card, Divider, Space, Tab, Tabs, Title } from "@mantine/core";
import { Image, Link, Type } from "react-feather";
import axios from "axios";
import React, { useState } from "react";
import { config } from "../../api/config";
import { IdRes } from "../../api/interfaces/common";
import { CreateBody } from "../../api/interfaces/post";
import SubmitImage from "./submitImage/SubmitImage";
import SubmitText from "./submitText/SubmitText";
import styles from "./Submit.module.css";
import SubmitLink from "./submitLink/SubmitLink";

export function submitPost(body: CreateBody) {
    return axios.post<IdRes>("/api/posts", body, config);
}

const SubmitPost = () => {

    const [active, setActive] = useState(0);

    return (
        <div className={styles.SubmitPost}>
            <Title order={3} className={styles.SubmitTitle}>
                Create Post
            </Title>
            <Divider style={{ marginTop: 12, marginBottom: 18 }} />
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
                <SubmitText show={active === 0}/>
                <SubmitImage show={active === 1}/>
                <SubmitLink show={active === 2}/>
            </Card>
            <Space h={300}/>
        </div>
    );
};

export default SubmitPost;