/*
 * Copyright (c) Joseph Prichard 2022.
 */

import styles from "./Message.module.css";
import { FunctionComponent } from "react";

interface Props {
    message: string;
    textAlign?: "left" | "right";
    sidePaddings?: number;
    isSuccess?: boolean
}

const Message: FunctionComponent<Props> = ({ message, textAlign, sidePaddings, isSuccess }: Props) => {
    return (
        <div
            className={styles.ErrorMessage}
            style={{
                textAlign,
                paddingLeft: sidePaddings,
                paddingRight: sidePaddings,
                color: isSuccess ? "whitesmoke" : "#fa5252"
            }}
        >
            { message }
        </div>
    );
}

Message.defaultProps = {
    textAlign: "left"
}

export default Message;