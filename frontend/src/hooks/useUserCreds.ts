/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "../client/config";
import { clearUser, getUser, setUser } from "../user";
import { Id } from "../client/types";

export interface User {
    id: number;
    name: string;
}

export const useUserCreds = (noRefresh?: boolean) => {
    const [creds, setCreds] = useState<User>();

    useEffect(() => {
        const user = getUser();
        setCreds(user);

        if (!noRefresh) {
            axios.get<{ user?: User }>("/api/users/whoami", config)
                .then(r => {
                    const newUser = r.data.user;
                    setCreds(newUser);
                    if (newUser) {
                        setUser(newUser);
                    } else {
                        clearUser();
                    }

                });
        }
    }, [noRefresh]);

    return creds;
}

export const useUserName = (noRefresh?: boolean) => {
    const [name, setName] = useState<string>();

    const creds = useUserCreds(noRefresh);

    useEffect(() => {
        setName(creds?.name);
    }, [creds?.name]);

    return name;
}

export const useUserId = (noRefresh?: boolean) => {
    const [id, setId] = useState<Id>();

    const creds = useUserCreds(noRefresh);

    useEffect(() => {
        setId(creds?.id);
    }, [creds?.id]);

    return id;
}