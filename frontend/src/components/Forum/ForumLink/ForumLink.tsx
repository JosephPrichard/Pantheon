/*
 * Copyright (c) Joseph Prichard 2022.
 */

import Link from "next/link";
import { ForumEntity } from "../../../client/models/forum";
import styles from "./ForumLink.module.css";

interface Props {
    forum: ForumEntity;
}

const ForumLink = ({ forum }: Props) => (
    <div className={styles.Link}>
        <Link href={`/forum/${forum.id}`}>
            <span>
                {forum.id}
            </span>
        </Link>
    </div>
);

export default ForumLink;