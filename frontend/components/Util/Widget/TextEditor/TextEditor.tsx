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
}

const TextEditor = ({ value, onChange }: Props) => {
    return (
        <Markup>
            <Rte
                className={styles.Rte}
                value={value}
                onChange={onChange}
                controls={[
                    ["bold", "italic", "underline", "strike", "sup", "sub", "link"], 
                    ["h1", "h2", "h3", "unorderedList", "orderedList", "blockquote"],
                    ["clean"]
                ]}
            />
        </Markup>
    );
}

export default TextEditor;