import React from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import styles from "./VotePanel.module.css";

interface Props {
    postId: string;
}

const VotePanel = ({ postId }: Props) => (
    <div className={styles.Vote}>
        <ChevronUp 
            size={22} 
            className={styles.VoteSymbol} 
            onClick={e => e.preventDefault()}
        />
        <ChevronDown 
            size={22} 
            className={styles.VoteSymbol} 
            onClick={e => e.preventDefault()}
        />
    </div>
);

export default VotePanel;