import { Space } from "@mantine/core";
import React, { FunctionComponent } from "react";
import { ExternalLink } from "react-feather";
import styles from "./LinkContent.module.css";

export function clipUrl(url: string) {
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
    clip?: boolean;
    font?: number;
    space?: number;
}

const LinkContent: FunctionComponent<Props> = ({ url, clip, font, space }: Props) => (
    <>
        <a 
            href={url} 
            className={styles.Link}
            style={{
                fontSize: font
            }}
        >
            { clip ? clipUrl(url) : url }
            <ExternalLink size={14} className={styles.Icon}/>
        </a>
        <Space h={space}/>
    </>
);

LinkContent.defaultProps = {
    clip: true,
    space: 0
}

export default LinkContent;