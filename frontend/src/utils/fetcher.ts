/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios, { AxiosResponse } from "axios";
import { config } from "../client/config";

// export const fetcher = (url: string) => {
//     return new Promise<AxiosResponse>((resolve) => {
//         setTimeout(() => {
//             resolve(axios.get(url, config).then(r => r.data));
//         }, 1000);
//     });
// }

export const fetcher = (url: string) => axios.get(url, config).then(r => r.data);