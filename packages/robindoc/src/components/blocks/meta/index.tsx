import React from "react";

export interface MetaProps {
    meta: {
        title: string;
        description?: string;
        image?: string;
        site_name?: string;
        keywords?: string;
        "image:alt"?: string;
        "og:image:alt": string;
        "twitter:image:alt": string;
        "og:title": string;
        "twitter:title": string;
        "og:description": string;
        "twitter:description": string;
        "og:image": string;
        "twitter:image": string;
    };
}

export const Meta: React.FC<MetaProps> = ({ meta }) => {
    const { title, description, image, keywords, site_name, ...other } = meta;

    return (
        <>
            {title && <title>{title}</title>}
            {(other["og:title"] || title) && <meta name="og:title" content={other["og:title"] || title} />}
            {(other["twitter:title"] || title) && (
                <meta name="twitter:title" content={other["twitter:title"] || title} />
            )}
            {keywords && <meta name="keywords" content={keywords} />}
            {description && <meta name="description" content={description} />}
            {(other["og:description"] || description) && (
                <meta name="og:description" content={other["og:description"] || description} />
            )}
            {(other["twitter:description"] || description) && (
                <meta name="twitter:description" content={other["twitter:description"] || description} />
            )}
            {(other["og:image"] || image) && <meta name="og:image" content={other["og:image"] || image} />}
            {(other["twitter:image"] || image) && (
                <meta name="twitter:image" content={other["twitter:image"] || image} />
            )}
            {(other["og:image:alt"] || other["image:alt"]) && (
                <meta property="og:image:alt" content={other["og:image:alt"] || other["image:alt"]} />
            )}
            {(other["twitter:image:alt"] || other["image:alt"]) && (
                <meta property="twitter:image:alt" content={other["twitter:image:alt"] || other["image:alt"]} />
            )}
            {site_name && <meta name="og:site_name" content={site_name} />}
        </>
    );
};
