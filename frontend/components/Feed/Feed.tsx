import { Card, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { SortType, TimeType } from "../../model/global";
import AppAvatar from "../Util/Widget/AppAvatar/AppAvatar";
import Posts from "../Post/Posts/Posts";
import SortOptions from "../Util/Widget/SortOptions/SortOptions";
import Link from "next/link";
import styles from "./Feed.module.css";
import { getCookie } from "../cookie";
import Body from "../Util/Layout/Body/Body";

interface Props {
    sort: SortType;
    time: TimeType;
    page: number;
}

function buildURL(sort: SortType, time?: TimeType) {
    let url = "/" + sort + "";
    if (sort === "top" && time) {
        url += "?t=" + time;
    }
    return url;
}

const Feed = ({ sort, time, page }: Props) => {

    const [name, setName] = useState<string>();

    useEffect(() => {
        const cookieData = getCookie();
        setName(cookieData?.name);
    });

    return (
        <Body width="50%" minWidth={700}>
            {!name ||
                <Card className={styles.Create}>
                    <AppAvatar
                        width={40}
                        height={40}
                    />
                    <Link href="/submit">
                        <TextInput
                            className={styles.CreateInput}
                            placeholder="Create Post"
                            autoComplete="off"
                        />
                    </Link>    
                </Card>
            }
            <SortOptions 
                sort={sort} 
                time={time} 
                buildURL={buildURL}
            />
            <Posts 
                sort={sort}
                time={time}
                page={page}
                buildURL={buildURL}
            />
        </Body>
    );
}

export default Feed;