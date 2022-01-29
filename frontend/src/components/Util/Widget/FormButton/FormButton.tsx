import { Button } from "@mantine/core";
import React, { FunctionComponent } from "react";
import { ORANGE } from "../../../colors";
import styles from "./FormButton.module.css";

interface Props {
    text: string;
    loading: boolean;
    color?: string;
}

const FormButton: FunctionComponent<Props> = ({ text, loading, color }: Props) => (
    <Button
        className={styles.FormButton}
        style={{
            backgroundColor: color
        }}
        type="submit"
        loading={loading}
    >
        {text}
    </Button>
);

FormButton.defaultProps = {
    color: ORANGE
}

export default FormButton;
