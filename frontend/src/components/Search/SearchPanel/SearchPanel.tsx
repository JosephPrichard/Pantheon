/*
 * Copyright (c) Joseph Prichard 2022.
 */

import styles from "./SearchPanel.module.css";
import { Card, Title } from "@mantine/core";

const SearchPanel = () => (
    <Card className={styles.SearchPanel}>
        <div>
            <Title order={3}>
                Search
            </Title>
            <div className={styles.Content}>
                Showing results from a search of the entire website.
            </div>
        </div>
    </Card>
);

export default SearchPanel;