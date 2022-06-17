/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Space, Title } from "@mantine/core";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import { buildFetchForumsUrl, ForumsRes } from "../../../client/api/forum";
import ForumLink from "../ForumLink/ForumLink";
import styles from "./ForumPreviewList.module.css";
import React from "react";
import Link from "next/link";
import { WHITE } from "../../colors";

interface Props {
    limit?: number;
}

const ForumPreviewList = ({ limit }: Props) => {
    const { data } = useSWR<ForumsRes>(buildFetchForumsUrl(limit), fetcher);

    return (
        <div>
            <Title order={4}>
                Forums
            </Title>
            <div className={styles.Forums}>
                {!data?.forums || 
                    data.forums.map((forum, i) => {
                        return (
                            <ForumLink key={i} forum={forum}/>
                        );
                    })
                }
            </div>
            <Link href="/forums">
                <div className={styles.ForumLink}>
                    { "More..." }
                </div>
            </Link>
        </div>
    );
}

export default ForumPreviewList;