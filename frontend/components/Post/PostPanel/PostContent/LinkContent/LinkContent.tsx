import React from "react";
import { ExternalLink } from "react-feather";
import styles from "./LinkContent.module.css";

function clipUrl(url: string) {
    url = url.replace("www.", "");
    const start = url.indexOf("//") + 2;
    url = url.substring(start);
    const endQuery = url.indexOf("?");
    if (endQuery !== -1) {
        url = url.substring(0, endQuery);
    }
    if(url[url.length - 1] === "/") {
        url = url.substring(0, url.length - 1);
    }
    return url;
}

interface Props {
    url: string;
}

const LinkContent = ({ url }: Props) => (
    <div className={styles.LinkContainer}>
        <a href={url} onClick={e => e.stopPropagation()} className={styles.Link}>
            { clipUrl(url) }
            <ExternalLink size={14} className={styles.Icon}/>
        </a>
    </div>
);

export default LinkContent;