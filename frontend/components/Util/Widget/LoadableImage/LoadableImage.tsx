import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Loader } from "@mantine/core";
import styles from "./LoadableImage.module.css";

const LoadableImage = (props: ImageProps) => {

    const [loaded, setLoaded] = useState(false);

    return (
        <>
            <div className={styles.Loader}>
                {!loaded || <Loader color="gray"/>}
            </div>
            <Image {...props} onLoad={() => setLoaded(true)}/>
        </>
    );
}

export default LoadableImage;