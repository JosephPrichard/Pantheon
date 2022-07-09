/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { PasswordInput, Space, Title } from "@mantine/core";
import React, { useCallback, useState } from "react";
import Message from "../../Util/Message/Message/Message";
import WhiteButton from "../../Util/Widget/Button/WhiteButton";
import { changePassword } from "../../../client/api/user";
import { isValidError } from "../../../client/util";
import { ErrorRes } from "../../../client/types";

const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const onUpdatePassword = useCallback(() => {
        changePassword({ password: oldPassword, newPassword: newPassword })
            .then(() => {
                setMessage("Successfully updated your password!");
                setError(false);
            })
            .catch((err) => {
                if (isValidError(err)) {
                    const errData = err.response.data as ErrorRes;
                    setMessage(errData.message);
                    setError(true);
                }
            });
    }, [oldPassword, newPassword]);

    const clearError = useCallback(
        () => {
            setError(false);
            setMessage("");
        },
        []
    );

    return (
        <div>
            <Title order={4}>
                Change Password
            </Title>
            <Space h={10}/>
            <PasswordInput
                placeholder="Current Password"
                value={oldPassword}
                onChange={(event) => {
                    setOldPassword(event.currentTarget.value);
                    clearError();
                }}
                error={error}
                autoComplete="current-password"
            />
            <Space h={10}/>
            <PasswordInput
                placeholder="New Password"
                value={newPassword}
                onChange={(event) => {
                    setNewPassword(event.currentTarget.value);
                    clearError();
                }}
                error={error}
                autoComplete="new-password"
            />
            <Space h={10}/>
            <Message message={message} isSuccess={!error}/>
            <WhiteButton text="Update" onClick={onUpdatePassword}/>
        </div>
    );
}

export default ChangePassword;