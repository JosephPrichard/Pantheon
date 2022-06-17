/*
 * Copyright (c) Joseph Prichard 2022.
 */

import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useFetch = <Res>(url: string) => {
    const { data } = useSWR<Res>(url, fetcher);

    return data;
}