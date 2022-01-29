import React, { useCallback } from "react";
import AppLogo from "./AppLogo/AppLogo";
import ProfilePopover from "./ProfilePopover/ProfilePopover";
import styles from "./Banner.module.css";
import axios from "axios";
import { config } from "../../client/config";
import ForumTitle from "./ForumTitle/ForumTitle";
import Link from "next/link";
import UserTitle from "./UserTitle/UserTitle";
import { useUserName } from "../../hooks/useUserCreds";

function signOut() {
    return axios.post("/api/users/signOut", {}, config);
}

interface Props {
    forumId?: string;
    username?: string;
}

const Banner = ({ forumId, username }: Props) => {

    const name = useUserName();

    const onSignOut = useCallback(() => {
        signOut().then(() => (document.location.href = "/"));
    }, []);

    return (
        <div className={styles.Banner}>
            <AppLogo />

            <ForumTitle forumId={forumId}/>
            <UserTitle username={username}/>

            <div className={styles.LoginWrapper}>
                {name === undefined ?
                    <Link href="/login">
                        <div className={styles.LoginLinkDiv}>
                            Login
                        </div>
                    </Link>
                    :
                    <ProfilePopover name={name} onSignOut={onSignOut}/>
                }
            </div>  
        </div>
    );
};

export default Banner;
