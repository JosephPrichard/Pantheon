/*
 * Copyright (c) Joseph Prichard 2022.
 */

import styles from "./SearchPanel.module.css";
import { Card, Title } from "@mantine/core";

interface Props {
    text: string;
    resultCount: number;
}

const SearchPanel = ({ text, resultCount }: Props) => (
    <Card className={styles.SearchPanel}>
        <div>
            <Title order={3}>
                Search: { text }
            </Title>
            <div className={styles.Content}>
                Showing results from a search of the entire website.
            </div>
        </div>
    </Card>
);

export default SearchPanel;