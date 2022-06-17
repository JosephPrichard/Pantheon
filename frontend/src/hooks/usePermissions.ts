/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Id } from "../client/types";
import { useUserId, useUserName } from "./useUserCreds";
import { useEffect, useState } from "react";

export const usePermissions = (checkUser?: Id) => {
    const [hasPerms, setHasPerms] = useState(false);

    const user = useUserId();

    useEffect(
        () => {
            if (user == checkUser) {
                setHasPerms(true);
            }
        },
        [user]
    );

    return hasPerms;
}

