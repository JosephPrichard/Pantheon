import { Text, Title } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { Heart, Link2, MessageSquare } from "react-feather";
import { Post } from "../../../../model/entities/post.entity";
import AppLink from "../PostLink/PostLink";
import ImageContent from "./ImageContent/ImageContent";
import LinkContent from "./LinkContent/LinkContent";
import styles from "./PostContent.module.css";
import TextContent from "./TextContent/TextContent";

function getDisplay(date: Date) {
    const dayJsDate = dayjs(date);
    const hours = dayjs().diff(dayJsDate, "hours");
    if(hours < 1) {
        return " now";
    } else if (hours < 24) {
        return hours + (hours > 1 ? " hours ago" : " hour ago");
    } else if(hours < 730) {
        const days = Math.floor(hours / 24);
        return days + (days > 1 ? " days ago" : " day ago");
    } else if (hours < 8760) {
        const months = Math.floor(hours / 730);
        return months + (months > 1 ? " months ago" : " month ago");
    } else {
        const years = Math.floor(hours / 8760);
        return years + (years > 1 ? " years ago" : " year ago");
    }
}

interface Props {
    post: Post;
    textClassName?: string;
}

const PostContent = ({ post, textClassName }: Props) => {

    const clipboard = useClipboard({ timeout: 500 });

    let content: JSX.Element = <></>;
    if(post.images.length > 0) {
        content = <ImageContent images={post.images}/>
    } else if(post.content) {
        content = <TextContent text={post.content} className={textClassName}/>
    } else if(post.link) {
        content = <LinkContent url={post.link}/>
    }

    return (
        <div className={styles.Content}>
            <Text className={styles.Subtitle}>
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
                        {getDisplay(post.createdAt)}
                    </>
                    :
                    <> [deleted] </>
                }
            </Text>
            <Title order={3} className={styles.Title}>
                {post.title}
            </Title>
            <div className={styles.InnerContentContainer}>
                { content }
            </div>
            <div className={styles.LinkWrapper}>
                <AppLink 
                    icon={<MessageSquare size={14}/>} 
                    text={post.comments + " Comments"} 
                    href={`/post/${post.id}`}
                />
                <AppLink 
                    icon={<Link2 size={14}/>} 
                    text={clipboard.copied ? 'Copied' : 'Share'}
                    onClick={e => {
                        e.stopPropagation();
                        clipboard.copy(window.location.protocol + "//" + window.location.host + "/post/" + post.id);
                    }}
                />
                <AppLink 
                    icon={<Heart size={14}/>} 
                    text="Favorite" 
                    href="/"
                    onClick={e => e.stopPropagation()}
                />
            </div>
        </div>
    );
};

export default PostContent;
