import { Title } from "@mantine/core";
import Link from "next/link";
import React from "react";
import styles from "./AppLogo.module.css";

const AppLogo = () => (
    <Title
        className={styles.Title}
        order={2}
    >
        <Link href="/">
            <a className={styles.a}>
                Pantheon
            </a>
        </Link>
    </Title>
);

export default AppLogo;
