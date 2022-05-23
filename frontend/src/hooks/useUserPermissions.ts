/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Id } from "../client/types";
import { useUserId, useUserName } from "./useUserCreds";
import { useEffect, useState } from "react";

// returns 0 if no perms, 1 if delete only, 2 if edit and delete
export const useUserPermissions = (checkUser?: Id) => {
    const [perms, setPerms] = useState(0);

    const user = useUserId();

    useEffect(
        () => {
            if (user == checkUser) {
                setPerms(2);
            }
        },
        [user]
    );

    return perms;
}

