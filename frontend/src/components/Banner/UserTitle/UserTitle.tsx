import { Title } from "@mantine/core";
import Link from "next/link";
import styles from "./UserTitle.module.css";

interface Props {
    username?: string;
}

const UserTitle = ({ username }: Props) => (
    <>
        {!username ||
            <Title
                className={styles.Title}
                order={4}
            >
                <Link href={`/user/${username}`}>
                    <a className={styles.a}>
                        {!username ||
                            <>
                                { username }
                            </>
                        } 
                    </a>
                </Link>
            </Title>
        }
    </>
    
);

export default UserTitle;