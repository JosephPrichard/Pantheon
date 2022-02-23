import { Space, Title } from "@mantine/core";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import styles from "./ModList.module.css";
import { ModsRes } from "../Moderator.client";

interface Props {
    forumId: string;
}

const ModList = ({ forumId }: Props) => {
    const { data } = useSWR<ModsRes>(`/api/moderators/${forumId}`, fetcher);

    return (
        <>
        {(!data || data.moderators.length === 0) ||
            <>
                <Title order={4}>
                    Moderators
                </Title>
                <div className={styles.Mods}>
                    {!data?.moderators || 
                        data.moderators.sort((a, b) => a.forum.id.localeCompare(b.forum.id)).map((moderator, i) => {
                            console.log(moderator)
                            return (
                                <Link key={i} href={`/user/${moderator.user.id}`}>
                                    <div className={styles.Mod}>
                                        { moderator.user.name }
                                    </div>
                                </Link>
                            );
                        })
                    }
                </div>
                <Space h={15}/>
            </>
        }
        </>
    );
}

export default ModList;