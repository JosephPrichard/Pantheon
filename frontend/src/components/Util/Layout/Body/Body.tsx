import { ReactNode } from "react";
import styles from "./Body.module.css";

interface Props {
    children: ReactNode;
    width: number | string;
    minWidth?: number | string;
    marginBottom?: number;
}

const Body = ({ children, width, minWidth, marginBottom }: Props) => {
    return (
        <div 
            className={styles.Body}
            style={{
                minWidth,
                width,
                marginBottom
            }}
        >
            { children }
        </div>
    );
}

export default Body;