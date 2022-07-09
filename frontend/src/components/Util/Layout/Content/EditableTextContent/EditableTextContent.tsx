/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Button, Space, Text } from "@mantine/core";
import React, { FunctionComponent, useState } from "react";
import { sanitizeHTML } from "../../../../../utils/sanitize";
import Markup from "../../Markup/Markup";
import styles from "./EditableTextContent.module.css"
import { usePermissions } from "../../../../../hooks/usePermissions";
import { Id } from "../../../../../client/types";
import TextEditor from "../../../Widget/TextEditor/TextEditor";
import { Edit } from "react-feather";
import { ORANGE, WHITE } from "../../../../colors";
import WhiteButton from "../../../Widget/Button/WhiteButton";

interface Props {
    text: string;
    onSave: (editedText: string) => void;
    isEditing: boolean;
    onCancel: () => void;
}

const EditableTextContent = ({ text, isEditing, onSave, onCancel }: Props) => {

    const [editedText, setEditedText] = useState(text);

    return (
        <div className={styles.TextContent}>
            {!isEditing ?
                <Text>
                    <Markup>
                        <div dangerouslySetInnerHTML={sanitizeHTML(text)} />
                    </Markup>
                </Text>
                :
                <div>
                    <TextEditor
                        value={editedText}
                        onChange={(value) => setEditedText(value)}
                    />
                    <WhiteButton text="Save" onClick={() => onSave(editedText)}/>
                    <WhiteButton text="Cancel" onClick={onCancel}/>
                    <Space h={20}/>
                </div>
            }
        </div>
    );
};

export default EditableTextContent;