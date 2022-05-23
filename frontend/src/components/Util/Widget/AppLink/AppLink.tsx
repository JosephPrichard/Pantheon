/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React, { FunctionComponent, MouseEventHandler, ReactElement } from "react";
import styles from "./AppLink.module.css";
import Link from "next/link";

interface Props {
    icon: ReactElement;
    text: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    spacing?: string | number;
}

const AppLink: FunctionComponent<Props> = ({ icon, text, href, onClick, spacing }: Props) => (
    <div
        className={styles.IconWrapper}
        style={{
            marginRight: spacing
        }}
    >
        <span className={styles.Icon}>{icon}</span>
        {href ?
            <Link href={href}>
                <span className={styles.AlignedText}>{text}</span>
            </Link>
            :
            <div onClick={onClick}>
                <span className={styles.AlignedText}>{text}</span>
            </div>
        }
    </div>

);

AppLink.defaultProps = {
    onClick: () => {},
    spacing: 15
};

export default AppLink;
