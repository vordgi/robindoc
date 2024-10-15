import { Page, getMeta, getPageData, getPages } from "../robindoc";
import { Note } from "../../../components/ui/note";
import { PackageLinks } from "../../../components/ui/package-links";

const Docs = async ({ params }: { params: { path?: string[] } }) => {
    const path = '/docs/' + (params.path?.join('/') || '');
    const pageData = await getPageData(path);

    return (
        <Page
            pathname={path}
            components={{
                Note,
                PackageLinks,
            }}
            config={{
                publicDirs: ['public']
            }}
            editUri={`https://github.com/vordgi/robindoc/edit/main/site/${pageData.origPath}`}
        />
    );
}

export const generateMetadata = async ({params}: {params: {path?: string[]}}) => {
    const pathname = '/docs/' + (params.path?.join('/') || '');
    const meta = await getMeta(pathname);
    return meta;
};

export const generateStaticParams = async () => {
    const pages = await getPages('/docs');
    return pages.map(page => ({ path: page.split('/').slice(2) }));
}

export default Docs;
