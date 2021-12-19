import { Card, Popover, Space } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import { SortType, TimeType } from "../../../../model/global";
import SortOption from "./SortOption/SortOption";
import styles from "./SortOptions.module.css";

interface Props {
    sort: SortType;
    time: TimeType;
    buildURL: (sort: SortType, time?: TimeType) => string;
}

function getTimeDisplay(time: TimeType) {
    switch(time) {
        case "day": {
            return "Today";
        }
        case "week": {
            return "This Week";
        }
        case "month": {
            return "This Month";
        }
        case "year": {
            return "This Year";
        }
        case "alltime": {
            return "All Time";
        }
    }
}

const SortOptions = ({ sort, time, buildURL }: Props) => {

    const [opened, setOpened] = useState(false);

    return (
        <Card className={styles.Sort}>
            <Space/>
            <Link href={buildURL("new")}>
                <SortOption 
                    text="New" 
                    selected={sort === "new"} 
                />
            </Link>
            <Space/>
            <Link href={buildURL("top", time)}>
                <SortOption 
                    text="Top" 
                    selected={sort === "top"} 
                />
            </Link>
            <Space/>
            <Popover
                hidden={sort !== "top"}
                opened={opened}
                target={
                    <SortOption 
                        text={getTimeDisplay(time)}
                        selected={sort === "top"} 
                        onClick={() => setOpened(!opened)}
                        withArrow
                    />
                }
                onClose={() => setOpened(false)}
                position="bottom"
                placement="start"
                spacing={0}
                withArrow
                noFocusTrap
                noEscape
            >
                <div className={styles.DateOptions}>
                    <Link href={buildURL("top", "day")}>
                        <div className={styles.DateOption}>
                            Today
                        </div>
                    </Link>
                    <Link href={buildURL("top", "week")}>
                        <div className={styles.DateOption}>
                            This Week
                        </div>
                    </Link>
                    <Link href={buildURL("top", "month")}>
                        <div className={styles.DateOption}>
                            This Month
                        </div>
                    </Link>
                    <Link href={buildURL("top", "year")}>
                        <div className={styles.DateOption}>
                            This Year
                        </div>
                    </Link>
                    <Link href={buildURL("top", "alltime")}>
                        <div className={styles.DateOption}>
                            All Time
                        </div>
                    </Link>
                </div>
            </Popover>
        </Card>
    );
}

export default SortOptions;