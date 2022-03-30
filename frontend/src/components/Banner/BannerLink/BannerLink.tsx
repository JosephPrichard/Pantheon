/*
 * Copyright (c) Joseph Prichard 2022.
 */

import Link from "next/link";
import React, { FunctionComponent } from "react";
import styles from "./BannerLink.module.css";

interface Props {
    text: string;
    href?: string;
    onClick?: () => void;
}

const BannerLink: FunctionComponent<Props> = ({ text, href, onClick }: Props) => (
    <>
        {href ?
            <Link href={href}>
                <a className={styles.AppLink}>
                    <span className={styles.Element}>{text}</span>
                </a>
            </Link> 
            :
            <span className={styles.AppLink} onClick={onClick}>
                <span className={styles.Element}>{text}</span>
            </span>
        }
    </>
    
);

BannerLink.defaultProps = {
    onClick: () => {}
}

export default BannerLink;
