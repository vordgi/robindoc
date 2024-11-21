import { Page, getMetadata, getStaticParams } from "../robindoc";

const Docs = async ({ params }: { params: Promise<{ segments?: string[] }> }) => {
    const { segments } = await params;
    const pathname = "/" + (segments?.join("/") || "");

    return (
        <Page
            pathname={pathname}
            config={{
                publicDirs: ["public"],
            }}
        />
    );
};

export const generateMetadata = async ({ params }: { params: Promise<{ segments?: string[] }> }) => {
    const { segments } = await params;
    const pathname = "/" + (segments?.join("/") || "");
    const metadata = await getMetadata(pathname);
    return metadata;
};

export const generateStaticParams = async () => {
    const staticParams = await getStaticParams();
    return staticParams;
};

export default Docs;
