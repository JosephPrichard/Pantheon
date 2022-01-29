import { Text, Title, Space } from "@mantine/core";
import Link from "next/link";
import { PostEntity } from "../../../../client/models/post";
import { urlify } from "../../../../utils/url";
import { getDisplay } from "../postDisplay";
import styles from "./PostHeader.module.css";

interface Props {
    post: PostEntity;
    fade?: boolean;
}

const PostHeader = ({ post, fade }: Props) => (
    <>
        <Link href={`/forum/${post.forum.id}/post/${post.id}/${urlify(post.title)}`}> 
            <Title order={4} className={styles.Title}>
                {post.title}
            </Title>
        </Link>
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
                    {getDisplay(new Date(post.createdAt))}
                </>
                :
                <> [deleted] </>
            }
        </Text>
    </>
);

export default PostHeader;