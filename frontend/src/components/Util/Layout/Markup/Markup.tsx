import { ReactElement } from "react";
import styles from "./Markup.module.css";

interface Props {
    children: ReactElement | ReactElement[];
}

const Markup = ({ children }: Props) => {
    return (
        <div className={styles.Markup}>
            { children }
        </div>
    );
}

export default Markup;