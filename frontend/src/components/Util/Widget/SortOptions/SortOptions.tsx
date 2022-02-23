import { Card, Popover, Space, Tab, Tabs } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import { SortType, TimeType } from "../../../../global";
import SortOption from "./SortOption/SortOption";
import styles from "./SortOptions.module.css";

interface Props {
    sort: SortType;
    time: TimeType;
    buildPageURL: (sort: SortType, time?: TimeType) => string;
}

function getTimeDisplay(time: TimeType) {
    switch(time) {
        case "day": {
            return "today";
        }
        case "week": {
            return "last week";
        }
        case "month": {
            return "last month";
        }
        case "year": {
            return "last year";
        }
        case "alltime": {
            return "all time";
        }
    }
}

const SortOptions = ({ sort, time, buildPageURL }: Props) => {

    const [opened, setOpened] = useState(false);

    return (
        <Card className={styles.Sort}>
            <Link href={buildPageURL("hot", time)}>
                <SortOption 
                    text="Hot" 
                    selected={sort === "hot"} 
                />
            </Link>
            <Link href={buildPageURL("new", time)}>
                <SortOption 
                    text="New" 
                    selected={sort === "new"} 
                />
            </Link>
            <Link href={buildPageURL("top", time)}>
                <SortOption 
                    text="Top" 
                    selected={sort === "top"} 
                />
            </Link>
            <span className={styles.From} >
                from
            </span>
            <Popover
                opened={opened}
                target={
                    <div 
                        className={styles.Select}
                        onClick={() => setOpened(!opened)}
                    >
                        { getTimeDisplay(time) }
                    </div>
                }
                onClose={() => setOpened(false)}
                position="bottom"
                placement="start"
                spacing={0}
                noFocusTrap
                noEscape
                styles={{
                    popover: {
                        borderRadius: 0,
                    }
                }}
            >
                <div className={styles.DateOptions}>
                    <Link href={buildPageURL(sort, "day")}>
                        <div className={styles.DateOption} onClick={() => setOpened(false)}>
                            today
                        </div>
                    </Link>
                    <Link href={buildPageURL(sort, "week")}>
                        <div className={styles.DateOption} onClick={() => setOpened(false)}>
                            last week
                        </div>
                    </Link>
                    <Link href={buildPageURL(sort, "month")}>
                        <div className={styles.DateOption} onClick={() => setOpened(false)}>
                            last month
                        </div>
                    </Link>
                    <Link href={buildPageURL(sort, "year")}>
                        <div className={styles.DateOption} onClick={() => setOpened(false)}>
                            last year
                        </div>
                    </Link>
                    <Link href={buildPageURL(sort, "alltime")}>
                        <div className={styles.DateOption} onClick={() => setOpened(false)}>
                            all time
                        </div>
                    </Link>
                </div>
            </Popover>
        </Card>
    );
}

export default SortOptions;