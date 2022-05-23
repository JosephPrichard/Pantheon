/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Button } from "@mantine/core";
import { useUserName } from "../../../hooks/useUserCreds";
import styles from "./PostSubmitButton.module.css";
import Link from "next/link";
import { WHITE } from "../../colors";

interface Props {
    forumId?: string
}

const PostSubmitButton = ({ forumId }: Props) => {

    const name = useUserName(true);

    return (
        <div>
            {!name ||
                <Link href={ forumId ? `/forum/${forumId}/submit` : "/submit"}>
                    <Button
                        className={styles.SubmitButton}
                        style={{
                            backgroundColor: WHITE
                        }}
                    >
                        Submit Post
                    </Button>
                </Link>   
            }
        </div>
    );
}

export default PostSubmitButton;