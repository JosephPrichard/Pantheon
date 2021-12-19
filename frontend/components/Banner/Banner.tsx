import React, { useCallback, useEffect, useState } from "react";
import AppLogo from "./AppLogo/AppLogo";
import ProfilePopover from "./ProfilePopover/ProfilePopover";
import SearchBar from "./SearchBar/SearchBar";
import styles from "./Banner.module.css";
import { clearCookie, getCookie } from "../cookie";
import axios from "axios";
import { config } from "../../api/config";
import { Space } from "@mantine/core";

function signOut() {
    return axios.delete("/api/auth", config);
}

const AppBanner = () => {

    const [name, setName] = useState<string>();

    useEffect(() => {
        const cookieData = getCookie();
        setName(cookieData?.name);
    });

    const onSignOut = useCallback(() => {
        clearCookie();
        signOut().then(() => (document.location.href = "/"));
    }, []);

    return (
        <div className={styles.Banner}>
            <AppLogo />

            <SearchBar />

            <div className={styles.LoginWrapper}>
                {name !== undefined || (
                    <div className={styles.LoginLinkDiv}>
                        <a href="/login">Login</a>
                    </div>
                )}

                {name === undefined || <ProfilePopover name={name} onSignOut={onSignOut} />}
            </div>  
        </div>
    );
};

export default AppBanner;
