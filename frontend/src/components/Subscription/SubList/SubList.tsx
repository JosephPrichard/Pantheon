/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Title } from "@mantine/core";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import { SubsRes } from "../Subscription.client";
import ForumLink from "../../Forum/ForumLink/ForumLink";
import styles from "./SubList.module.css";

const SubList = () => {
    const { data } = useSWR<SubsRes>("/api/subscriptions", fetcher);

    const subs = data?.subscriptions?.sort((a, b) => a.forum.id.localeCompare(b.forum.id));

    return (
        <>
            {(!subs || (subs.length < 1)) ||
                <>
                    <Title order={4}>
                        Subscriptions
                    </Title>
                    <div className={styles.SubList}>
                        {subs.map((subscription, i) => {
                            return (
                                <ForumLink key={i} forum={subscription.forum}/>
                            );
                        })}
                    </div>
                </>
            }
        </>
    );
}

export default SubList;