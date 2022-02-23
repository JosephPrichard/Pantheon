import DoubleColumn from "../../../Util/Layout/DoubleColumn/DoubleColumn";
import { Card } from "@mantine/core";
import styles from "../../PostFeed/PostFeed.module.css";
import PostPreviewList from "../../../Post/PostPreviewList/PostPreviewList";
import Pagination from "../../../Util/Widget/Pagination/Pagination";
import { buildPageURL } from "../../Feed.client";
import React from "react";

interface Props {
    text: string;
    page: number;
}

const SearchPostFeed = ({ text, page }: Props) => {
    return (
        <>
            <DoubleColumn
                column1={
                    <Card className={styles.PostFeed}>
                        { topBar }

                    </Card>
                }
                column2={
                    <>

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
}

export default SearchPostFeed;
