import React from "react";
import { type BaseProvider } from "@src/core/providers/base";

import "./img.scss";

export interface ImgProps {
    src: string;
    provider?: BaseProvider | null;
    uri?: string;
    publicDirs?: string[];
    alt?: string;
}

export const Img: React.FC<ImgProps> = async ({ src, provider, uri, publicDirs, alt }) => {
    let finalSrc = src;

    if (provider) {
        finalSrc = await provider.getFileSrc(uri || "", src, publicDirs);
    }

    return <img src={finalSrc} className="r-img" alt={alt || ""} />;
};
