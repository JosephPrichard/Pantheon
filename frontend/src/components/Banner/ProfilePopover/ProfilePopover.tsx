/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Button, Popover, Space } from "@mantine/core";
import React, { useCallback, useState } from "react";
import BannerLink from "../BannerLink/BannerLink";
import styles from "./ProfilePopover.module.css";
import CreateForumModal from "../../Forum/CreateForumModal/CreateForumModal";
import { signOut } from "../../Login/Login.client";

interface Props {
    name: string;
}

const ProfilePopover = ({ name }: Props) => {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);

    const onSignOut = useCallback(() => {
        signOut().then(() => (document.location.href = "/"));
    }, []);

    return (
        <>
            <CreateForumModal
                open={modalOpened}
                onClose={() => setModalOpened(false)}
            />
            <Popover
                className={styles.ProfilePopover}
                opened={popoverOpened}
                target={
                    <Button className={styles.Button} onClick={() => setPopoverOpened(!popoverOpened)}>
                        <span className={styles.Name}> {name} </span>
                    </Button>
                }
                onClose={() => setPopoverOpened(false)}
                position="bottom"
                spacing={0}
                withArrow
                noFocusTrap
                noEscape
            >
                <Space h={5}/>
                <BannerLink text="Profile" href={`/user/${name}`} />
                <BannerLink text="Create Forum" onClick={() => setModalOpened(true)} />
                <BannerLink text="Sign Out" onClick={onSignOut} />
                <Space h={7}/>
            </Popover>
        </>
    );
};

export default ProfilePopover;
