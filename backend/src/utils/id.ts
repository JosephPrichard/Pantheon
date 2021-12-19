import { v4 } from "uuid";

export function uuid() {
    const id = v4();
    let newId = "";
    for(const c of id) {
        if (c !== "-") {
            newId += c;
        }
    }
    return newId;
}