import { ReactNode } from "react";
import styles from "./Body.module.css";

interface Props {
    children: ReactNode;
    width: number | string;
    minWidth?: number | string;
    marginBottom?: number;
    space?: boolean;
}

const Body = ({ children, width, minWidth, marginBottom, space }: Props) => {
    if (space === undefined) {
        space = true;
    }

    return (
        <div 
            className={styles.Body}
            style={{
                minWidth,
                width,
                marginBottom,
                paddingLeft: space ? 10 : undefined,
                paddingRight: space ? 10 : undefined
            }}
        >
            { children }
        </div>
    );
}

export default Body;