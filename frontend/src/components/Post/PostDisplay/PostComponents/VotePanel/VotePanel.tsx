import React from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { PostEntity } from "../../../../../client/models/post";
import styles from "./VotePanel.module.css";

interface Props {
    post: PostEntity;
}

const VotePanel = ({ post }: Props) => (
    <div className={styles.Vote}>
        <ChevronUp
            size={22}
            className={styles.VoteSymbol}
            onClick={e => e.preventDefault()}
        />
        <div className={styles.VoteText}>
            { post.votes }
        </div>
        <ChevronDown
            size={22}
            className={styles.VoteSymbol}
            onClick={e => e.preventDefault()}
        />
    </div>
);

export default VotePanel;