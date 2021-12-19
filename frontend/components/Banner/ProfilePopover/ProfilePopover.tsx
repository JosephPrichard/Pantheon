import { Button, Divider, Popover } from "@mantine/core";
import React, { useState } from "react";
import { HelpCircle, LogOut, Settings, User } from "react-feather";
import AppAvatar from "../../Util/Widget/AppAvatar/AppAvatar";
import AppLink from "../AppLink/BannerLink";
import LinkTitle from "../LinkTitle/LinkTitle";
import styles from "./ProfilePopover.module.css";

interface Props {
    name: string;
    onSignOut: () => void;
}

const ProfilePopover = ({ name, onSignOut }: Props) => {
    const [opened, setOpened] = useState(false);

    return (
        <Popover
            className={styles.ProfilePopover}
            opened={opened}
            target={
                <Button className={styles.Button} onClick={() => setOpened(!opened)}>
                    <AppAvatar width={28} height={28} />
                    <span className={styles.Name}> {name} </span>
                </Button>
            }
            onClose={() => setOpened(false)}
            position="bottom"
            spacing={0}
            withArrow
            noFocusTrap
            noEscape
        >
            <LinkTitle text="My Stuff" />
            <AppLink icon={<User size={30} className={styles.Element} />} text="Profile" href={"/user/" + name} />
            <AppLink icon={<Settings size={30} className={styles.Element} />} text="Settings" href="/" />
            <LinkTitle text="Other" />
            <AppLink icon={<HelpCircle size={30} className={styles.Element} />} text="Help" href="/" />
            <Divider style={{ marginLeft: 12, marginRight: 12, marginBottom: 0 }} />
            <AppLink icon={<LogOut size={30} className={styles.Element} />} text="Sign Out" onClick={onSignOut} />
        </Popover>
    );
};

export default ProfilePopover;
