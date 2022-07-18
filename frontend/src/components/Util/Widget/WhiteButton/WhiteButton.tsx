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
    className?: string;
}

const WhiteButton: FunctionComponent<Props> = ({ text, loading, onClick, className }: Props) => {
    let classNames = styles.Button;
    if (className) {
        classNames += " " + className;
    }
    return (
        <Button
            className={classNames}
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