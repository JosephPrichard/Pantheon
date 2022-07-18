/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { UserEntity } from "../../../client/models/user";
import styles from "../UserProfile/UserProfile.module.css";
import { Card, Space, Title } from "@mantine/core";
import { useUserName } from "../../../client/hooks/creds";
import React, { useEffect, useState } from "react";
import ChangePassword from "../ChangePassword/ChangePassword";
import { fetchUserByName } from "../../../client/api/user";
import DeleteAccount from "../DeleteAccount/DeleteAccount";
import UpdateBiography from "../UpdateBiography/UpdateBiography";

const UserProfile = () => {

    const name = useUserName(true);
    const [user, setUser] = useState<UserEntity>();

    useEffect(() => {
        if (name) {
            fetchUserByName(name).then((r) => setUser(r.data.user));
        }
    }, [name]);

    return (
        <Card className={styles.UserProfile}>
            {!user ||
                <div className={styles.ProfileContainer}>
                    <Space h={25}/>
                    <Title order={3}>
                        User Settings
                    </Title>
                    <Space h={25}/>
                    <UpdateBiography biography={user.description}/>
                    <Space h={40}/>
                    <ChangePassword/>
                    <Space h={40}/>
                    <DeleteAccount/>
                    <Space h={60}/>
                </div>
            }
        </Card>
    );
}

export default UserProfile;