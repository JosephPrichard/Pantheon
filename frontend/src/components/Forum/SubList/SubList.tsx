import { Title } from "@mantine/core";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import { SubsRes } from "../Forum.client";
import ForumLink from "../ForumLink/ForumLink";
import styles from "./SubList.module.css";

const SubList = () => {
    const { data } = useSWR<SubsRes>("/api/subscriptions", fetcher);

    return (
        <>
            <Title order={5}>
                Subscriptions
            </Title>
            <div className={styles.Forums}>
                {!data?.subscriptions || 
                    data.subscriptions.sort((a, b) => a.forum.id.localeCompare(b.forum.id)).map((subscription, i) => {
                        return (
                            <ForumLink key={i} forum={subscription.forum}/>
                        );
                    })
                }
            </div>
        </>
    );
}

export default SubList;