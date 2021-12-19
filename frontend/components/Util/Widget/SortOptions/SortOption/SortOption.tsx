import React, { FunctionComponent } from "react";
import { ChevronDown } from "react-feather";
import styles from "./SortOption.module.css";

interface Props {
    text: string;
    selected: boolean;
    onClick?: () => void;
    withArrow?: boolean;
    
}

const SortOption: FunctionComponent<Props> = ({ text, selected, onClick, withArrow }: Props) => (
    <div
        className={styles.SortOption}
        style={{
            backgroundColor: selected ? "rgb(67,67,67)" : undefined
        }}
        onClick={onClick}
    >
        { text }
        {!withArrow || <ChevronDown className={styles.Arrow} size={18}/>}
    </div>
);

SortOption.defaultProps = {
    onClick: () => {},
    withArrow: false
}

export default SortOption;
