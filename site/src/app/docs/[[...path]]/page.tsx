import { Page, getMetadata, getPageInstruction, getStaticParams } from "../robindoc";
import { Note } from "../../../components/ui/note";
import { PackageLinks } from "../../../components/ui/package-links";

const Docs = async ({ params }: { params: Promise<{ path?: string[] }> }) => {
    const { path } = await params;
    const pathname = '/docs/' + (path?.join('/') || '');
    const pageInstriction = await getPageInstruction(pathname);

    return (
        <Page
            pathname={pathname}
            components={{
                Note,
                PackageLinks,
            }}
            config={{
                publicDirs: ['public']
            }}
            editUri={`https://github.com/vordgi/robindoc/edit/main/site/${pageInstriction.origPath}`}
        />
    );
}

export const generateMetadata = async ({ params }: { params: Promise<{ path?: string[] }> }) => {
    const { path } = await params;
    const pathname = '/docs/' + (path?.join('/') || '');
    const metadata = await getMetadata(pathname);
    return metadata;
};

export const generateStaticParams = async () => {
    const staticParams = await getStaticParams('/docs', 'path');
    return staticParams;
}

export default Docs;
