import { useClipboard } from "@mantine/hooks";
import { MessageSquare, Link2, Heart } from "react-feather";
import { PostEntity } from "../../../../client/models/post";
import { postUrl, urlify } from "../../../../utils/url";
import PostLink from "../PostLink/PostLink";

interface Props {
    post: PostEntity;
    fade?: boolean;
}

const PostLinks = ({ post, fade }: Props) => {

    const clipboard = useClipboard({ timeout: 500 });

    return (
        <div
            style={{
                color: fade ? "rgb(129,131,132)" : undefined
            }}
        >
            <PostLink 
                icon={<MessageSquare size={14}/>} 
                text={post.comments + " Comments"} 
                href={postUrl(post)}
            />
            <PostLink 
                icon={<Link2 size={14}/>} 
                text={clipboard.copied ? 'Copied' : 'Share'}
                onClick={e => {
                    e.stopPropagation();
                    clipboard.copy(window.location.protocol + "//" + window.location.host + postUrl(post));
                }}
            />
            <PostLink 
                icon={<Heart size={14}/>} 
                text="Favorite" 
                href="/"
                onClick={e => e.stopPropagation()}
            />
        </div>
    );
}

export default PostLinks;