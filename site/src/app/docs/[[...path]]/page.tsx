import { Note } from "../../../components/ui/note";
import { Page, Sidebar, getMeta, getPages, getPageData } from "./robindoc";
import { KeylinkToNavigation } from "robindoc";
import Link from "next/link";

export default async function Docs({params}: {params: {path?: string[]}}) {
    const path = '/docs/' + (params.path?.join('/') || '');
    const { origPath } = await getPageData(path);

    return (
        <>
            <Sidebar pathname={path} link={Link} />
            <Page
                pathname={path}
                link={Link}
                components={{
                    Note,
                }}
                config={{
                    publicDirs: ['public']
                }}
                editUri={new URL('https://github.com/vordgi/robindoc/edit/main/site/' + origPath).toString()}
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
