/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { PostEntity, PostSearchEntity } from "../../../client/models/post";
import styles from "./VotePanel.module.css";
import { Button } from "@mantine/core";
import { Vote } from "../../../client/api/vote";

const UP_VOTE_COLOR = "rgb(229, 113, 50)";
const DOWN_VOTE_COLOR = "rgb(60, 133, 208)";

interface Props {
    initialVotes: number;
    userVoteValue?: number;
    onVote: (value: number, onFailure: () => void) => void;
}

const VotePanel = ({ initialVotes, userVoteValue, onVote }: Props) => {

    const [votes, setVotes] = useState(initialVotes);
    const [vote, setVote] = useState(userVoteValue ? userVoteValue : 0);

    // update the vote when the userVote value changes
    useEffect(
        () => {
            if (userVoteValue !== undefined) {
                setVote(userVoteValue);
            }
        },
        [userVoteValue]
    );

    const handleVote = useCallback(
        (value: number) => {
            const oldVote = vote;
            const oldVotes = votes;
            const newVote = oldVote != value ? value : 0;
            const voteDiff = newVote - oldVote;
            setVote(newVote);
            setVotes(votes + voteDiff)
            onVote(
                newVote,
                () => {
                    setVote(oldVote);
                    setVotes(oldVotes);
                }
            );
        },
        [vote, votes, onVote]
    );

    return (
        <div>
            <a>
                <ChevronUp
                    size={22}
                    className={styles.VoteSymbol}
                    style={{
                        color: vote == 1 ? UP_VOTE_COLOR : undefined
                    }}
                    onClick={e => {
                        e.preventDefault();
                        handleVote(1);
                    }}
                />
            </a>
            <div
                className={styles.VoteText}
                style={{
                    color: vote == 1 ? UP_VOTE_COLOR : (vote == -1 ? DOWN_VOTE_COLOR : undefined)
                }}
            >
                { votes }
            </div>
            <a>
                <ChevronDown
                    size={22}
                    className={styles.VoteSymbol}
                    style={{
                        color: vote == -1 ? DOWN_VOTE_COLOR : undefined
                    }}
                    onClick={e => {
                        e.preventDefault();
                        handleVote(-1);
                    }}
                />
            </a>
        </div>
    );
}

export default VotePanel;