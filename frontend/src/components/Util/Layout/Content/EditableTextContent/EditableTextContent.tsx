/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Button, Text } from "@mantine/core";
import React, { useState } from "react";
import { sanitizeHTML } from "../../../../../utils/sanitize";
import Markup from "../../Markup/Markup";
import styles from "./EditableContent.module.css"
import { useUserPermissions } from "../../../../../hooks/useUserPermissions";
import { Id } from "../../../../../client/types";
import TextEditor from "../../../Widget/TextEditor/TextEditor";
import { Edit } from "react-feather";
import { ORANGE, WHITE } from "../../../../colors";

interface Props {
    text: string;
    isEditing: boolean;
    onSave: (editedText: string) => void;
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
                    <Button
                        className={styles.Button}
                        style={{
                            backgroundColor: WHITE
                        }}
                        onClick={() => onSave(editedText)}
                    >
                        Save
                    </Button>
                    <Button
                        className={styles.Button}
                        style={{
                            backgroundColor: WHITE
                        }}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </div>
            }
        </div>
    );
};

export default EditableTextContent;