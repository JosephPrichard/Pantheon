/*
 * Copyright (c) Joseph Prichard 2022.
 */

import React from "react";
import PhotoGallery from "../../../Widget/PhotoGallery/PhotoGallery";
import styles from "./ImageContent.module.css";

interface Props {
    images: string[];
    gallery?: boolean;
}

const ImageContent = ({ images }: Props) => {

    return (
        <div className={styles.GalleryContainer}>
            <PhotoGallery
                imgIds={images}
                width={"100%"}
                height={500}
            />
        </div>
    );
};

export default ImageContent;