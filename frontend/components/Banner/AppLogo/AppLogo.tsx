import { Title } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { ORANGE } from "../../colors";
import styles from "./AppLogo.module.css";

const AppLogo = () => (
    <Title
        className={styles.Title}
        order={3}
        style={{
            backgroundColor: ORANGE
        }}
    >
        <Link href="/">
            <a className={styles.a}>
                Pantheon
            </a>
        </Link>
    </Title>
);

export default AppLogo;
