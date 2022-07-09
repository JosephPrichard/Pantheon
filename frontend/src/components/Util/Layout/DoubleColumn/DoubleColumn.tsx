/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React, { FunctionComponent } from "react";
import Body from "../Body/Body";
import Column from "../Column/Column";

interface Props {
    column1: React.ReactNode;
    column2: React.ReactNode;
    column1Width?: string | number;
    column2Width?: string | number;
    column1Margin?: string | number;
    column2Margin?: string | number;
    marginBottom?: number;
    space?: boolean;
}

const DoubleColumn: FunctionComponent<Props> = (props: Props) => {
    const { column1, column2, column1Width, column2Width, column1Margin, column2Margin, marginBottom, space } = props;
    return (
        <Body width="100%" marginBottom={marginBottom} space={space}>
            <Column width={column1Width!} marginLeft={column1Margin} space={space}>
                { column1 }
            </Column>
            <Column width={column2Width!} marginRight={column2Margin} space={space}>
                { column2 }
            </Column>
        </Body>
    );
};

DoubleColumn.defaultProps = {
    column1Width: "80%",
    column2Width: "20%"
}

export default DoubleColumn;