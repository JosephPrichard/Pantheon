/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Title } from "@mantine/core";
import { SubsRes } from "../../../client/api/subscription";
import ForumLink from "../../Forum/ForumLink/ForumLink";
import styles from "./SubList.module.css";
import { useFetch } from "../../../client/hooks/fetch";

const SubList = () => {
    const { data } = useFetch<SubsRes>("/api/subscriptions");

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