/*
 * Copyright (c) Joseph Prichard 2022.
 */

import Link from "next/link";
import React from "react";
import styles from "./FeedPagination.module.css";

interface Props {
    afterCursor?: number;
    beforeCursor?: number;
    showNext?: boolean;
    showPrev?: boolean;
    url: string;
}

function buildAfterURL(url: string, cursor: number) {
    if (url.includes("?")) {
        return url + "&after=" + cursor;
    } else {
        return url + "?after=" + cursor;
    }
}

function buildBeforeURL(url: string, cursor: number) {
    if (url.includes("?")) {
        return url + "&before=" + cursor;
    } else {
        return url + "?before=" + cursor;
    }
}

const FeedPagination = ({ afterCursor, beforeCursor, showNext, showPrev, url }: Props) => {
    return (
        <div className={styles.Pagination}>
            <div className={styles.PaginationInner}>
                { (beforeCursor === undefined || !showPrev) ||
                    <Link href={buildBeforeURL(url, beforeCursor)}>
                        <div className={styles.Button}>
                            Prev
                        </div>
                    </Link>
                }
                { (afterCursor === undefined || !showNext) ||
                    <Link href={buildAfterURL(url, afterCursor)}>
                        <div className={styles.Button}>
                            Next
                        </div>
                    </Link>
                }
            </div>
        </div>
    );
}

export default FeedPagination;