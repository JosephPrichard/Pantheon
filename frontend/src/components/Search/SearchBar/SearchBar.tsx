import { Kbd, TextInput } from "@mantine/core";
import { RefObject, useRef, useState } from "react";
import { useHotkeys } from "@mantine/hooks";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon } from "@modulz/radix-icons";

const SearchBar = () => {

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
        }],
        ["enter", () => {
            if (focused) {
                router.push(`/search?text=${value}`);
            }
        }]
    ]);

    return (
        <TextInput
            ref={textRef}
            placeholder="Search Pantheon"
            value={value}
            icon={<MagnifyingGlassIcon/>}
            onChange={(event) => setValue(event.currentTarget.value)}
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