import React, { FunctionComponent } from "react";
import styles from "./SortOption.module.css";

interface Props {
    text: string;
    selected: boolean;
    onClick?: () => void;
}

const SortOption: FunctionComponent<Props> = ({ text, selected, onClick }: Props) => (
    <div
        className={styles.SortOption}
        onClick={onClick}
        style={{
            borderColor: selected ? "rgb(65, 127, 212)" : undefined
        }}
    >
        { text }
    </div>
);

SortOption.defaultProps = {
    onClick: () => {}
}

export default SortOption;
