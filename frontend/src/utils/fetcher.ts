/*
 * Copyright (c) Joseph Prichard 2022.
 */

import axios from "axios";
import { config } from "../client/config";

export const fetcher = (url: string) => axios.get(url, config).then(r => r.data);