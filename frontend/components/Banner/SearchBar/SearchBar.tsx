import { TextInput } from "@mantine/core";
import React, { useState } from "react";
import { Search } from "react-feather";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
    const [value, setValue] = useState("");

    return (
        <TextInput
            className={styles.SearchBar}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            placeholder="Search"
            icon={<Search size={14} />}
            autoComplete="off"
        />
    );
};

export default SearchBar;
