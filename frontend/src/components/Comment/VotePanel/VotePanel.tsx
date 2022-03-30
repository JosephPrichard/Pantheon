/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import styles from "./VotePanel.module.css";
import { CommentEntity } from "../../../client/models/comment";

interface Props {
    comment: CommentEntity;
}

const VotePanel = ({ comment }: Props) => (
    <div className={styles.Vote}>
        <ChevronUp
            size={22}
            className={styles.VoteSymbol}
            onClick={e => e.preventDefault()}
        />
        <div className={styles.VoteText}>
            { comment.votes }
        </div>
        <ChevronDown
            size={22}
            className={styles.VoteSymbol}
            onClick={e => e.preventDefault()}
        />
    </div>
);

export default VotePanel;