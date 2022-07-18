/*
 * Copyright (c) Joseph Prichard 2022.
 */

import styles from "./LoadingButton.module.css";
import { Button } from "@mantine/core";
import React from "react";

interface Props {
    loadMore: () => void;
}

const LoadingButton = ({ loadMore }: Props) => {
    return (
        <div className={styles.ButtonWrapper}>
            <div className={styles.ButtonWrapperInner}>
                <Button
                    className={styles.Button}
                    onClick={loadMore}
                    classNames={{
                        root: styles.NoFocus
                    }}
                >
                    Load More
                </Button>
            </div>
        </div>
    );
}

export default LoadingButton;