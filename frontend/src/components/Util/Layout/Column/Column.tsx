/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { FunctionComponent, ReactNode } from "react";
import styles from "./Column.module.css";

interface Props {
    children: ReactNode;
    width: number | string;
    minWidth?: number | string;
    marginLeft?: number | string;
    marginRight?: number | string;
    space?: boolean;
}

const Column: FunctionComponent<Props> = ({ children, width, minWidth, marginLeft, marginRight, space }: Props) => {
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

Column.defaultProps = {
    space: true
}

export default Column;