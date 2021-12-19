import { Text, TypographyStylesProvider } from "@mantine/core";
import React from "react";
import { sanitizeHTML } from "../../../../../utils/sanitize";
import Markup from "../../../../Util/Layout/Markup/Markup";
import styles from "./TextContent.module.css"

interface Props {
    text: string;
    className?: string;
}

const TextContent = ({ text, className }: Props) => (
    <div className={styles.TextContent}>
        <Text className={className}>
            <TypographyStylesProvider>
                <Markup>
                    <div dangerouslySetInnerHTML={sanitizeHTML(text)} />
                </Markup>
            </TypographyStylesProvider>
        </Text>
    </div>   
);

export default TextContent;