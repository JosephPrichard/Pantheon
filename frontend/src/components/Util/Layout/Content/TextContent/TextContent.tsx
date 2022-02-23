import { Text } from "@mantine/core";
import React from "react";
import { sanitizeHTML } from "../../../../../utils/sanitize";
import Markup from "../../Markup/Markup";
import styles from "./TextContent.module.css"

interface Props {
    text: string;
}

const TextContent = ({ text }: Props) => (
    <div className={styles.TextContent}>
        <Text>
            <Markup>
                <div dangerouslySetInnerHTML={sanitizeHTML(text)} />
            </Markup>
        </Text>
    </div>   
);

export default TextContent;