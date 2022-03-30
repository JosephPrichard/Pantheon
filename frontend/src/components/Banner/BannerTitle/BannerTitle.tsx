/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Title } from "@mantine/core";
import Link from "next/link";
import styles from "./BannerTitle.module.css";

interface Props {
    text?: string;
    href?: string;
}

const BannerTitle = ({ text, href }: Props) => (
    <Title
        className={styles.Title}
        order={4}
    >
        {!href ||
            <Link href={href}>
                <a className={styles.a}>
                    {!text ||
                        <>
                            { text }
                        </>
                    }
                </a>
            </Link>
        }
    </Title>
);

export default BannerTitle;