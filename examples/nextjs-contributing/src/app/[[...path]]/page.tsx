import { Page, getMeta, getPages } from "../robindoc";

const Docs = async ({ params }: { params: Promise<{ path?: string[] }> }) => {
    const { path } = await params;
    const pathname = "/" + (path?.join("/") || "");

    return (
        <Page
            pathname={pathname}
            config={{
                publicDirs: ["public"],
            }}
        />
    );
};

export const generateMetadata = async ({ params }: { params: Promise<{ path?: string[] }> }) => {
    const { path } = await params;
    const pathname = "/" + (path?.join("/") || "");
    const meta = await getMeta(pathname);
    return meta;
};

export const generateStaticParams = async () => {
    const pages = await getPages();
    return pages.map((page) => ({ path: page.split("/").slice(1) }));
};

export default Docs;
