/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Button } from "@mantine/core";
import { createSubscription, deleteSubscription, IsSubbedRes } from "../../../client/api/subscription";
import styles from "./SubscriptionButton.module.css";
import { useState } from "react";
import { useUserName } from "../../../hooks/useUserCreds";
import { useFetch } from "../../../hooks/useFetch";

interface Props {
    forumId: string;
}

const SubscriptionButton = ({ forumId }: Props) => {
    const name = useUserName(true);

    const { data } = useFetch<IsSubbedRes>(`/api/subscriptions/isSubbed?forum=${forumId}`);

    const [justSubbed, setJustSubbed] = useState<boolean | undefined>();

    const [isHovering, setHovering] = useState(false);

    function isSubbed() {
        return justSubbed !== undefined ? justSubbed : data?.isSubbed;
    }

    return (
        <>
            {(!data || !name) ||
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