import styles from "./ErrorMessage.module.css";
import { FunctionComponent } from "react";

interface Props {
    message: string;
    textAlign?: "left" | "right";
    sidePaddings?: number;
}

const ErrorMessage: FunctionComponent<Props> = ({ message, textAlign, sidePaddings }: Props) => {
    return (
        <div
            className={styles.ErrorMessage}
            style={{
                textAlign,
                paddingLeft: sidePaddings,
                paddingRight: sidePaddings
            }}
        >
            { message }
        </div>
    );
}

ErrorMessage.defaultProps = {
    textAlign: "left"
}

export default ErrorMessage;