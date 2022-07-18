/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { fetcher } from "../../utils/fetcher";
import useSWR from "swr";

const options = {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
}

export const useFetch = <Res>(url: string) => {
    return useSWR<Res>(url, fetcher, options);
}