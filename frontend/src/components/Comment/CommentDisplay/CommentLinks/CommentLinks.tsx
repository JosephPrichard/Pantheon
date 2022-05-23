/*
 * Copyright (c) Joseph Prichard 2022.
 */

import styles from "./CommentLinks.module.css";
import AppLink from "../../../Util/Widget/AppLink/AppLink";
import { Edit, Link2, MessageSquare } from "react-feather";
import React from "react";
import { useClipboard } from "@mantine/hooks";
import { getUrlNoHash, postUrl } from "../../../../utils/url";
import { PostEntity, PostSearchEntity } from "../../../../client/models/post";
import { CommentEntity } from "../../../../client/models/comment";

interface Props {
    linkId: string;
    toggleReply: boolean;
    setShowReply: (show: boolean) => void;
    onClickEdit?: () => void;
}

const CommentLinks = ({ linkId, toggleReply, setShowReply, onClickEdit }: Props) => {
    const clipboard = useClipboard({ timeout: 500 });

    return (
        <div className={styles.CommentTreeLinks}>
            <AppLink
                icon={<MessageSquare size={14}/>}
                text={toggleReply ? "Cancel" : "Reply"}
                onClick={() => setShowReply(!toggleReply)}
                spacing="2.5%"
            />
            <AppLink
                icon={<Link2 size={14}/>}
                text={clipboard.copied ? 'Copied' : 'Share'}
                onClick={e => {
                    e.stopPropagation();
                    clipboard.copy(getUrlNoHash() + "#" + linkId);
                }}
                spacing="2.5%"
            />
            {!onClickEdit ||
                <AppLink
                    icon={<Edit size={14}/>}
                    text="Edit"
                    onClick={onClickEdit}
                    spacing="2.5%"
                />
            }
        </div>
    );
}

export default CommentLinks;