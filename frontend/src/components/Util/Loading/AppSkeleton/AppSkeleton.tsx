/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Card, Skeleton } from "@mantine/core";
import React from "react";

interface Props {
    lighter: boolean;
}

const AppSkeleton = ({ lighter } : Props) => (
    <Card
        style={{
            backgroundColor: lighter ? "rgb(26, 27, 30)" : "rgb(24, 25, 28)",
            marginLeft: 10,
            marginRight: 10
        }}
    >
        <Skeleton height={12} width={"50%"} radius="xl" />
        <Skeleton height={8} width={"50%"} mt={10} radius="xl" />
        <Skeleton height={8} mt={10} width={"80%"} radius="xl" />
        <Skeleton height={8} mt={10} width={"65%"} radius="xl" />
    </Card>
);
export default AppSkeleton;
