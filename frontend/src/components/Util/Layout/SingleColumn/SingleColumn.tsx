/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React, { FunctionComponent } from "react";
import Body from "../Body/Body";
import Column from "../Column/Column";

interface Props {
    column: React.ReactNode;
    columnWidth?: string | number;
    columnMargin?: string | number;
    marginBottom?: number;
}

const SingleColumn: FunctionComponent<Props> = (props: Props) => {
    const { column, columnWidth, columnMargin, marginBottom } = props;
    return (
        <Body width="100%" marginBottom={marginBottom}>
            <Column width={columnWidth!} marginLeft={columnMargin} marginRight={columnMargin}>
                { column }
            </Column>
        </Body>
    );
};

SingleColumn.defaultProps = {
    columnWidth: "100%"
}

export default SingleColumn;