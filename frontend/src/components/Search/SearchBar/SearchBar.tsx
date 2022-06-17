/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { Kbd, TextInput } from "@mantine/core";
import { RefObject, useRef, useState } from "react";
import { useHotkeys } from "@mantine/hooks";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon } from "@modulz/radix-icons";

const MAX_SEARCH_TEXT_LEN = 100;

interface Props {
    href?: string;
}

const SearchBar = ({ href }: Props) => {
    if (!href) {
        href = ""
    }

    const router = useRouter();

    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    const textRef: RefObject<HTMLInputElement> = useRef(null);

    const [value, setValue] = useState("");

    useHotkeys([
        ["ctrl+k", () => {
            if (textRef.current) {
                textRef.current.focus();
            }
        }]
    ]);

    return (
        <TextInput
            ref={textRef}
            placeholder="Search"
            value={value}
            icon={<MagnifyingGlassIcon/>}
            onChange={(event) => {
                const newValue = event.currentTarget.value
                if (newValue.length <= MAX_SEARCH_TEXT_LEN) {
                    setValue(newValue);
                }
            }}
            onKeyPress={(event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    router.push(`${href}/search?text=${value}`);
                }
            }}
            rightSectionWidth={focused ? 60 : 90}
            rightSection={
                <>
                    {focused ?
                        <div style={{ display: 'flex' }}>
                            <Kbd>Enter</Kbd>
                        </div>
                        :
                        <div style={{ display: 'flex' }}>
                            <Kbd>Ctrl</Kbd>
                            <span style={{ margin: '0 5px' }}>+</span>
                            <Kbd>K</Kbd>
                        </div>
                    }
                </>
            }
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
}

export default SearchBar;