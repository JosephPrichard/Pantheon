/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import styles from "./BottomBanner.module.css";

const BottomBanner = () => (
    <div className={styles.BottomBanner}>
        <a
            className={styles.Link}
            href="https://github.com/JosephPrichard/Pantheon"
        >
            Source code
        </a>
    </div>
);

export default BottomBanner;