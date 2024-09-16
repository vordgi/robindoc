import { matchSorter } from 'match-sorter'
import { getPages, getPageContent } from '../../docs/[[...path]]/robindoc';

const headers = new Headers();
headers.set('Content-Type', 'application/json; charset=UTF-8');

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('s');

    if (!search) return new Response(JSON.stringify([]), { headers });

    const pages = await getPages();
    const docs: { href: string; content: string; title: string }[] = [];

    for await (const page of pages) {
        const { content, title } = await getPageContent(page);
        docs.push({ href: page, content, title });
    }

    const searchResults = matchSorter(docs, search, { keys: ['content', 'title'] });

    return new Response(
        JSON.stringify(searchResults.slice(0, 5).map(item => ({ title: item.title, href: item.href }))),
        { headers }
    );
}
