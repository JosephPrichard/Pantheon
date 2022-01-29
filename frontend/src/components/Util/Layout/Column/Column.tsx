import { ReactNode } from "react";
import styles from "./Column.module.css";

interface Props {
    children: ReactNode;
    width: number | string;
    minWidth?: number | string;
    marginLeft?: number | string;
    marginRight?: number | string;
}

const Column = ({ children, width, minWidth, marginLeft, marginRight }: Props) => {
    return (
        <div 
            className={styles.Column}
            style={{
                minWidth,
                width,
                marginLeft,
                marginRight
            }}
        >
            { children }
        </div>
    );
}

export default Column;