import { ReactNode } from "react";
import styles from "./Column.module.css";

interface Props {
    children: ReactNode;
    width: number | string;
    minWidth?: number | string;
    marginLeft?: number | string;
    marginRight?: number | string;
    space?: boolean;
}

const Column = ({ children, width, minWidth, marginLeft, marginRight, space }: Props) => {
    if (space === undefined) {
        space = true;
    }

    return (
        <div 
            className={styles.Column}
            style={{
                minWidth,
                width,
                marginLeft,
                marginRight,
                paddingLeft: space ? 4 : undefined,
                paddingRight: space ? 4 : undefined
            }}
        >
            { children }
        </div>
    );
}

export default Column;