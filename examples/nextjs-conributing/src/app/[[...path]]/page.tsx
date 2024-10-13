import Link from "next/link";
import { KeylinkToNavigation } from "robindoc";

import { Page, Sidebar, getMeta, getPages } from "./robindoc";

const Docs = async ({ params }: { params: { path?: string[] } }) => {
    const path = "/" + (params.path?.join("/") || "");

    return (
        <>
            <Sidebar pathname={path} link={Link} />
            <Page
                pathname={path}
                link={Link}
                config={{
                    publicDirs: ["public"],
                }}
            />
            <KeylinkToNavigation />
        </>
    );
};

export const generateMetadata = async ({ params }: { params: { path?: string[] } }) => {
    const pathname = "/" + (params.path?.join("/") || "");
    const meta = await getMeta(pathname);
    return meta;
};

export const generateStaticParams = async () => {
    const pages = await getPages();
    return pages.map((page) => ({ path: page.split("/").slice(1) }));
};

export default Docs;
