/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Title } from "@mantine/core";
import { buildFetchForumsUrl, ForumsRes } from "../../../client/api/forum";
import ForumLink from "../ForumLink/ForumLink";
import styles from "./ForumPreviewList.module.css";
import React from "react";
import Link from "next/link";
import { useFetch } from "../../../client/hooks/fetch";
import WhiteButton from "../../Util/Widget/WhiteButton/WhiteButton";

interface Props {
    limit?: number;
}

const ForumPreviewList = ({ limit }: Props) => {
    const { data } = useFetch<ForumsRes>(buildFetchForumsUrl(limit));

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
            <div className={styles.ForumLink}>
                <Link href="/forums">
                    More...
                </Link>
            </div>
        </div>
    );
}

export default ForumPreviewList;