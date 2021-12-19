import { Card, Skeleton, Space } from "@mantine/core";
import React from "react";
import styles from "./PostSkeleton.module.css";

const PostSkeleton = () => (
    <Card className={styles.PostPanel}>
        <Skeleton height={8} width="40%" radius="xl" />
        <Skeleton height={16} mt={6} radius="xl" />
        <Space h="xs"/>
        <Skeleton height={200} mt={6}/>
    </Card>
);
export default PostSkeleton;
