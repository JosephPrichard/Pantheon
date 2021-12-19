import React, { FunctionComponent, MouseEventHandler, ReactElement } from "react";
import styles from "./PostLink.module.css";

interface Props {
    icon: ReactElement;
    text: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

const AppLink: FunctionComponent<Props> = ({ icon, text, href, onClick }: Props) => (
    <a className={styles.AppLink} href={href} onClick={onClick}>
        <span className={styles.Element}>{icon}</span>
        <span>{text}</span>
    </a>
);

AppLink.defaultProps = {
    onClick: () => {}
};

export default AppLink;
