/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Space, Title } from "@mantine/core";
import { buildFetchForumsUrl, ForumsRes } from "../../../client/api/forum";
import styles from "./ForumList.module.css";
import DoubleColumn from "../../Util/Layout/DoubleColumn/DoubleColumn";
import ForumLargeLink from "../ForumLargeLink/ForumLargeLink";
import { useFetch } from "../../../client/hooks/fetch";

interface Props {
    limit?: number;
}

const ForumList = ({ limit }: Props) => {
    const { data } = useFetch<ForumsRes>(buildFetchForumsUrl(limit));

    return (
        <DoubleColumn
            column1={
                <div className={styles.ForumsWrapper}>
                    <Title order={2}>
                        Browse Forums
                    </Title>
                    <Space h={10}/>
                    <div className={styles.Forums}>
                        {!data?.forums ||
                            data.forums.map((forum, i) => {
                                return (
                                    <ForumLargeLink key={i} forum={forum}/>
                                )
                            })
                        }
                    </div>
                </div>
            }
            column1Width="100%"
            column2={<></>}
            column2Width="0%"
        />
    );
}

export default ForumList;