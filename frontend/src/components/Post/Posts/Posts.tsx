import React, { FunctionComponent } from "react";
import styles from "./Posts.module.css";
import { PostEntity } from "../../../client/models/post";
import PostPreview from "../PostDisplay/PostPreview/PostPreview";
import PostSkeleton from "../../Util/Loading/PostSkeleton/PostSkeleton";

interface Props {
    posts?: PostEntity[];
}

const Posts: FunctionComponent<Props> = ({ posts }: Props) => (
    <div className={styles.UserPosts}>
        { posts ?
            (posts.length !== 0) ?
                <div className={styles.UserPosts}>
                    {posts.map((post, i) => (
                        <PostPreview key={i} lighter={i % 2 == 0} post={post} />
                    ))}
                </div>
                :
                <div className={styles.BigText}>
                    Sorry, we couldn't find any posts.
                </div>
            :
            <>
                {Array(15).fill(0).map((n, i) => (
                    <PostSkeleton key={i} lighter={i % 2 == 0} />
                ))}
            </>
        }
    </div>
);

export default Posts;