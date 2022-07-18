/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Id } from "../types";
import { useUserId, useUserName } from "./creds";
import { useEffect, useState } from "react";

export const usePermissions = (id: number, checkUser?: Id) => {
    const [hasPerms, setHasPerms] = useState(false);

    const user = useUserId();

    useEffect(
        () => {
            if (checkUser && user === checkUser) {
                setHasPerms(true);
            }
        },
        [user]
    );

    return hasPerms;
}

