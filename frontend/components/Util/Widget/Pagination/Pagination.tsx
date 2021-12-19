import Link from "next/link";
import React, { FunctionComponent } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { ORANGE } from "../../../colors";
import styles from "./Pagination.module.css";

interface Props {
    page: number;
    total: number;
    siblings?: number;
    boundaries?: number;
    url: string;
}

function buildURL(url: string, page: number) {
    if (url.includes("?")) {
        return url + "&p=" + page;
    } else {
        return url + "?p=" + page;
    }
}

// component similar to mantine ui's pagination that is more specified for my app's needs
const Pagination = ({ page, total, url, siblings, boundaries }: Props) => {

    if (!siblings) {
        siblings = 3;
    }

    if (!boundaries) {
        boundaries = 1;
    }

    const Page = (url: string, i: number) => {
        return(
            <Link href={buildURL(url, i)} key={i}>
                <div 
                    className={styles.Page}
                    style={{
                        backgroundColor: page === i ? ORANGE : undefined
                    }}
                >
                    { i }
                </div>
            </Link>
        );
    }

    const pages: JSX.Element[] = [];
    // render the first few boundary pages at the very least
    let p = 1;
    for (; p <= boundaries && p <= total; p++) {
        pages.push(Page(url, p));
    }

    //render the middle pages: the page plus siblings on both sides
    let p1 = page - siblings

    //add between text
    if (p - p1 < 0) {
        pages.push(
            <span className={styles.Ellipses}>
                { "…" }
            </span>
        );
    }

    if (p1 < p) {
        p1 += p - p1;
    }
    for (; p1 <= total && p1 <=  page + siblings; p1++) {
        pages.push(Page(url, p1));
    }

    // render the last few boundaries pages at the very least
    let p2 = total - boundaries + 1;

    //add between text
    if (p1 - p2 < 0) {
        pages.push(
            <span className={styles.Ellipses}>
                { "…" }
            </span>
        );
    }

    if (p2 < p1) {
        p2 += p1 - p2;
    }
    for (; p2 <= total; p2++) {
        pages.push(Page(url, p2));
    }
    
    return (
        <div>
            {(page - 1 < 1) ||
                <Link href={buildURL(url, page - 1)}>
                    <div className={styles.Page}>
                        <ChevronLeft size={14}/>
                    </div>
                </Link>
            }
            { pages }
            {(page + 1 > total) ||
                <Link href={buildURL(url, page + 1)}>
                    <div className={styles.Page}>
                        <ChevronRight size={14}/>
                    </div>
                </Link>
            }
        </div>
    );
}

export default Pagination;