/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Text, Space } from "@mantine/core";
import Link from "next/link";
import { PostEntity, PostSearchEntity } from "../../../../client/models/post";
import styles from "./PostHeader.module.css";
import { getDateDisplay } from "../../../../utils/date";

interface Props {
    post: PostEntity | PostSearchEntity;
    fade?: boolean;
}

const PostHeader = ({ post, fade }: Props) => (
    <>
        <Space h={5}/>
        <Text 
            className={styles.Subtitle}
            style={{
                color: fade ? "rgb(129,131,132)" : undefined
            }}
        >
            <Link href={`/forum/${post.forum.id}`}> 
                <span className={styles.NameLink}>
                    { post.forum.id }
                </span>
            </Link> 
            {" • "} 
            {post.poster ? 
                <>
                    Posted by 
                    {" "}
                    <Link href={`/user/${post.poster.name}`}> 
                        <span className={styles.NameLink}>
                            {post.poster?.name} 
                        </span>
                    </Link> 
                    {" "}
                    {" • "} 
                    {getDateDisplay(new Date(post.createdAt))}
                </>
                :
                <> [deleted] </>
            }
        </Text>
    </>
);

export default PostHeader;