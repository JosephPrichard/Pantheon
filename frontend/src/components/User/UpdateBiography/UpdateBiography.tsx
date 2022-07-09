/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Space, Textarea, Title } from "@mantine/core";
import Message from "../../Util/Message/Message/Message";
import WhiteButton from "../../Util/Widget/Button/WhiteButton";
import React, { useCallback, useState } from "react";
import { updateUser } from "../../../client/api/user";
import { isValidError } from "../../../client/util";
import { ErrorRes } from "../../../client/types";

interface Props {
    biography: string;
}

const UpdateBiography = ({ biography }: Props) => {

    const [desc, setDesc] = useState(biography);

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const onSaveBio = useCallback(() => {
        updateUser({ description: desc })
            .then(() => {
                setMessage("Successfully updated your bio!");
                setError(false);
            })
            .catch((err) => {
                if (isValidError(err)) {
                    const errData = err.response.data as ErrorRes;
                    setMessage(errData.message);
                    setError(true);
                }
            });
    }, [desc]);

    const clearError = useCallback(
        () => {
            setError(false);
            setMessage("");
        },
        []
    );

    return (
        <>
            <Title order={4}>
                Biography
            </Title>
            <Space h={10}/>
            <Textarea
                placeholder="Biography"
                minRows={4}
                maxRows={4}
                autosize
                value={desc}
                onChange={(event) => {
                    setDesc(event.currentTarget.value);
                    clearError();
                }}
            />
            <Message message={message} isSuccess={!error}/>
            <WhiteButton text="Save" onClick={onSaveBio}/>
        </>
    );
}

export default UpdateBiography;