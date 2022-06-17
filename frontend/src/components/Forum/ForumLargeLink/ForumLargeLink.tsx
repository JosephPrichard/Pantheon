/*
 * Copyright (c) Joseph Prichard 2022.
 */

import Link from "next/link";
import { ForumEntity } from "../../../client/models/forum";
import styles from "./ForumLargeLink.module.css";

interface Props {
    forum: ForumEntity;
}

const ForumLargeLink = ({ forum }: Props) => (
    <div className={styles.Forum}>
        <Link href={`/forum/${forum.id}`}>
            <span className={styles.Link}>
                { forum.id }
            </span>
        </Link>
        {" - "}
        <span>
            { forum.description }
        </span>
    </div>
);

export default ForumLargeLink;