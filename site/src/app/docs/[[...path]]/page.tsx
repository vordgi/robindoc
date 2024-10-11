import Link from "next/link";
import { KeylinkToNavigation } from "robindoc";

import { Page, Sidebar, getMeta, getPageData, getPages } from "./robindoc";
import { Note } from "../../../components/ui/note";
import { PackageLinks } from "../../../components/ui/package-links";

const Docs = async ({ params }: { params: { path?: string[] } }) => {
    const path = '/docs/' + (params.path?.join('/') || '');
    const pageData = await getPageData(path);

    return (
        <>
            <Sidebar pathname={path} link={Link} />
            <Page
                pathname={path}
                link={Link}
                components={{
                    Note,
                    PackageLinks,
                }}
                config={{
                    publicDirs: ['public']
                }}
                editUri={`https://github.com/vordgi/robindoc/edit/main/site/${pageData.origPath}`}
            />
            <KeylinkToNavigation />
        </>
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
