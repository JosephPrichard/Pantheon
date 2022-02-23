import React from "react";
import { PUBLIC_CLOUD_URL } from "../../../../../global";
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
                baseUrl={`${PUBLIC_CLOUD_URL}/assets`}
                width={"100%"}
                height={500}
            />
        </div>
    );
};

export default ImageContent;