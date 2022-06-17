/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { WHITE } from "../../../colors";
import React from "react";
import styles from "./WhiteButton.module.css";
import { Button } from "@mantine/core";

interface Props {
    text: string;
    loading: boolean;
    onClick: () => void;
}

const WhiteButton = ({ text, loading, onClick }: Props) => {
    return (
        <Button
            className={styles.Button}
            style={{
                backgroundColor: WHITE
            }}
            loading={loading}
            onClick={onClick}
        >
            { text }
        </Button>
    );
}

export default WhiteButton;