/*
 * Copyright (c) Joseph Prichard 2022.
 */

import styles from "./SearchTopBar.module.css"
import React from "react";

interface Props {
    text: string
}

const SearchTopBar = ({ text }: Props) => {
    return (
        <div className={styles.SearchTopBar}>
            Search: {text}
        </div>
    );
}

export default SearchTopBar;

