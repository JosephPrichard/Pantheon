import axios from "axios";

export const fetcher = (url: string) => axios.get(url).then(r => r.data);