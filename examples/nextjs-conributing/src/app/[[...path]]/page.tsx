import { Page, getMeta, getPages } from "../robindoc";

const Docs = async ({ params }: { params: { path?: string[] } }) => {
    const path = "/" + (params.path?.join("/") || "");

    return (
        <Page
            pathname={path}
            config={{
                publicDirs: ["public"],
            }}
        />
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
