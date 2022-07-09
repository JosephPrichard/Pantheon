/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { fetcher } from "../utils/fetcher";
import useSWRImmutable from "swr/immutable";

export const useFetch = <Res>(url: string) => {
    return useSWRImmutable<Res>(url, fetcher);
}