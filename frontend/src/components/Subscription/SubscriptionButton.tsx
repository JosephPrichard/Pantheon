import { Button } from "@mantine/core";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { createSubscription, deleteSubscription, IsSubbedRes } from "./Subscription.client";
import styles from "./SubscriptionButton.module.css";
import { useState } from "react";

interface Props {
    forumId: string;
}

const SubscriptionButton = ({ forumId }: Props) => {
    const { data } = useSWR<IsSubbedRes>(`/api/subscriptions/isSubbed?forum=${forumId}`, fetcher);

    const [justSubbed, setJustSubbed] = useState<boolean | undefined>();

    const [isHovering, setHovering] = useState(false);

    function isSubbed() {
        return justSubbed !== undefined ? justSubbed : data?.isSubbed;
    }

    return (
        <>
            {!data ||
                <Button
                    className={styles.SubButton}
                    style={{
                        backgroundColor: !isSubbed() ? "rgb(205,205,205)" : "black",
                        color: !isSubbed() ? "black" : "rgb(205,205,205)",
                        borderColor: !isSubbed() ? undefined : "rgb(205,205,205)"
                    }}
                    onMouseOver={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    onClick={() => {
                        const body = { forum: forumId };
                        if (isSubbed()) {
                            deleteSubscription(body)
                                .then(() => {
                                    setJustSubbed(false);
                                });
                        } else {
                            createSubscription(body)
                                .then(() => {
                                    setJustSubbed(true);
                                });
                        }
                    }}
                >
                    { isSubbed() ? (!isHovering ? "Subscribed" : "Unsubscribe") : "Subscribe" }
                </Button>
            }
        </>
    );
}

export default SubscriptionButton;