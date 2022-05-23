/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { useClipboard } from "@mantine/hooks";
import { MessageSquare, Link2, Heart, Edit } from "react-feather";
import { PostEntity, PostSearchEntity } from "../../../../../client/models/post";
import { getBaseUrl, postUrl } from "../../../../../utils/url";
import AppLink from "../../../../Util/Widget/AppLink/AppLink";

interface Props {
    post: PostEntity | PostSearchEntity;
    fade?: boolean;
    onClickEdit?: () => void;
}

const PostLinks = ({ post, fade, onClickEdit }: Props) => {

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
                spacing="5%"
            />
            <AppLink
                icon={<Link2 size={14}/>} 
                text={clipboard.copied ? 'Copied' : 'Share'}
                onClick={e => {
                    e.stopPropagation();
                    clipboard.copy(getBaseUrl() + postUrl(post));
                }}
                spacing="5%"
            />
            <AppLink
                icon={<Heart size={14}/>} 
                text="Favorite"
                onClick={e => e.stopPropagation()}
                spacing="5%"
            />
            {!onClickEdit ||
                <AppLink
                    icon={<Edit size={14}/>}
                    text="Edit"
                    onClick={onClickEdit}
                    spacing="5%"
                />
            }
        </div>
    );
}

export default PostLinks;