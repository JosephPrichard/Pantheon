/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Button, Modal, Title } from "@mantine/core";
import React from "react";
import { WHITE } from "../../../colors";
import styles from "./ConfirmModal.module.css";
import WhiteButton from "../../Widget/WhiteButton/WhiteButton";

interface Props {
    opened: boolean;
    onClose: () => void;
    title: string;
    message: string;
    onConfirmed: () => void;
}

const ConfirmModal = ({ opened, onClose, title, message, onConfirmed }: Props) => {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Title order={4}>
                    { title }
                </Title>
            }
            centered
        >
            <div>
                { message }
            </div>
            <div className={styles.ButtonBlocks}>
                <WhiteButton text="Confirm" onClick={onConfirmed}/>
            </div>
        </Modal>
    );
}

export default ConfirmModal;