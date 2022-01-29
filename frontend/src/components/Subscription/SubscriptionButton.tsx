import { Button } from "@mantine/core";
import Link from "next/link";
import useSWR from "swr";
import { ForumEntity } from "../../client/models/forum";
import { fetcher } from "../../utils/fetcher";
import { ORANGE } from "../colors";
import { IsSubbedRes } from "./Subscription.client";
import styles from "./SubscriptionButton.module.css";

interface Props {
    forum: ForumEntity;
}

const SubscriptionButton = ({ forum }: Props) => {

    // const { data } = useSWR<IsSubbedRes>(`/api/subscriptions/isSubbed?forum=${forum.id}`, fetcher);

    // return (
    //     <>
    //         {data !== undefined ? 
    //             <Button 
    //                 className={styles.Button}
    //                 style={{
    //                     backgroundColor: ORANGE
    //                 }}
    //                 onClick={() => {

    //                 }}
    //             >
    //                 { data.isSubbed ? "Subscribed" : "Subscribe" }
    //             </Button>
    //             :
    //             <Link href="/login"> 
    //                 <Button 
    //                     className={styles.Button}
    //                     style={{
    //                         backgroundColor: ORANGE
    //                     }}
    //                 >
    //                     Subscribe
    //                 </Button>
    //             </Link>
    //         }
    //     </>
    // );

    return (
        <>
            <Link href="/login"> 
                <Button 
                    className={styles.Button}
                    style={{
                        backgroundColor: ORANGE
                    }}
                >
                    Subscribe
                </Button>
            </Link>
        </>
    );
}

export default SubscriptionButton;