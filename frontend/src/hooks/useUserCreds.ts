import axios from "axios";
import { useState, useEffect } from "react";
import { config } from "../client/config";
import { clearUser, getUser, setUser } from "../user";

export interface User {
    id: number;
    name: string;
}

export const useUserName = () => {
    const [name, setName] = useState<string>();

    useEffect(() => {
        const user = getUser();
        setName(user?.name);

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
    }, []);

    return name;
}