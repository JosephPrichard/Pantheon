/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Button } from "@mantine/core";
import { useUserName } from "../../../hooks/useUserCreds";
import styles from "./SubmitButton.module.css";
import Link from "next/link";
import { WHITE } from "../../colors";

interface Props {
    forumId?: string
}

const SubmitButton = ({ forumId }: Props) => {

    const name = useUserName(false);

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

export default SubmitButton;