/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { WHITE } from "../../../colors";
import React, { FunctionComponent } from "react";
import styles from "./WhiteButton.module.css";
import { Button } from "@mantine/core";

interface Props {
    text: string;
    loading?: boolean;
    onClick: () => void;
}

const WhiteButton: FunctionComponent<Props> = ({ text, loading, onClick }: Props) => {
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

WhiteButton.defaultProps = {
    loading: false
}

export default WhiteButton;