import { Card, Space } from "@mantine/core";
import styles from "./SearchForum.module.css"
import { ForumEntity } from "../../../client/models/forum";
import React, { useState } from "react";
import { ChevronDown, Search } from "react-feather";

interface Props {
    initialForum?: ForumEntity;
}

const SearchForum = ({ initialForum }: Props) => {

    const [forum, setForum] = useState(initialForum);

    return (
        <Card className={styles.SearchForum}>
            <Search className={styles.GlassIcon}/>
            <Space w={10}/>
            <span>
                { initialForum ? initialForum.id : "Choose a forum" }
            </span>
            <Space w={10}/>
            <ChevronDown className={styles.ArrowIcon}/>
        </Card>
    );
}

export default SearchForum;