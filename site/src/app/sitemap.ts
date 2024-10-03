import { type MetadataRoute } from 'next';
import { getPages } from './docs/[[...path]]/robindoc';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPages();

  return pages.map(page => ({
    url: `https://robindoc.com${page}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));
}
