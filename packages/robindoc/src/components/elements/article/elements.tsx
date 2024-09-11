import React from "react";
import { type BaseProvider } from "../../../core/providers/base";

export const Img: React.FC<{
    src: string;
    provider?: BaseProvider | null;
    uri?: string;
    publicDirs?: string[];
    alt?: string;
}> = async ({ src, provider, uri, publicDirs, alt }) => {
    let finalSrc = src;

    if (provider) {
        finalSrc = await provider.getFileSrc(uri || "", src, publicDirs);
    }

    return <img src={finalSrc} className="r-img" alt={alt || ""} />;
};
