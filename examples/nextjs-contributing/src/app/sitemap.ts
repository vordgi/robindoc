import { type MetadataRoute } from 'next';
import { getPages } from './robindoc';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const pages = await getPages();
  pages.push('');

  return pages.map(page => ({
    url: `https://nextjs-dev.robindoc.com${page}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));
}

export default sitemap;
