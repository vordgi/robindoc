import React from "react";
import { type BaseProvider } from "../../providers/base";
import { NavLink } from "../nav-link";
import { getFileUrl } from "../../utils/path-tools";

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

interface AnchorProps extends React.PropsWithChildren, React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    targetPathname: string;
    link?: React.ElementType;
}

export const Anchor: React.FC<AnchorProps> = async ({ href, targetPathname, link, ...props }) => {
    let finalHref: string;
    if (href.match(/^(https?:\/\/|\/)/)) {
        finalHref = href;
    } else {
        const fileUrl = getFileUrl(href).replace(/^([^/])/, "/$1");
        const normalizedUrl = new URL(targetPathname + fileUrl, "http://r");
        finalHref = normalizedUrl.pathname.replace(/^([^/])/, "/$1");
    }

    return <NavLink link={link} href={finalHref} className="r-a" {...props} />;
};
