/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "../client/config";
import { clearUser, getUser, setUser } from "../user";

export interface User {
    id: number;
    name: string;
}

export const useUserName = (refresh?: boolean) => {
    if (!refresh) {
        refresh = true;
    }

    const [name, setName] = useState<string>();

    useEffect(() => {
        const user = getUser();
        setName(user?.name);

        if (refresh) {
            axios.get<{ user?: User }>("/api/users/whoami", config)
                .then(r => {
                    const newUser = r.data.user;
                    setName(newUser?.name);
                    if (newUser) {
                        setUser(newUser);
                    } else {
                        clearUser();
                    }

                });
        }
    }, [refresh]);

    return name;
}