import { Modal, Textarea, Title, Text, Space, Button } from "@mantine/core";
import React, { useCallback, useState } from "react";
import styles from "./CreateForumModal.module.css"
import { ORANGE } from "../../colors";
import { createForum } from "../Forum.client";
import { isValidError } from "../../../client/util";
import { ErrorRes, findError, PropertyErrorRes } from "../../../client/response";

interface Props {
    open: boolean;
    onClose: () => void;
}

const MAX_FORUM_NAME_LEN = 25;

const CreateForumModal = ({ open, onClose }: Props) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [nameError, setNameError] = useState("");
    const [descError, setDescError] = useState("");

    const [loading, setLoading] = useState(false);

    const clearErrors = useCallback(
        () => {
            setNameError("");
            setDescError("");
        },
        []
    );

    const submit = useCallback(
        () => {
            setLoading(true);

            createForum({
                name,
                description
            })
                .then((r) => {
                    setLoading(false);
                    document.location.href = `/forum/${r.data.id}`
                })
                .catch((err) => {
                    if (isValidError(err)) {
                        const errData = err.response.data as PropertyErrorRes;
                        setNameError(findError(errData, "name"));
                        setDescError(findError(errData, "description"));
                    }
                    setLoading(false);
                });
        },
        [name, description]
    );

    return (
        <Modal
            classNames={{
                modal: styles.Modal
            }}
            title={
                <Title order={4}>
                    Create Forum
                </Title>
            }
            onClose={onClose}
            opened={open}
        >
            <Title order={4}>
                Name
            </Title>
            <Space h={2}/>
            <Text className={styles.NameSubtitle}>
                Forum name acts as the id for the forum and cannot be changed!
            </Text>
            <Space h={20}/>
            <Textarea
                placeholder={"Name"}
                minRows={1}
                maxRows={4}
                autosize
                value={name}
                required
                onChange={(event) => {
                    const newName = event.currentTarget.value;
                    if (newName.length <= MAX_FORUM_NAME_LEN) {
                        setName(newName);
                        clearErrors();
                    }
                }}
                error={nameError}
            />
            <Space h={10}/>
            <Text className={styles.TextBoxSubtitle}>
                { 25 - name.length } Characters Remaining
            </Text>
            <Space h={20}/>
            <Title order={4}>
                Description
            </Title>
            <Space h={20}/>
            <Textarea
                placeholder={"Description"}
                minRows={4}
                maxRows={4}
                autosize
                value={description}
                onChange={(event) => {
                    setDescription(event.currentTarget.value);
                    clearErrors();
                }}
                error={descError}
            />
            <Space h={20}/>
            <Button
                className={styles.CreateButton}
                style={{
                    backgroundColor: ORANGE
                }}
                loading={loading}
                onClick={submit}
            >
                Create
            </Button>
        </Modal>
    );
}

export default CreateForumModal;