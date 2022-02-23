import { PostEntity } from "../../../../../client/models/post";
import Link from "next/link";
import { urlify } from "../../../../../utils/url";
import { Title } from "@mantine/core";
import styles from "./PostTitle.module.css";

interface Props {
    post: PostEntity;
}

const PostTitle = ({ post }: Props) => (
    <>
        <Link href={`/forum/${post.forum.id}/post/${post.id}/${urlify(post.title)}`}>
            <Title order={4} className={styles.Title}>
                { post.title }
            </Title>
        </Link>
    </>
);

export default PostTitle;