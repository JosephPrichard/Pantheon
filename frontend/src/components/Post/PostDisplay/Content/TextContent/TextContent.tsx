import { Text, TypographyStylesProvider } from "@mantine/core";
import React from "react";
import { sanitizeHTML } from "../../../../../utils/sanitize";
import Markup from "../../../../Util/Layout/Markup/Markup";
import styles from "./TextContent.module.css"

interface Props {
    text: string;
}

const TextContent = ({ text }: Props) => (
    <div className={styles.TextContent}>
        <Text>
            <TypographyStylesProvider>
                <Markup>
                    <div dangerouslySetInnerHTML={sanitizeHTML(text)} />
                </Markup>
            </TypographyStylesProvider>
        </Text>
    </div>   
);

export default TextContent;