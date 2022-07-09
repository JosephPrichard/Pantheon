/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Button, Modal, PasswordInput, Space, Title } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import Message from "../../Util/Message/Message/Message";
import WhiteButton from "../../Util/Widget/Button/WhiteButton";
import { deleteAccount } from "../../../client/api/user";
import { isValidError } from "../../../client/util";
import { ErrorRes } from "../../../client/types";

const DeleteAccount = () => {

    const [opened, setOpened] = useState(false);
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [hasDeleted, setDeleted] = useState(false);

    useEffect(() => {
        if (hasDeleted) {

        }
    }, [hasDeleted]);

    const onDeleteAccount = useCallback(() => {
        setLoading(true);
        deleteAccount({ password })
            .then((r) => {
                setDeleted(true);
                setMessage(`Deleted ${r.data.postCount} posts and ${r.data.commentCount} comments.`);
                setLoading(false);
            })
            .catch((err) => {
                if (isValidError(err)) {
                    const errData = err.response.data as ErrorRes;
                    setMessage(errData.message);
                    setLoading(false);
                }
            });
    }, [password]);

    return (
        <div>
            <Title order={4}>
                Delete Account
            </Title>
            <Space h={10}/>
            <Button color="red" onClick={() => setOpened(true)}>
                Delete Account
            </Button>
            <Modal
                title={
                    <Title order={4}>
                        Delete Account
                    </Title>
                }
                opened={opened}
                onClose={() => setOpened(false)}
                centered
            >
                {!hasDeleted ?
                    <>
                        Your profile and username will be removed from the website, and any posts and comments you
                        have made will be deleted as well. This action cannot be undone!
                        <Space h={20}/>
                        <Title order={5}>
                            Verify your Identity
                        </Title>
                        <Space h={20}/>
                        <PasswordInput
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.currentTarget.value)}
                            autoComplete="new-password"
                        />
                        <Space h={10}/>
                        <Message message={message} />
                        <Space h={10}/>
                        <Button
                            color="red"
                            onClick={onDeleteAccount}
                            loading={loading}
                        >
                            Delete
                        </Button>
                    </>
                    :
                    <>
                        Your account was successfully deleted!
                        { " " + message }
                    </>
                }
            </Modal>
        </div>
    );
}

export default DeleteAccount;