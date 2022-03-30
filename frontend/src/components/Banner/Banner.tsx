/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React, { useCallback } from "react";
import AppLogo from "./AppLogo/AppLogo";
import ProfilePopover from "./ProfilePopover/ProfilePopover";
import styles from "./Banner.module.css";
import Link from "next/link";
import BannerTitle from "./BannerTitle/BannerTitle";
import { useUserName } from "../../hooks/useUserCreds";
import SearchBar from "../Search/SearchBar/SearchBar";

interface Props {
    title?: string;
    href?: string;
}

const Banner = ({ title, href }: Props) => {

    const name = useUserName();

    return (
        <div className={styles.Banner}>
            <AppLogo />

            <BannerTitle
                text={title}
                href={href}
            />

            <div className={styles.SearchBar}>
                <SearchBar href={href}/>
            </div>

            <div className={styles.LoginWrapper}>
                {name === undefined ?
                    <Link href="/login">
                        <div className={styles.LoginLinkDiv}>
                            Login
                        </div>
                    </Link>
                    :
                    <ProfilePopover name={name} />
                }
            </div>  
        </div>
    );
};

export default Banner;
