import React, { useState } from "react";
import { PostEntity } from "../../../../../client/models/post";
import { removeAllHTMLFromString } from "../../../../../utils/sanitize";
import ImageContent from "../../Content/ImageContent/ImageContent";
import LinkContent, { clipUrl } from "../../Content/LinkContent/LinkContent";
import TextContent from "../../Content/TextContent/TextContent";
import PostHeader from "../../PostHeader/PostHeader";
import PostLinks from "../../PostLinks/PostLinks";
import styles from "./PostContent.module.css";

interface Props {
    post: PostEntity;
}

const PostContent = ({ post }: Props) => {

    const [collapsed, setCollapsed] = useState(true);

    let content: JSX.Element = <></>;
    if(post.images.length > 0) {
        content = <ImageContent images={post.images}/>
    } else if(post.content) {
        content = <TextContent text={post.content}/>
    } else if(post.link) {
        content = <LinkContent url={post.link}/>
    }

    let preview: string = "";
    let collapse = "text"
    if(post.images.length > 0) {
        preview = "Image";
        collapse = "image";
    } else if(post.content) {
        preview = removeAllHTMLFromString(post.content);
    } else if(post.link) {
        preview = clipUrl(post.link);
    }

    return (
        <div className={styles.Content}>
            <PostHeader post={post}/>
            {!post.link ?
                <>
                    {collapsed ?
                        <div
                            className={styles.CollapseText}
                            onClick={() => setCollapsed(false)}
                        >
                            ⯈ { preview }
                        </div>
                        :
                        <div
                            className={styles.CollapseText}
                            onClick={() => setCollapsed(true)}
                        >
                            ⯆ Re-collapse { collapse }
                        </div>
                    }
                    {collapsed ||
                        <>
                            { content }
                        </>
                    }
                </>
                :
                <>
                    { content }
                </>
            }
            <PostLinks post={post}/>
        </div>
    );
};

export default PostContent;
