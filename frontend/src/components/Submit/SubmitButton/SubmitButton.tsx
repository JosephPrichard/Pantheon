import { Button } from "@mantine/core";
import { useUserName } from "../../../hooks/useUserCreds";
import styles from "./SubmitButton.module.css";
import Link from "next/link";

interface Props {
    forumId?: string
}

const SubmitButton = ({ forumId }: Props) => {

    const name = useUserName();

    return (
        <div>
            {!name ||
                <Link href={ forumId ? `/forum/${forumId}/submit` : "/submit"}>
                    <Button className={styles.Create}>
                        Submit Post
                    </Button>
                </Link>   
            }
        </div>
    );
}

export default SubmitButton;