/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Title } from "@mantine/core";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import { TopForumsRes } from "../Forum.client";
import ForumLink from "../ForumLink/ForumLink";
import styles from "./ForumList.module.css";

const ForumList = () => {
    const { data } = useSWR<TopForumsRes>("/api/forums/top", fetcher);

    return (
        <>
            <Title order={4}>
                Forums
            </Title>
            <div className={styles.Forums}>
                {!data?.forums || 
                    data.forums.sort((a, b) => a.id.localeCompare(b.id)).map((forum, i) => {
                        return (
                            <ForumLink key={i} forum={forum}/>
                        );
                    })
                }
            </div>
        </>
    );
}

export default ForumList;