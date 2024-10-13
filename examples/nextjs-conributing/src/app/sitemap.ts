import { type MetadataRoute } from 'next';
import { getPages } from './[[...path]]/robindoc';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPages();
  pages.push('');

  return pages.map(page => ({
    url: `https://nextjs-dev.robindoc.com${page}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));
}
