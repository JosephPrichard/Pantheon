import React, { useCallback } from "react";
import AppLogo from "./AppLogo/AppLogo";
import ProfilePopover from "./ProfilePopover/ProfilePopover";
import styles from "./Banner.module.css";
import axios from "axios";
import { config } from "../../client/config";
import Link from "next/link";
import BannerTitle from "./BannerTitle/BannerTitle";
import { useUserName } from "../../hooks/useUserCreds";
import SearchBar from "../Search/SearchBar/SearchBar";
import { useRouter } from "next/router";

function signOut() {
    return axios.post("/api/users/signOut", {}, config);
}

interface Props {
    title?: string;
    href?: string;
}

const Banner = ({ title, href }: Props) => {

    const name = useUserName();

    const onSignOut = useCallback(() => {
        signOut().then(() => (document.location.href = "/"));
    }, []);

    return (
        <div className={styles.Banner}>
            <AppLogo />

            <BannerTitle
                text={title}
                href={href}
            />

            <div className={styles.SearchBar}>
                <SearchBar/>
            </div>

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
