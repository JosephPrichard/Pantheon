import { Title } from "@mantine/core";
import Link from "next/link";
import styles from "./ForumTitle.module.css";

interface Props {
    forumId?: string;
}

const ForumTitle = ({ forumId }: Props) => (
    <>
        {!forumId ||
            <Title
                className={styles.Title}
                order={4}
            >
                <Link href={`/forum/${forumId}`}>
                    <a className={styles.a}>
                        { forumId }
                    </a>
                </Link>
            </Title>
        }
    </>
);

export default ForumTitle;