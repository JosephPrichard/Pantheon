/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { useClipboard } from "@mantine/hooks";
import { MessageSquare, Link2, Heart, Edit, Delete } from "react-feather";
import { PostEntity, PostSearchEntity } from "../../../../client/models/post";
import { getBaseUrl, postUrl } from "../../../../utils/url";
import AppLink from "../../../Util/Widget/AppLink/AppLink";

interface Props {
    post: PostEntity | PostSearchEntity;
    fade?: boolean;
    onClickEdit?: () => void;
    onClickDelete?: () => void;
}

const PostLinks = ({ post, fade, onClickEdit, onClickDelete }: Props) => {

    const clipboard = useClipboard({ timeout: 500 });

    return (
        <div
            style={{
                color: fade ? "rgb(129,131,132)" : undefined
            }}
        >
            <AppLink
                icon={<MessageSquare size={14}/>} 
                text={post.comments + " Comments"} 
                href={postUrl(post)}
                spacing="4%"
            />
            <AppLink
                icon={<Link2 size={14}/>} 
                text={clipboard.copied ? 'Copied' : 'Share'}
                onClick={e => {
                    e.stopPropagation();
                    clipboard.copy(getBaseUrl() + postUrl(post));
                }}
                spacing="4%"
            />
            {!onClickEdit ||
                <AppLink
                    icon={<Edit size={14}/>}
                    text="Edit"
                    onClick={onClickEdit}
                    spacing="4%"
                />
            }
            {!onClickDelete ||
                <AppLink
                    icon={<Delete size={14}/>}
                    text="Delete"
                    onClick={onClickDelete}
                    spacing="4%"
                />
            }
        </div>
    );
}

export default PostLinks;