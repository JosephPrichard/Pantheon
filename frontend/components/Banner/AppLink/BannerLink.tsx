import Link from "next/link";
import React, { FunctionComponent, ReactElement } from "react";
import styles from "./BannerLink.module.css";

interface Props {
    icon: ReactElement;
    text: string;
    href?: string;
    onClick?: () => void;
}

const AppLink: FunctionComponent<Props> = ({ icon, text, href, onClick }: Props) => (
    <>
        {href ?
            <Link href={href}>
                <a className={styles.AppLink}>
                    <span>{icon}</span>
                    <span className={styles.Element}>{text}</span>
                </a>
            </Link> 
            :
            <span className={styles.AppLink} onClick={onClick}>
                <span>{icon}</span>
                <span className={styles.Element}>{text}</span>
            </span>
        }
    </>
    
);

AppLink.defaultProps = {
    onClick: () => {}
}

export default AppLink;
