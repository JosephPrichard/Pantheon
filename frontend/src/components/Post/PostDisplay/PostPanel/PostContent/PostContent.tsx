import React from "react";
import { PostEntity } from "../../../../../client/models/post";
import ImageContent from "../../Content/ImageContent/ImageContent";
import LinkContent from "../../Content/LinkContent/LinkContent";
import TextContent from "../../Content/TextContent/TextContent";
import styles from "./PostContent.module.css";
import PostHeader from "../../PostHeader/PostHeader";
import PostLinks from "../../PostLinks/PostLinks";

interface Props {
    post: PostEntity;
}

const PostContent = ({ post }: Props) => {

    let content: JSX.Element = <></>;
    if(post.images.length > 0) {
        content = <ImageContent images={post.images}/>
    } else if(post.content) {
        content = <TextContent text={post.content}/>
    } else if(post.link) {
        content = <LinkContent url={post.link} font={15} clip={false} space={20}/>
    }

    return (
        <div className={styles.Content}>
            <PostHeader post={post} fade/>
            { content }
            <PostLinks post={post} fade/>
        </div>
    );
};

export default PostContent;
