/*
 * Copyright (c) Joseph Prichard 2022.
 */

import dynamic from "next/dynamic";
import React from "react";
import Markup from "../../Layout/Markup/Markup";
import styles from "./TextEditor.module.css";

const Rte = dynamic(() => import("@mantine/rte"), {
    ssr: false,
    loading: () => null
});

interface Props {
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
}

const TextEditor = ({ value, onChange, error }: Props) => {
    return (
        <Markup>
            <Rte
                styles={{
                    root: {
                        borderColor: error ? "#fa5252" : undefined,
                        minWidth: 0,
                        minHeight: 180
                    }
                }}
                className={`${styles.Rte} ${error ? styles.RedBorder : ""}`}
                value={value}
                onChange={onChange}
                controls={[
                    ["bold", "italic", "underline", "strike", "sup", "sub", "link"],
                    ["unorderedList", "orderedList", "blockquote"],
                    ["clean"]
                ]}
            />
        </Markup>
    );
}

export default TextEditor;