import React from "react";
import styles from "./LinkTitle.module.css";

interface Props {
    text: string;
}

const LinkTitle = ({ text }: Props) => <div className={styles.LinkTitle}>{text}</div>;

export default LinkTitle;
