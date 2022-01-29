import { Card } from "@mantine/core";
import React from "react";
import { PostEntity } from "../../../client/models/post";
import { SortType, TimeType } from "../../../global";
import Posts from "../../Post/Posts/Posts";
import DoubleColumn from "../../Util/Layout/DoubleColumn/DoubleColumn";
import Pagination from "../../Util/Widget/Pagination/Pagination";
import { buildPageURL } from "../Feed.client";
import styles from "./PostFeed.module.css";

interface Props {
    sort: SortType;
    time: TimeType;
    page: number;
    posts?: PostEntity[];
    pageCount?: number;
    topBar: React.ReactNode;
    children: React.ReactNode;
}

const PostFeed = ({ sort, time, page, posts, pageCount, children, topBar }: Props) => (
    <>
        <DoubleColumn
            column1={
                <Card className={styles.PostFeed}>
                    { topBar }
                    <Posts posts={posts}/>
                </Card>
            }
            column2={
                <>
                    { children }
                </> 
            }
        />
        {!pageCount || 
            <Pagination 
                page={page} 
                total={pageCount}
                siblings={5}
                boundaries={2}
                url={buildPageURL(sort, time)}
            />
        }
    </>
);

export default PostFeed;