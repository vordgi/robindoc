import { type MetadataRoute } from 'next';
import { getPages } from './docs/robindoc';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const pages = await getPages();
  pages.push('');

  return pages.map(page => ({
    url: `https://robindoc.com${page}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));
}

export default sitemap;
