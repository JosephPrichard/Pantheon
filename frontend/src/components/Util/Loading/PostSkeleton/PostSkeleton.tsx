import { Card, Skeleton } from "@mantine/core";
import React from "react";
import styles from "./PostSkeleton.module.css";

interface Props {
    lighter: boolean;
}

const PostSkeleton = ({ lighter } : Props) => (
    <Card 
        className={styles.PostPanel}
        style={{
            backgroundColor: lighter ? "rgb(26, 27, 30)" : "rgb(24, 25, 28)"
        }}
    >
        <Skeleton height={12} width={"50%"} radius="xl" />
        <Skeleton height={8} width={"50%"} mt={10} radius="xl" />
        <Skeleton height={8} mt={10} width={"80%"} radius="xl" />
        <Skeleton height={8} mt={10} width={"65%"} radius="xl" />
    </Card>
);
export default PostSkeleton;
