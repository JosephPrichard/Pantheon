import { Button, Popover, Space } from "@mantine/core";
import React, { useState } from "react";
import { LogOut, User } from "react-feather";
import BannerLink from "../BannerLink/BannerLink";
import styles from "./ProfilePopover.module.css";
import CreateForumModal from "../../Forum/CreateForumModal/CreateForumModal";

interface Props {
    name: string;
    onSignOut: () => void;
}

const ProfilePopover = ({ name, onSignOut }: Props) => {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);

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
