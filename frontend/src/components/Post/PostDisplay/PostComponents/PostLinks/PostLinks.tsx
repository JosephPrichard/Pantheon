import { useClipboard } from "@mantine/hooks";
import { MessageSquare, Link2, Heart } from "react-feather";
import { PostEntity } from "../../../../../client/models/post";
import { postUrl } from "../../../../../utils/url";
import AppLink from "../../../../Util/Widget/AppLink/AppLink";

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
                    clipboard.copy(window.location.protocol + "//" + window.location.host + postUrl(post));
                }}
                spacing="5%"
            />
            <AppLink
                icon={<Heart size={14}/>} 
                text="Favorite" 
                href="/"
                onClick={e => e.stopPropagation()}
                spacing="5%"
            />
        </div>
    );
}

export default PostLinks;