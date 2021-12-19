import { Center } from "@mantine/core";
import React, { ReactNode } from "react";
import styles from "./AbsoluteCenter.module.css";

interface Props {
    children: ReactNode;
}

const AbsoluteCenter = ({ children }: Props) => <Center className={styles.AbsoluteCenter}>{children}</Center>;

export default AbsoluteCenter;
