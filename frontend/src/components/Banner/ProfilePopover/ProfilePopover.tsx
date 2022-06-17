/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Button, Popover, Space } from "@mantine/core";
import React, { useCallback, useState } from "react";
import BannerLink from "../BannerLink/BannerLink";
import styles from "./ProfilePopover.module.css";
import { signOut } from "../../../client/api/login";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import { UnreadCountRes } from "../../../client/api/notifications";

interface Props {
    name: string;
}

const ProfilePopover = ({ name }: Props) => {

    const { data } = useSWR<UnreadCountRes>("/api/notifications/unread", fetcher);

    const [popoverOpened, setPopoverOpened] = useState(false);

    const onSignOut = useCallback(() => {
        signOut().then(() => (document.location.href = "/"));
    }, []);

    const count = data?.count ? `(${data.count})` : "";

    return (
        <>
            <Popover
                className={styles.ProfilePopover}
                classNames={{
                    popover: styles.PopoverOverlay
                }}
                opened={popoverOpened}
                target={
                    <Button className={styles.Button} onClick={() => setPopoverOpened(!popoverOpened)}>
                        <span className={styles.Name}> {name} {count} </span>
                    </Button>
                }
                onClose={() => setPopoverOpened(false)}
                position="bottom"
                spacing={0}
                noFocusTrap
                noEscape
            >
                <Space h={10}/>
                <BannerLink text="Profile" href={`/user/${name}`} />
                <BannerLink text={`Inbox ${count}`} href={`/notifications`} />
                <BannerLink text="Sign Out" onClick={onSignOut} />
                <Space h={12}/>
            </Popover>
        </>
    );
};

export default ProfilePopover;
